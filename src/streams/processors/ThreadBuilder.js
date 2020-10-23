import { PassThroughStream } from "../PassThroughStream";
// import { Thread } from "../../types/Thread";
// import { ThreadStore } from "../../stores/ThreadStore";

const THREADINFO_EXTRACTOR = /\"(?<name>.*?)\"[\s,]*(?<j9vmthread>.*?),[\s,]*(?<j9thread>.*?),[\s,]*(?<id>.*?),[\s,]*state:(?<state>.*),[\s,]*prio=(?<prio>[\d]*)/;
const THREADINFO1_EXTRACTOR = /.*?ID:(?<threadId>.*?),.*?priority:(?<priority>.*?),.*?policy:(?<policy>.*?),.*?vmstate:(?<vmstate>.*?),.*?flags:(?<flags>.*?)\)/;
const JAVALTREAD_EXTRACTOR = /\(.*getId:(?<getId>.*?),.*?isDaemon:(?<isDaemon>.*?)\)/;

const INT_THREAD_TYPES = {
	THREADINFO: "3XMTHREADINFO",
	JAVALTHREAD: "3XMJAVALTHREAD",
	THREADINFO1: "3XMTHREADINFO1",
	STACKTRACE4: "4XESTACKTRACE",
	STACKTRACE5: "5XESTACKTRACE",
	NATIVESTACK: "4XENATIVESTACK",
	THREADBLOCK: "3XMTHREADBLOCK",
	START_THREADS: "1XMTHDINFO",
	END_THREADS: "0SECTION",
};

export const THREAD_TYPES = Object.values(INT_THREAD_TYPES);

export class ThreadBuilder extends PassThroughStream {
	constructor(eventPublisher) {
		super("ThreadBuilder");
		this.threadName = undefined;
		this.started = false;
		this.sendEvent = eventPublisher;
		this.thread = {name:undefined};
	}
	updateThread(fsFile, {name,info,javalThreadInfo,nativeInfo,stack,nativeStack,monitor, waitingOn,blockedBy,blocking}){
		let thread = this.thread;
		// console.log("thread", this.thread,this.thread.name,name,this.thread.name !== undefined && this.thread.name !== name);
		if(this.thread.name !== name){
			console.log("thread", this.thread);
			this.sendEvent({msg:"updateThread",data:{file:fsFile,body:thread}});
			thread = {name:name};
		}


		if(info){
			thread.info = {...thread.info, ...info}
		}
		if(javalThreadInfo){
			thread.javalThreadInfo = {...thread.javalThreadInfo, ...javalThreadInfo}
		}
		if(nativeInfo){
			thread.nativeInfo = {...thread.nativeInfo, ...nativeInfo}
		}
		if(stack){
			thread.stack = [...(thread.stack)?thread.stack:[],...stack]
		}
		if(nativeStack){
			thread.nativeStack = [...(thread.nativeStack)?thread.nativeStack:[],...nativeStack]
		}
		if(waitingOn){
			thread.waitingOn = [...(thread.waitingOn)?thread.waitingOn:[],...waitingOn]
		}
		if(blockedBy){
			thread.blockedBy = [...(thread.blockedBy)?thread.blockedBy:[],...blockedBy]
		}
		if(blocking){
			thread.blocking = [...(thread.blocking)?thread.blocking:[],...blocking]
		}
		if(monitor){
			thread.monitor = monitor;
		}
		this.thread = thread;
	}
	process(fsFile, { type, content }) {
		if (this.started) {
			this.buildThread(fsFile, type, content);
		}
		if (INT_THREAD_TYPES.START_THREADS === type) {
			this.started = true;
			console.log(`${this.name} - Build Threads Start`);
		}
		if (INT_THREAD_TYPES.END_THREADS === type && this.started) {
			this.started = false;
			delete this.threadName;
			this.threadName = undefined;
			console.log(`${this.name} - Build Threads End`);
		}
	}

	buildThread(fsFile, type, content) {
		let result = undefined;
		switch (type) {
			case INT_THREAD_TYPES.THREADINFO:
				result = THREADINFO_EXTRACTOR.exec(content);
				if (result) {
					let { groups } = result;
					if (groups && groups.name) {
						this.threadName = groups.name;
						this.updateThread(fsFile,{name:groups.name,info:groups})
					}
				} else {
					this.updateThread(fsFile,{ name: content })
				}
				break;
			case INT_THREAD_TYPES.THREADINFO1:
				result = THREADINFO1_EXTRACTOR.exec(content);
				if (result) {
					let { groups } = result;
					this.updateThread(fsFile,{ name: this.threadName, nativeInfo:groups })
				}
				break;
			case INT_THREAD_TYPES.JAVALTHREAD:
				result = JAVALTREAD_EXTRACTOR.exec(content);
				if (result) {
					let { groups } = result;
					this.updateThread(fsFile,{ name: this.threadName,javalThreadInfo:groups })
				}
				break;
			case INT_THREAD_TYPES.STACKTRACE4:
			case INT_THREAD_TYPES.STACKTRACE5:
				this.updateThread(fsFile,{ name: this.threadName,stack:[content]})
				//this.thread.addToStack(content);
				break;
			case INT_THREAD_TYPES.NATIVESTACK:
				this.updateThread(fsFile,{ name: this.threadName,nativeStack:[content] })
				break;
		}
	}
}
