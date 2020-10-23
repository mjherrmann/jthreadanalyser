import { PassThroughStream } from "../../PassThroughStream";


const THREADINFO_EXTRACTOR = /^\"(?<name>.*?)\"[\s]*(?<id>#[\d]*?)[\s]*(?<isdaemon>[daemon].*?)?[\s]*prio=(?<priority>[\d]*)[\s]*os_prio=(?<os_priority>[\d]*)[\s]*cpu=(?<cpu>.*?)[\s]*elapsed=(?<elapsed>.*?)[\s]*tid=(?<tid>.*?)[\s]*nid=(?<nid>.*?)\s(?<status>.*?)\[(?<memref>.*?)\]/;
const THREAD_STATE_EXTRACTOR = /java\.lang\.Thread\.State:[\s]*(?<state>[\w]*)[\s]*[(]?(?<state_info>.*?)[)]?$/;
export class OpenJDKThreadBuilder extends PassThroughStream {
	constructor(eventPublisher) {
		super("OpenJDKThreadBuilder");
		this.thread = undefined;
		this.sendEvent = eventPublisher;
	}

	process(fsFile, line) {

		if(line === undefined || line.trim() === ""){
			let thread = this.thread;
			if(thread){
				let stack = thread.stack;
				delete thread.stack;
				this.sendEvent({msg:"updateThread",data:{type:'OPENJDK',file:fsFile,body:{name:thread.name,info:thread,stack}}});
				this.thread = undefined;
			}
		}
		let threadInfoResult = THREADINFO_EXTRACTOR.exec(line);
		if(threadInfoResult){
			let { groups } = threadInfoResult;
			if (groups) {
				this.updateThread(threadInfoResult.groups)
			}
		}
		else if(this.thread){
			let threadStateResult = THREAD_STATE_EXTRACTOR.exec(line.trim());
			if(threadStateResult){
				let { groups } = threadStateResult;
				if (groups) {
					this.updateThread(threadStateResult.groups)
				}
			}else{
				this.updateThread({stack:[line.trim()]})
			}
		}
	}
	updateThread(thread){
		let newThread = {
			...this.thread,
			...thread
		}
		if(thread.info){
			newThread.info =  {
				...this.thread.info,
				...thread.info
			};
		}
		if(thread.stack){
			newThread.stack =  [...(this.thread.stack)?this.thread.stack:[],...thread.stack];
		}
		if(thread.locks){
			newThread.locks =  [...(this.thread.locks)?this.thread.locks:[],...thread.locks];
		}
		this.thread = newThread;

	}
}
