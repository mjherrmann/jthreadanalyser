import { writable } from "svelte/store";

class FStore {
	constructor() {
		const { subscribe, set, update } = writable({});
		this.subscribe = subscribe;
		this.set = set;
		this.update = update;
	}

	addFiles(files) {
		this.update((existingFiles) => {
			let filesObj = files.reduce((reduction, file) => {
				reduction[file.name] = file;
				return reduction;
			}, {});
			console.log(existingFiles, filesObj, Object.assign({}, existingFiles, filesObj));
			return Object.assign({}, existingFiles, filesObj);
		});
	}
	remove(fileName) {
		this.update((files) => {
			let updatedFiles = Object.entries(files)
				.filter(([key, value]) => key != fileName)
				.reduce((reduce, [key, value]) => {
					reduce[key] = value;
					return reduce;
				}, {});

			console.log("delete", files, updatedFiles);

			return updatedFiles;
		});
	}
}

export const FileStore = new FStore();
