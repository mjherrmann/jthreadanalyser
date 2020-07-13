export class Thread {
	constructor({ name, j9vmthread, j9thread, id, state, prio }) {
		this.name = name;
		this.state = state;
		this.prio = prio;
		this.j9vmthread = j9vmthread;
		this.j9thread = j9thread;
		this.id = id;
		this.stack = [];
		this.nativeStack = [];
	}

	addToStack(stackinfo) {
		this.stack.push(stackinfo);
	}
	addToNativeStack(stackinfo) {
		this.nativeStack.push(stackinfo);
	}
	addJavalThread(javalThreadIfo) {
		this.javalThreadIfo = javalThreadIfo;
	}
	addThreadInfo1(nativeInfo) {
		this.nativeInfo = nativeInfo;
	}
}
