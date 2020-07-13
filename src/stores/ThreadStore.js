import { writable } from "svelte/store";

class TStore {
	constructor() {
		const { subscribe, set, update } = writable({});
		this.subscribe = subscribe;
		this.set = set;
		this.update = update;
	}
	addThread(fsFile, thread) {
		this.update((oldThreadStore) => {
			let updatedThread = {};
			let newFSThreads = {};
			let newThread = {};
			newThread[thread.name] = thread;
			newFSThreads[fsFile.name] = Object.assign(
				{},
				oldThreadStore[fsFile.name],
				newThread
			);
			if (oldThreadStore[fsFile.name]) {
				updatedThread = Object.assign({}, oldThreadStore, newFSThreads);
			} else {
				updatedThread = Object.assign({}, oldThreadStore, newFSThreads);
			}

			return updatedThread;
		});
	}
}

export const ThreadStore = new TStore();
