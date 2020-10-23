import { PassThroughStream } from "../../PassThroughStream";
import { THREAD_TYPES } from "./ThreadBuilder";
import { LOCK_TYPES } from "./LockMonitorBuilder";
import { DEAD_LOCK_TYPES } from "./DeadLockBuilder";

const TYPE_EXTRACTOR = /^(?<type>.*?)\s[\s]*(?<content>.*)/;

const DESIRED_TYPES = [...THREAD_TYPES, ...LOCK_TYPES, ...DEAD_LOCK_TYPES];

export class IBMLineFilter extends PassThroughStream {
	constructor() {
		super("LineFilter");
	}
	process(fsFile, line) {
		try {
			let {
				groups: { type, content },
			} = TYPE_EXTRACTOR.exec(line);
			// console.log("notify ", { type, content }, line);
			if (DESIRED_TYPES.indexOf(type) !== -1) {
				// console.log("notify ", { type, content });
				this.notify(fsFile, { type, content });
			}
		} catch (e) {
			console.error(e);
			// this.close();
		}
	}
}
