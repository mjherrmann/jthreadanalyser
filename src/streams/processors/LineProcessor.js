import { PassThroughStream } from "../PassThroughStream";

export class LineProcessor extends PassThroughStream {
	constructor() {
		super("LineProcessor");
		this.textDecoder = new TextDecoder("utf-8");
		this.dataArr = [];
	}
	process(fsFile, chunk) {
		this.dataArr = this.dataArr.concat(Array.from(chunk));
		let nextIndex = this.newLineIndex();
		while (nextIndex != -1) {
			let line = this.dataArr.splice(0, nextIndex + 1);
			var decoded = this.textDecoder.decode(Uint8Array.from(line));
			this.notify(fsFile, decoded);
			nextIndex = this.newLineIndex();
		}
	}
	newLineIndex() {
		return this.dataArr.findIndex((i) => i === 10 || i === 13);
	}
}
