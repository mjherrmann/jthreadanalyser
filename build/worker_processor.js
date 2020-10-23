(function () {
	'use strict';

	class PassThroughStream {
		constructor(name) {
			this.name = name;
			this.subscribers = [];
		}

		process() {
			try {
				this.notify(...arguments);
			} catch (err) {
				console.error(err);
				// try {
				// 	this.subscribers.forEach((subscriber) => subscriber.error(err));
				// } catch (e) {
				throw err;
				// }
			}
		}

		// error(err) {
		// 	this.subscribers.forEach((subscriber) => subscriber.error(result));
		// }
		notify() {
			this.subscribers.forEach((subscriber) => {
				return subscriber.process(...arguments);
			});
		}

		subscribe() {
			this.subscribers = [...this.subscribers, ...arguments];
		}
	}

	class LineProcessor extends PassThroughStream {
		constructor() {
			super("LineProcessor");
			this.textDecoder = new TextDecoder("utf-8");
			this.dataArr = [];
		}
		process(fsFile, chunk) {
			// try {
			this.dataArr = this.dataArr.concat(Array.from(chunk));
			let nextIndex = this.newLineIndex();
			while (nextIndex != -1) {
				let line = this.dataArr.splice(0, nextIndex + 1);
				var decoded = this.textDecoder.decode(Uint8Array.from(line));
				this.notify(fsFile, decoded);
				nextIndex = this.newLineIndex();
			}
			// } catch (e) {
			// 	console.error("Error Reading", e);
			// 	this.close();
			// }
		}
		newLineIndex() {
			return this.dataArr.findIndex((i) => i === 10 || i === 13);
		}
	}

	const START_DEADLOCK = "1LKDEADLOCK";
	const END_DEADLOCK = "1LKDEADLOCK";

	const DEAD_LOCK_TYPES = [
		"START_DEADLOCK",
		"2LKDEADLOCKTHR",
		"3LKDEADLOCKWTR",
		"4LKDEADLOCKMON",
		"4LKDEADLOCKOBJ",
		"3LKDEADLOCKOWN",
		START_DEADLOCK,
		END_DEADLOCK,
	];

	class DeadLockBuilder extends PassThroughStream {
		constructor(eventPublisher) {
			super("LockBuilder");
			this.thread = {};
			this.deadlockStarted = false;
			this.sendEvent = eventPublisher;
		}
		updateThread(fsFile, message){
			this.sendEvent({msg:"updateThread",data:{file:fsFile,body:message}});
		}
		process(fsFile, { type, content }) {
			//try {
			if (START_DEADLOCK === type) {
				this.deadlockStarted = true;
				console.log(`${this.name} - DeadLock Start`);
			}
			if (END_DEADLOCK === type && this.deadlockStarted) {
				this.deadlockStarted = false;
				console.log(`${this.name} - DeadLock End`);
			}
			// } catch (e) {
			// 	console.error(e);
			// 	this.close();
			// }
		}
	}

	//import { ThreadStore } from "../../stores/ThreadStore";

	const MONOBJECT_EXTRACTOR = /(?<monitor>.*?):.*?owner\s\"(?<owner>.*?)\"/;
	const WAITER_EXTRACTOR = /\"(?<thread>.*?)\"\s\((?<threadId>.*?)\)/;
	const WAITNOTIFY_EXTRACTOR = /\"(?<thread>.*?)\"\s\((?<threadId>.*?)\)/;



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

	const LOCK_TYPES = [
		...Object.values(INT_LOCK_TYPES),
		START_LOCKMON,
		START_REDMON,
		...END_MON
	];


	class LockMonitorBuilder extends PassThroughStream {
		constructor(eventPublisher) {
			super("LockMonitorBuilder");
			this.lkMonitorsStarted = false;
			this.regMonitorsStarted = false;
			this.sendEvent = eventPublisher;
		}
		updateThread(fsFile, message){
			this.sendEvent({msg:"updateThread",data:{file:fsFile,body:message}});
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
							let {owner, monitor} = groups;
							this.updateThread(fsFile,{name:owner,monitor});
						}
					}else {
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
								this.updateThread(fsFile,{ name: owner, blocking:[thread]});
								this.updateThread(fsFile,{ name: thread, waitingOn:[owner],monitor});
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
								this.updateThread(fsFile,{ name: this.monObj.owner, blocking:[thread] });
								this.updateThread(fsFile,{ name: thread, blockedBy:[owner] ,monitor});
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

	const THREAD_TYPES = Object.values(INT_THREAD_TYPES);

	class ThreadBuilder extends PassThroughStream {
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
				thread.info = {...thread.info, ...info};
			}
			if(javalThreadInfo){
				thread.javalThreadInfo = {...thread.javalThreadInfo, ...javalThreadInfo};
			}
			if(nativeInfo){
				thread.nativeInfo = {...thread.nativeInfo, ...nativeInfo};
			}
			if(stack){
				thread.stack = [...(thread.stack)?thread.stack:[],...stack];
			}
			if(nativeStack){
				thread.nativeStack = [...(thread.nativeStack)?thread.nativeStack:[],...nativeStack];
			}
			if(waitingOn){
				thread.waitingOn = [...(thread.waitingOn)?thread.waitingOn:[],...waitingOn];
			}
			if(blockedBy){
				thread.blockedBy = [...(thread.blockedBy)?thread.blockedBy:[],...blockedBy];
			}
			if(blocking){
				thread.blocking = [...(thread.blocking)?thread.blocking:[],...blocking];
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
							this.updateThread(fsFile,{name:groups.name,info:groups});
						}
					} else {
						this.updateThread(fsFile,{ name: content });
					}
					break;
				case INT_THREAD_TYPES.THREADINFO1:
					result = THREADINFO1_EXTRACTOR.exec(content);
					if (result) {
						let { groups } = result;
						this.updateThread(fsFile,{ name: this.threadName, nativeInfo:groups });
					}
					break;
				case INT_THREAD_TYPES.JAVALTHREAD:
					result = JAVALTREAD_EXTRACTOR.exec(content);
					if (result) {
						let { groups } = result;
						this.updateThread(fsFile,{ name: this.threadName,javalThreadInfo:groups });
					}
					break;
				case INT_THREAD_TYPES.STACKTRACE4:
				case INT_THREAD_TYPES.STACKTRACE5:
					this.updateThread(fsFile,{ name: this.threadName,stack:[content]});
					//this.thread.addToStack(content);
					break;
				case INT_THREAD_TYPES.NATIVESTACK:
					this.updateThread(fsFile,{ name: this.threadName,nativeStack:[content] });
					break;
			}
		}
	}

	const TYPE_EXTRACTOR = /^(?<type>.*?)\s[\s]*(?<content>.*)/;

	const DESIRED_TYPES = [...THREAD_TYPES, ...LOCK_TYPES, ...DEAD_LOCK_TYPES];

	class LineFilter extends PassThroughStream {
		constructor() {
			super("LineFilter");
		}
		process(fsFile, line) {
			try {
				let {
					groups: { type, content },
				} = TYPE_EXTRACTOR.exec(line);
				// console.log("notify ", { type, content }, line);
				if (DESIRED_TYPES.indexOf(type) !== -1) {
					// console.log("notify ", { type, content });
					this.notify(fsFile, { type, content });
				}
			} catch (e) {
				console.error(e);
				// this.close();
			}
		}
	}

	self.addEventListener('message',function({data:{file}}){
		console.log("worker data received", file);
		let processor = new Processor(self);
		processor.processFile(file);
		//self.postMessage(data);
	});

	class Processor{

		constructor(worker){
			this.worker = worker;
		}

		async processFile(fsFile) {
			let lineProcessor = new LineProcessor();
			let lineFilter = new LineFilter();
			let threadBuilder = new ThreadBuilder(this.eventPublisher.bind(this));
			let deadLockBuilder = new DeadLockBuilder(this.eventPublisher.bind(this));
			let lockMonitorBuilder = new LockMonitorBuilder(this.eventPublisher.bind(this));

			lineProcessor.subscribe(lineFilter);
			lineFilter.subscribe(threadBuilder, deadLockBuilder, lockMonitorBuilder);

			let fileStream = fsFile.stream();
			await fileStream.pipeTo(
				new WritableStream({
					write: (value) => {
						//console.log(fsFile, value)
						try {
							lineProcessor.process(fsFile, value);
						} catch (err) {
							console.error(err);
						}
					},
					close: () => {
						console.log("File stream closed");
					},
					Abort: () => {},
				})
			);
		}

		eventPublisher(e){
			this.worker.postMessage(e);
		}

	}

}());
//# sourceMappingURL=worker_processor.js.map
