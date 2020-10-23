import { getContext } from "svelte";
import { FileStore } from "../stores/FileStore";
import {ThreadStore} from "../stores/ThreadStore"
import { LineProcessor } from "../streams/processors/LineProcessor";
import { DeadLockBuilder } from "../streams/processors/DeadLockBuilder";
import { LockMonitorBuilder } from "../streams/processors/LockMonitorBuilder";
import { ThreadBuilder } from "../streams/processors/ThreadBuilder";
import { LineFilter } from "../streams/processors/LineFilter";
import { FileReadService } from "./FileReadService";
import {ProcessorClient} from "../workers/ProcessorClient";

const BUFFER_SIZE = 20 * 1024;

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

								let pc = new ProcessorClient(ThreadStore);
								return pc.processFile(fsFile);

								return this.processFile(fsF);
							})
						);
					})
					.then(() => console.timeEnd("global"));

				FileStore.setProcessed(nextFiles);
			}
		}
	}

}

//split the files to manageable chunks.
//read the chunks line by line -- join the edges of the chunks where required
//as we read the file build the thread tree
