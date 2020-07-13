import App from "./App.svelte";
import { JCoreProcessor } from "./Services/JCoreProcessor";
import { FileReadService } from "./Services/FileReadService";

const app = new App({
	target: document.body,
	props: {
		services: {
			JCoreProcessor: new JCoreProcessor(),
			FileReadService: FileReadService.getInstance(6),
		},
	},
});

export default app;
