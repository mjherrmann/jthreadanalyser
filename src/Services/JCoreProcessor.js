import { FileStore } from "../stores/FileStore";

import {ProcessorClient} from "../workers/ProcessorClient";

export class JCoreProcessor {
	constructor() {
		FileStore.subscribe((files) => {
			this.process(Object.values(files));
		});
	}

	async process(files) {
		if (files && files.length > 0) {
			let nextFiles = files.filter(({ processed }) => !processed);
			if (nextFiles.length > 0) {
				let fsFilePromises = nextFiles.map(
					async (file) => await new Promise((resolve, reject) => file.file(resolve, reject))
				);
				console.log("processing", nextFiles);
				Promise.all(fsFilePromises)
					.then((fsFiles) => {
						return Promise.all(
							fsFiles.map((fsFile) => {
								let pc = new ProcessorClient();
								return pc.processFile(fsFile);
							})
						);
					})
					.then(() => console.timeEnd("global"));

				FileStore.setProcessed(nextFiles);
			}
		}
	}

}
