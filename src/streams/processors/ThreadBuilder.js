import { PassThroughStream } from "../PassThroughStream";
import { Thread } from "../../types/Thread";
import { ThreadStore } from "../../stores/ThreadStore";

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
	constructor() {
		super("ThreadBuilder");
		this.thread = undefined;
		this.started = false;
	}
	process(fsFile, { type, content }) {
		// try {
		if (this.started) {
			this.buildThread(fsFile, type, content);
		}
		if (INT_THREAD_TYPES.START_THREADS === type) {
			this.started = true;
			console.log(`${this.name} - Build Threads Start`);
		}
		if (INT_THREAD_TYPES.END_THREADS === type && this.started) {
			this.started = false;
			console.log(`${this.name} - Build Threads End`);
		}
		// } catch (e) {
		// 	console.error(e);
		// 	this.close();
		// }
	}

	buildThread(fsFile, type, content) {
		let result = undefined;
		switch (type) {
			case INT_THREAD_TYPES.THREADINFO:
				result = THREADINFO_EXTRACTOR.exec(content);
				if (result) {
					let { groups } = result;
					if (groups && groups.name) {
						this.thread = new Thread(groups);
						ThreadStore.addThread(fsFile, this.thread);
					}
				} else {
					this.thread = new Thread({ name: content });
					ThreadStore.addThread(fsFile, this.thread);
				}
				break;
			case INT_THREAD_TYPES.THREADINFO1:
				result = THREADINFO1_EXTRACTOR.exec(content);
				if (result) {
					let { groups } = result;
					this.thread.addThreadInfo1(groups);
				}
				break;
			case INT_THREAD_TYPES.JAVALTHREAD:
				result = JAVALTREAD_EXTRACTOR.exec(content);
				if (result) {
					let { groups } = result;
					this.thread.addJavalThread(groups);
				}
				break;
			case INT_THREAD_TYPES.STACKTRACE4:
			case INT_THREAD_TYPES.STACKTRACE5:
				this.thread.addToStack(content);
				break;
			case INT_THREAD_TYPES.NATIVESTACK:
				this.thread.addToNativeStack(content);
				break;
		}
	}
}
