import { PassThroughStream } from "../PassThroughStream";

const START_LOCKMON = "1LKMONPOOLDUMP";
const START_REDMON = "1LKREGMONDUMP";
const END_MON = ["1LKDEADLOCK", "0SECTION"];

export const LOCK_TYPES = [
	"2LKMONINUSE",
	"3LKMONOBJECT",
	"3LKNOTIFYQ",
	"3LKWAITNOTIFY",
	"3LKWAITERQ",
	"3LKWAITER",
	"1LKREGMONDUMP",
	"2LKREGMON",
	START_LOCKMON,
	START_REDMON,
	...END_MON,
];

export class LockMonitorBuilder extends PassThroughStream {
	constructor() {
		super("LockMonitorBuilder");
		this.thread = {};
		this.lkMonitorsStarted = false;
		this.regMonitorsStarted = false;
	}
	process(fsFile, { type, content }) {
		try {
			if (START_LOCKMON === type) {
				this.lkMonitorsStarted = true;
				this.regMonitorsStarted = false;
				console.log(`${this.name} - Lock Monitors Start`);
			}
			if (START_REDMON === type) {
				this.lkMonitorsStarted = false;
				this.regMonitorsStarted = true;
				console.log(`${this.name} - Lock Monitors End`);
				console.log(`${this.name} - Reg Monitors Start`);
			}
			if (END_MON.indexOf(type) !== -1 && this.regMonitorsStarted) {
				this.lkMonitorsStarted = false;
				this.regMonitorsStarted = false;
				console.log(`${this.name} - Reg Monitors End`);
			}
		} catch (e) {
			console.error(e);
			this.close();
		}
	}
	close() {
		let response = super.close();
		console.timeEnd("global");
		return response;
	}
}
