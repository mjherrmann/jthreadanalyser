import { PassThroughStream } from "../PassThroughStream";

const START_DEADLOCK = "1LKDEADLOCK";
const END_DEADLOCK = "1LKDEADLOCK";

export const DEAD_LOCK_TYPES = [
	"START_DEADLOCK",
	"2LKDEADLOCKTHR",
	"3LKDEADLOCKWTR",
	"4LKDEADLOCKMON",
	"4LKDEADLOCKOBJ",
	"3LKDEADLOCKOWN",
	START_DEADLOCK,
	END_DEADLOCK,
];

export class DeadLockBuilder extends PassThroughStream {
	constructor() {
		super("LockBuilder");
		this.thread = {};
		this.deadlockStarted = false;
	}
	process(fsFile, { type, content }) {
		//try {
		if (START_DEADLOCK === type) {
			this.deadlockStarted = true;
			console.log(`${this.name} - DeadLock Start`);
		}
		if (END_DEADLOCK === type && this.deadlockStarted) {
			this.deadlockStarted = false;
			console.log(`${this.name} - DeadLock End`);
		}
		// } catch (e) {
		// 	console.error(e);
		// 	this.close();
		// }
	}
}
