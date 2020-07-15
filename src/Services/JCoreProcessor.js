import { getContext } from "svelte";
import { FileStore } from "../stores/FileStore";
import { LineProcessor } from "../streams/processors/LineProcessor";
import { DeadLockBuilder } from "../streams/processors/DeadLockBuilder";
import { LockMonitorBuilder } from "../streams/processors/LockMonitorBuilder";
import { ThreadBuilder } from "../streams/processors/ThreadBuilder";
import { LineFilter } from "../streams/processors/LineFilter";
import { FileReadService } from "./FileReadService";

const BUFFER_SIZE = 20 * 1024;

export class JCoreProcessor {
	constructor() {
		FileStore.subscribe((files) => {
			this.process(Object.values(files));
		});
	}

	async process(files) {
		if (files && files.length > 0) {
			if (this.processing) {
				// cancel previous
				console.log("cancel previous");
			}
			this.processing = true;

			let fsFilePromises = files.map(
				async (file) => await new Promise((resolve, reject) => file.file(resolve, reject))
			);

			Promise.all(fsFilePromises)
				.then((fsFiles) => {
					return Promise.all(
						fsFiles.map((fsFile) => {
							return this.processFile(fsFile);
						})
					);
				})
				.then(() => console.timeEnd("global"));
		}
	}
	async processFile(fsFile) {
		let lineProcessor = new LineProcessor();
		let lineFilter = new LineFilter();
		let threadBuilder = new ThreadBuilder();
		let deadLockBuilder = new DeadLockBuilder();
		let lockMonitorBuilder = new LockMonitorBuilder();

		lineProcessor.subscribe(lineFilter);
		lineFilter.subscribe(threadBuilder, deadLockBuilder, lockMonitorBuilder);

		let fileStream = fsFile.stream();
		await fileStream.pipeTo(
			new WritableStream({
				write: (value) => {
					try {
						lineProcessor.process(fsFile, value);
					} catch (err) {
						console.error(err);
					}
				},
				close: () => {
					console.log("File stream closed");
				},
				Abort: () => {},
			})
		);
	}
}

//split the files to manageable chunks.
//read the chunks line by line -- join the edges of the chunks where required
//as we read the file build the thread tree
