import { LineProcessor } from "../streams/processors/LineProcessor";
import { DeadLockBuilder } from "../streams/processors/DeadLockBuilder";
import { LockMonitorBuilder } from "../streams/processors/LockMonitorBuilder";
import { ThreadBuilder } from "../streams/processors/ThreadBuilder";
import { LineFilter } from "../streams/processors/LineFilter";

self.addEventListener('message',function({data:{file}}){
	console.log("worker data received", file);
	let processor = new Processor(self);
	processor.processFile(file);
	//self.postMessage(data);
});

class Processor{

	constructor(worker){
		this.worker = worker;
	}

	async processFile(fsFile) {
		let lineProcessor = new LineProcessor();
		let lineFilter = new LineFilter();
		let threadBuilder = new ThreadBuilder(this.eventPublisher.bind(this));
		let deadLockBuilder = new DeadLockBuilder(this.eventPublisher.bind(this));
		let lockMonitorBuilder = new LockMonitorBuilder(this.eventPublisher.bind(this));

		lineProcessor.subscribe(lineFilter);
		lineFilter.subscribe(threadBuilder, deadLockBuilder, lockMonitorBuilder);

		let fileStream = fsFile.stream();
		await fileStream.pipeTo(
			new WritableStream({
				write: (value) => {
					//console.log(fsFile, value)
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

	eventPublisher(e){
		this.worker.postMessage(e);
	}

}



