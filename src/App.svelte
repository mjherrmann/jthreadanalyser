<script>
  import SidePanel from "./components/SidePanel.svelte";
  import MainPanel from "./components/MainPanel.svelte";

  import { FileStore } from "./stores/FileStore";
  //export let services;

  //   setContext("services", services);

  //   $: threadNames = Object.keys(
  //     Object.entries($ThreadStore).reduce((reduced, [fileName, threads]) => {
  //       return Object.assign({}, reduced, threads);
  //     }, {})
  //   ).sort(nameSort);

  //

  //   $: threads = $ThreadStore;

  //   let getThreads = threadName => {
  //     let ts = fileNames.map(fileName => {
  //       return threads[fileName] && threads[fileName][threadName];
  //     });
  //     console.log(ts);
  //     return ts;
  //   };

  //   let getThread = (fileName, threadName) => {
  //     return threads[fileName] && threads[fileName][threadName]
  //       ? threads[fileName][threadName]
  //       : undefined;
  //   };
  //   let getThreadState = (fileName, threadName) => {
  //     return threads[fileName] &&
  //       threads[fileName][threadName] &&
  //       threads[fileName][threadName].state
  //       ? threads[fileName][threadName].state
  //       : "";
  //   };
  //   let main;
  //   let mainSize = 100;
  //   $: cellWidth = `${Math.floor(mainSize / (fileNames.length + 1)) - 1}px`;

  //   let setMainSize = () => {
  //     mainSize = main.getBoundingClientRect().width;
  //   };

  //   let closeTab = ({ detail }) => {
  //     console.log("closeTab", detail);
  //     FileStore.remove(detail);
  //     ThreadStore.remove(detail);
  //   };
  //   //let showThreadDetails = threadName => {};
  //   onMount(setMainSize);
  //   afterUpdate(setMainSize);
  //   window.onresize = setMainSize;
</script>

<style>
  main {
    display: grid;
    grid-column-gap: 5px;
    grid-template-columns: 100%;
  }
  main.loaded {
    grid-template-columns: 1fr 11fr;
  }
</style>

<main class={$FileStore && Object.keys($FileStore).length > 0 ? 'loaded' : ''}>
  <SidePanel fileStore={$FileStore} />
  <MainPanel />
</main>
