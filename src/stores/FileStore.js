import { writable } from "svelte/store";

class FStore {
	constructor() {
		const { subscribe, set, update } = writable({});
		this.subscribe = subscribe;
		this.set = set;
		this.update = update;
	}

	setProcessed(files) {
		this.update((oldfiles) => {
			let newFileMergeObj = files.reduce((reduced, file) => {
				let oldFile = oldfiles[file.name];
				let newFile = Object.assign(oldFile, { processed: true });
				reduced[file.name] = newFile;
				return reduced;
			}, {});
			return Object.assign({}, oldfiles, newFileMergeObj);
		});
	}
	addFiles(files) {
		this.update((existingFiles) => {
			let filesObj = files.reduce((reduction, file) => {
				if (!reduction[file.name]) {
					reduction[file.name] = file;
				}
				return reduction;
			}, {});
			//existing comes last to avoid re-processing files which have already been loaded.
			let nextSet = Object.assign({}, filesObj, existingFiles);
			return nextSet;
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
			return updatedFiles;
		});
	}
}

export const FileStore = new FStore();
