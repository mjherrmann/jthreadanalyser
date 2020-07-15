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
	remove(fileName) {
		this.update((files) => {
			console.log("update files", files);
			let delIndex = files.findIndex((file) => {
				console.log(file.name, fileName, file.name == fileName, file.name === fileName);
				return file.name == fileName;
			});
			let deleted = files.splice(delIndex, 1);
			console.log(files, deleted, delIndex);
			return [...files];
		});
	}
}

export const FileStore = new FStore();
