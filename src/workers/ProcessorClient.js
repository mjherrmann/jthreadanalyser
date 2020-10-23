import {ThreadStore} from "../stores/ThreadStore"
export class ProcessorClient{

	constructor(threadStore){
		this.worker = new Worker('build/worker_processor.js')
		this.intPromise = new Promise((resolve, reject)=>{
			this.resolve = resolve;
			this.reject = reject;
		});
		this.worker.onmessage = this.msgListener.bind(this);
	}

	processFile(fsFile){
		this.worker.postMessage({file:fsFile});
		return this.intPromise;
	}

	msgListener({data:{msg,data:{type,file,body}}}){
		//console.log("msgCameBack", msg,file,body);
		if(msg === 'updateThread'){
			ThreadStore.updateThread(file, type, body);
		}
	}


}