import { Queue } from "../types/Queue";

/**
 * wrapper arround the promise which allows control of resolving and rejecting to a 3rd party
 */
class DeferredFileReader {
	constructor(file) {
		this.file = file;
		this.promise = new Promise((resolve, reject) => {
			this.resolve = resolve;
			this.reject = reject;
		});
	}
}

/**
 * wrapper arround the JS FileReader which is promise based
 */
class ExtFileReader {
	constructor(queue) {
		this.queue = queue;
		this.reader = new FileReader();
	}

	async execute(deferred) {
		this.reader.onload = (e) => {
			deferred.resolve(e.target.result);
			this.queue.addListener(this);
		};
		this.reader.readAsArrayBuffer(deferred.file); // would be good to do this with worker threads  later.
	}
}

/**
 * the actual service. which hides all the above.
 * has a static method for singleton. (it should be) creating a lot of these creates memory leaks as chrome doesnt clean up FileReader nicely, so a limited number should be created and shared.
 */
export class FileReadService {
	constructor(no_readers) {
		this.fileQueue = new Queue();
		for (let i = 0; i < no_readers; i++) {
			this.fileQueue.addListener(new ExtFileReader(this.fileQueue));
		}
	}

	async read(file) {
		let deferredFileReader = new DeferredFileReader(file);
		this.fileQueue.addDeferred(deferredFileReader);
		return deferredFileReader.promise;
	}
}

FileReadService.getInstance = () => {
	if (!FileReadService.instance) {
		FileReadService.instance = new FileReadService(6);
	}
	return FileReadService.instance;
};
