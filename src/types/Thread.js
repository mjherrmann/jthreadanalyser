export class Thread {
	constructor() {
		this.name = name;
		this.info = {};
		this.javalThreadInfo = {}
		this.nativeInfo = {}
		this.stack = [];
		this.nativeStack = [];
		this.waitingOn = [];
		this.blockedBy = [];
		this.blocking = [];
	}

	addWaitingOn(threadName){
		this.waitingOn.push(threadName);
	}
	addBlocking(threadName){
		this.blocking.push(threadName);
	}
	addBlockedOn(threadName){
		this.blockedBy.push(threadName);
	}
	addInfo(info){
		this.info = info;
	}
	addToStack(stackinfo) {
		this.stack.push(stackinfo);
	}
	addToNativeStack(stackinfo) {
		this.nativeStack.push(stackinfo);
	}
	addJavalThread(javalThreadInfo) {
		this.javalThreadInfo = javalThreadInfo;
	}
	addThreadInfo1(nativeInfo) {
		this.nativeInfo = nativeInfo;
	}
}
