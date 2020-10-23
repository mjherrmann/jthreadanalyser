import { LineProcessor } from "../streams/processors/LineProcessor";
import { IBMDeadLockBuilder } from "../streams/processors/ibm/DeadLockBuilder";
import { IBMLockMonitorBuilder } from "../streams/processors/ibm/LockMonitorBuilder";
import { IBMThreadBuilder } from "../streams/processors/ibm/ThreadBuilder";
import { IBMLineFilter } from "../streams/processors/ibm/LineFilter";
import { JTypeDetectorProcessor } from "../streams/processors/JTypeDetectorProcessor";
import {OpenJDKThreadBuilder} from "../streams/processors/openjdk/ThreadBuilder";

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
		let ibmLineFilter = new IBMLineFilter();
		let ibmThreadBuilder = new IBMThreadBuilder(this.eventPublisher.bind(this));
		let ibmDeadLockBuilder = new IBMDeadLockBuilder(this.eventPublisher.bind(this));
		let ibmLockMonitorBuilder = new IBMLockMonitorBuilder(this.eventPublisher.bind(this));

		let openJDKThreadBuilder = new OpenJDKThreadBuilder(this.eventPublisher.bind(this));

		let jTypeDetector = new JTypeDetectorProcessor();

		lineProcessor.subscribe(jTypeDetector);

		jTypeDetector.ibm.subscribe(ibmLineFilter);
		jTypeDetector.openJDK.subscribe(openJDKThreadBuilder);

		ibmLineFilter.subscribe(ibmThreadBuilder, ibmDeadLockBuilder, ibmLockMonitorBuilder);

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

	eventPublisher(e){
		this.worker.postMessage(e);
	}

}



