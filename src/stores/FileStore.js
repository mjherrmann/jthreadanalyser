import { writable } from "svelte/store";

class FStore {
	constructor() {
		const { subscribe, set, update } = writable([]);
		this.subscribe = subscribe;
		this.set = set;
		this.update = update;
	}

	addFiles(files) {
		this.update((existingFiles) => [...existingFiles, ...files]);
	}
}

export const FileStore = new FStore();
