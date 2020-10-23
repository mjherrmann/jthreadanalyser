import { PassThroughStream } from "../PassThroughStream";
//import { ThreadStore } from "../../stores/ThreadStore";

const MONOBJECT_EXTRACTOR = /(?<monitor>.*?):.*?owner\s\"(?<owner>.*?)\"/;
const WAITER_EXTRACTOR = /\"(?<thread>.*?)\"\s\((?<threadId>.*?)\)/
const WAITNOTIFY_EXTRACTOR = /\"(?<thread>.*?)\"\s\((?<threadId>.*?)\)/



const START_LOCKMON = "1LKMONPOOLDUMP";
const START_REDMON = "1LKREGMONDUMP";
const END_MON = ["1LKDEADLOCK", "0SECTION"];

const INT_LOCK_TYPES = {
//	MONINUSE: "2LKMONINUSE",
	MONOBJECT: "3LKMONOBJECT",
//	NOTIFYQ: "3LKNOTIFYQ",
	WAITNOTIFY: "3LKWAITNOTIFY",
//	WAITERQ: "3LKWAITERQ",
	WAITER: "3LKWAITER",
//	REGMONDUMP: "1LKREGMONDUMP",
//	REGMON: "2LKREGMON",
};

export const LOCK_TYPES = [
	...Object.values(INT_LOCK_TYPES),
	START_LOCKMON,
	START_REDMON,
	...END_MON
];


export class LockMonitorBuilder extends PassThroughStream {
	constructor(eventPublisher) {
		super("LockMonitorBuilder");
		this.lkMonitorsStarted = false;
		this.regMonitorsStarted = false;
		this.sendEvent = eventPublisher;
	}
	updateThread(fsFile, message){
		this.sendEvent({msg:"updateThread",data:{file:fsFile,body:message}})
	}
	process(fsFile, { type, content }) {
			if (START_LOCKMON === type) {
				this.lkMonitorsStarted = true;
				this.regMonitorsStarted = false;
				delete this.monObj;
				console.log(`${this.name} - Lock Monitors Start`);
			}
			if (START_REDMON === type) {
				this.lkMonitorsStarted = false;
				this.regMonitorsStarted = true;
				delete this.monObj;
				console.log(`${this.name} - Lock Monitors End`);
				console.log(`${this.name} - Reg Monitors Start`);
			}
			if (END_MON.indexOf(type) !== -1 && this.regMonitorsStarted) {
				this.lkMonitorsStarted = false;
				this.regMonitorsStarted = false;
				delete this.monObj;
				console.log(`${this.name} - Reg Monitors End`);
			}
			if(this.lkMonitorsStarted){
				this.buildLock(fsFile, type, content);
			}
	}

	buildLock(fsFile, type, content) {
		let result = undefined;
		let {owner, monitor} = (this.monObj)?this.monObj:{undefined,undefined};
		switch (type) {
			// case INT_LOCK_TYPES.MONINUSE:
			// 	//new owner - delete the current one
			// 	delete this.monObj;
			case INT_LOCK_TYPES.MONOBJECT:
				result = MONOBJECT_EXTRACTOR.exec(content);
				if (result) {
					let { groups } = result;
					if (groups && groups.owner) {
						this.monObj = groups;
						let {owner, monitor} = groups
						this.updateThread(fsFile,{name:owner,monitor})
					}
				}else{
					delete this.monObj;
				}
				break;
			case INT_LOCK_TYPES.WAITER:

				if(owner){
					result = WAITER_EXTRACTOR.exec(content);
					if (result) {
						let { groups } = result;
						if (groups && groups.thread) {
							let {thread, threadId} = groups;
							this.updateThread(fsFile,{ name: owner, blocking:[thread]})
							this.updateThread(fsFile,{ name: thread, waitingOn:[owner],monitor})
						}
					}
				}
				break;
			case INT_LOCK_TYPES.WAITNOTIFY:
				if(owner){
					result = WAITNOTIFY_EXTRACTOR.exec(content);
					if (result) {
						let { groups } = result;
						if (groups && groups.thread) {
							let {thread, threadId} = groups;
							this.updateThread(fsFile,{ name: this.monObj.owner, blocking:[thread] })
							this.updateThread(fsFile,{ name: thread, blockedBy:[owner] ,monitor})
						}
					}
				}
				break;
			// case INT_THREAD_TYPES.JAVALTHREAD:
			// 	result = JAVALTREAD_EXTRACTOR.exec(content);
			// 	if (result) {
			// 		let { groups } = result;
			// 		ThreadStore.updateThread(fsFile,{ name: this.threadName,javalThreadInfo:groups })
			// 	}
			// 	break;
			// case INT_THREAD_TYPES.STACKTRACE4:
			// case INT_THREAD_TYPES.STACKTRACE5:
			// 	ThreadStore.updateThread(fsFile,{ name: this.threadName,stack:[content]})
			// 	//this.thread.addToStack(content);
			// 	break;
			// case INT_THREAD_TYPES.NATIVESTACK:
			// 	ThreadStore.updateThread(fsFile,{ name: this.threadName,nativeStack:[content] })
			// 	break;
		}
	}


	close() {
		let response = super.close();
		console.timeEnd("global");
		return response;
	}
}
