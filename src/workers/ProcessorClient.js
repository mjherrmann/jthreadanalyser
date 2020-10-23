export class ProcessorClient{

	constructor(threadStore){
		this.worker = new Worker('build/worker_processor.js')
		this.threadStore = threadStore;
		this.intPromise = new Promise((resolve, reject)=>{
			this.resolve = resolve;
			this.reject = reject;
		});
		this.worker.onmessage = this.msgListener.bind(this);
	}

	processFile(fsFile){
		this.worker.postMessage({file:fsFile});
		console.log(this);
		return this.intPromise;
	}

	// processedListener(resolve, reject){
	// 	this.resolve = resolve;
	// 	this.reject = reject;
	// }

	msgListener({data:{msg,data:{file,body}}}){
		//console.log("msgCameBack", msg,file,body);
		if(msg === 'updateThread'){
			this.threadStore.updateThread(file, body);
		}
	}


}