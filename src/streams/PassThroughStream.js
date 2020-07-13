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
