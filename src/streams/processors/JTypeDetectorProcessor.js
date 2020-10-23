import { PassThroughStream } from "../PassThroughStream";
const IBM = "ibm";
const OPENJDK = "openjdk";

export class JTypeDetectorProcessor extends PassThroughStream{
	constructor() {
		super("JTypeDetectorProcessor");
		this.processor = undefined;
		this.ibm = new IbmThreadDumpProcessor();
		this.openJDK = new OpenJdkThreadDumpProcessor();


	}
	process(fsFile, line) {
		if (this.processor === undefined){
			this.processor = line.indexOf("NULL") !== -1?this.ibm:this.openJDK;
		}
		this.processor.notify(fsFile, line);
	}
}

class IbmThreadDumpProcessor extends PassThroughStream{
	constructor() {
		super("IbmThreadDumpProcessor");
	}
}
class OpenJdkThreadDumpProcessor extends PassThroughStream{
	constructor() {
		super("OpenJdkThreadDumpProcessor");
	}
}
