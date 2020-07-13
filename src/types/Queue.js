export class Queue {
	list = [];
	listeners = [];

	addDeferred(deferredObj) {
		this.list.push(deferredObj);
		this.notify();
	}

	addListener(listener) {
		this.listeners.push(listener);
		this.notify();
	}

	notify() {
		if (this.listeners.length > 0 && this.list.length > 0) {
			let deferred = this.list.shift();
			let listener = this.listeners.shift();

			listener.execute(deferred);
			this.notify();
		}
	}
}
