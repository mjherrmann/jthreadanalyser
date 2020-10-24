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
				throw err;
			}
		}

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
			this.dataArr = this.dataArr.concat(Array.from(chunk));
			let nextIndex = this.newLineIndex();
			while (nextIndex != -1) {
				let line = this.dataArr.splice(0, nextIndex + 1);
				var decoded = this.textDecoder.decode(Uint8Array.from(line));
				this.notify(fsFile, decoded);
				nextIndex = this.newLineIndex();
			}
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

	class IBMDeadLockBuilder extends PassThroughStream {
		constructor(eventPublisher) {
			super("LockBuilder");
			this.thread = {};
			this.deadlockStarted = false;
			this.sendEvent = eventPublisher;
		}
		updateThread(fsFile, message){
			this.sendEvent({msg:"updateThread",data:{type:'IBM',file:fsFile,body:message}});
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

	const MONOBJECT_EXTRACTOR = /(?<monitor>.*?):.*?(?:owner\s\"|<)(?<owner>.*?)(?:\"|>)/;
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


	class IBMLockMonitorBuilder extends PassThroughStream {
		constructor(eventPublisher) {
			super("LockMonitorBuilder");
			this.lkMonitorsStarted = false;
			this.regMonitorsStarted = false;
			this.sendEvent = eventPublisher;
		}
		updateThread(fsFile, message){
			this.sendEvent({msg:"updateThread",data:{type:'IBM',file:fsFile,body:message}});
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

	class IBMThreadBuilder extends PassThroughStream {
		constructor(eventPublisher) {
			super("ThreadBuilder");
			this.threadName = undefined;
			this.started = false;
			this.sendEvent = eventPublisher;
			this.thread = {name:undefined};
		}
		updateThread(fsFile, {name,info,javalThreadInfo,nativeInfo,stack,nativeStack,monitor, waitingOn,blockedBy,blocking}){
			let thread = this.thread;
			if(this.thread.name !== name){
				this.sendEvent({msg:"updateThread",data:{type:'IBM',file:fsFile,body:thread}});
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

	class IBMLineFilter extends PassThroughStream {
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

	class JTypeDetectorProcessor extends PassThroughStream{
		constructor() {
			super("JTypeDetectorProcessor");
			this.processor = undefined;
			this.ibm = new IbmThreadDumpProcessor();
			this.openJDK = new OpenJdkThreadDumpProcessor();


		}
		process(fsFile, line) {
			if (this.processor === undefined){
				this.processor = line.indexOf("NULL") !== -1?this.ibm:this.openJDK;
			}
			this.processor.notify(fsFile, line);
		}
	}

	class IbmThreadDumpProcessor extends PassThroughStream{
		constructor() {
			super("IbmThreadDumpProcessor");
		}
	}
	class OpenJdkThreadDumpProcessor extends PassThroughStream{
		constructor() {
			super("OpenJdkThreadDumpProcessor");
		}
	}

	const THREADINFO_EXTRACTOR$1 = /^\"(?<name>.*?)\"[\s]*(?<id>#[\d]*?)[\s]*(?<isdaemon>[daemon].*?)?[\s]*prio=(?<priority>[\d]*)[\s]*os_prio=(?<os_priority>[\d]*)[\s]*cpu=(?<cpu>.*?)[\s]*elapsed=(?<elapsed>.*?)[\s]*tid=(?<tid>.*?)[\s]*nid=(?<nid>.*?)\s(?<status>.*?)\[(?<memref>.*?)\]/;
	const THREAD_STATE_EXTRACTOR = /java\.lang\.Thread\.State:[\s]*(?<state>[\w]*)[\s]*[(]?(?<state_info>.*?)[)]?$/;
	class OpenJDKThreadBuilder extends PassThroughStream {
		constructor(eventPublisher) {
			super("OpenJDKThreadBuilder");
			this.thread = undefined;
			this.sendEvent = eventPublisher;
		}

		process(fsFile, line) {

			if(line === undefined || line.trim() === ""){
				let thread = this.thread;
				if(thread){
					let stack = thread.stack;
					delete thread.stack;
					this.sendEvent({msg:"updateThread",data:{type:'OPENJDK',file:fsFile,body:{name:thread.name,info:thread,stack}}});
					this.thread = undefined;
				}
			}
			let threadInfoResult = THREADINFO_EXTRACTOR$1.exec(line);
			if(threadInfoResult){
				let { groups } = threadInfoResult;
				if (groups) {
					this.updateThread(threadInfoResult.groups);
				}
			}
			else if(this.thread){
				let threadStateResult = THREAD_STATE_EXTRACTOR.exec(line.trim());
				if(threadStateResult){
					let { groups } = threadStateResult;
					if (groups) {
						this.updateThread(threadStateResult.groups);
					}
				}else {
					this.updateThread({stack:[line.trim()]});
				}
			}
		}
		updateThread(thread){
			let newThread = {
				...this.thread,
				...thread
			};
			if(thread.info){
				newThread.info =  {
					...this.thread.info,
					...thread.info
				};
			}
			if(thread.stack){
				newThread.stack =  [...(this.thread.stack)?this.thread.stack:[],...thread.stack];
			}
			if(thread.locks){
				newThread.locks =  [...(this.thread.locks)?this.thread.locks:[],...thread.locks];
			}
			this.thread = newThread;

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
			let ibmLineFilter = new IBMLineFilter();
			let ibmThreadBuilder = new IBMThreadBuilder(this.eventPublisher.bind(this));
			let ibmDeadLockBuilder = new IBMDeadLockBuilder(this.eventPublisher.bind(this));
			let ibmLockMonitorBuilder = new IBMLockMonitorBuilder(this.eventPublisher.bind(this));

			let openJDKThreadBuilder = new OpenJDKThreadBuilder(this.eventPublisher.bind(this));

			let jTypeDetector = new JTypeDetectorProcessor();

			lineProcessor.subscribe(jTypeDetector);

			jTypeDetector.ibm.subscribe(ibmLineFilter);
			jTypeDetector.openJDK.subscribe(openJDKThreadBuilder);

			ibmLineFilter.subscribe(ibmThreadBuilder, ibmDeadLockBuilder, ibmLockMonitorBuilder);

			let fileStream = fsFile.stream();
			await fileStream.pipeTo(
				new WritableStream({
					write: (value) => {
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
