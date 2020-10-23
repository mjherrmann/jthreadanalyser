import { writable } from "svelte/store";
import { Thread } from "../types/Thread";



class TStore {
	constructor() {
		const { subscribe, set, update } = writable({files:{}});
		this.subscribe = subscribe;
		this.set = set;
		this.update = update;
	}
	/**
	 * this.name = name;
		this.info = {};
		this.stack = [];
		this.nativeStack = [];
		this.waitingOn = [];
		this.blockedBy = [];
		this.blocking = [];

	 * @param {*} fsFile
	 * @param {*} param1
	 */
	updateThread(fsFile, type, {name,info,javalThreadInfo,nativeInfo,stack,nativeStack,monitor, waitingOn,blockedBy,blocking}) {
		this.update((oldThreadStore) => {
			//console.log("update",{name,info,javalThreadInfo,nativeInfo,stack,nativeStack,monitor, waitingOn,blockedBy,blocking})
			/*
			{
				"filename"{
					"threadname":{
						this.name = name; - no update
						this.info = {}; - replace
						this.javalThreadInfo = {}  - replace
						this.nativeInfo = {} - replace
						this.stack = [];  - append
						this.nativeStack = []; - append
						this.waitingOn = []; - append
						this.blockedBy = []; - append
						this.blocking = []; - append
						this.monitor = string - replace
					}
				}

			}
			*/


			let newStore = {
				...oldThreadStore,
				type:type,
				files:{
					...oldThreadStore.files,
					[fsFile.name]:{
						...(oldThreadStore.files[fsFile.name])? oldThreadStore.files[fsFile.name] : {},
						[name]:{
							...( oldThreadStore.files[fsFile.name] && oldThreadStore.files[fsFile.name][name])? oldThreadStore.files[fsFile.name][name] : {},
							name,
						}
					}
				}
			};
			let thread = newStore.files[fsFile.name][name];

			if(info){
				thread.info = {...thread.info, ...info}
			}
			if(javalThreadInfo){
				thread.javalThreadInfo = {...thread.javalThreadInfo, ...javalThreadInfo}
			}
			if(nativeInfo){
				thread.nativeInfo = {...thread.nativeInfo, ...nativeInfo}
			}
			if(stack){
				thread.stack = [...(thread.stack)?thread.stack:[],...stack]
			}
			if(nativeStack){
				thread.nativeStack = [...(thread.nativeStack)?thread.nativeStack:[],...nativeStack]
			}
			if(waitingOn){
				thread.waitingOn = [...(thread.waitingOn)?thread.waitingOn:[],...waitingOn]
			}
			if(blockedBy){
				thread.blockedBy = [...(thread.blockedBy)?thread.blockedBy:[],...blockedBy]
			}
			if(blocking){
				thread.blocking = [...(thread.blocking)?thread.blocking:[],...blocking]
			}
			if(monitor){
				thread.monitor = monitor;
			}
			return newStore;
		});
	}

	remove(fileName) {
		this.update((oldThreadStore) => {
			let updatedFiles = Object.entries(oldThreadStore)
				.filter(([key, value]) => key != fileName)
				.reduce((reduce, [key, value]) => {
					reduce[key] = value;
					return reduce;
				}, {});
			return updatedFiles;
		});
	}
}

export const ThreadStore = new TStore();
