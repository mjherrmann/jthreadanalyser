export class PassThroughStream {
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
