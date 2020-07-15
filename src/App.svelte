<script>
  import { setContext, onMount, afterUpdate, beforeUpdate } from "svelte";
  import FileLoader from "./components/FileLoader.svelte";
  import ClosableTab from "./components/ClosableTab.svelte";
  import Thread from "./components/Thread.svelte";

  import { FileStore } from "./stores/FileStore";
  import { ThreadStore } from "./stores/ThreadStore";

  export let services;
  setContext("services", services);

  $: fileNames = Object.keys($FileStore).sort();
  $: loaded = fileNames && fileNames.length > 0;
  $: threadNames = Object.keys(
    Object.entries($ThreadStore).reduce((reduced, [fileName, threads]) => {
      return Object.assign({}, reduced, threads);
    }, {})
  ).sort(nameSort);

  let threadSortExtract = threadName => {
    let { groups } = /(?<name>.*?)(?<num>[\d]*)$/.exec(threadName);
    return groups;
  };
  let nameSort = (a, b) => {
    let aExtract = threadSortExtract(a);
    let bExtract = threadSortExtract(b);
    if (aExtract.name) {
      let nameCompare = aExtract.name.localeCompare(bExtract.name);
      if (nameCompare == 0) {
        let numa = parseInt(aExtract.num);
        let numb = parseInt(bExtract.num);
        if (numa === NaN && numb === NaN) {
          return 0;
        }
        if (numa === NaN) {
          return -1;
        }
        if (numb === NaN) {
          return 1;
        }
        return numa - numb;
      }

      return nameCompare;
    }
  };

  $: threads = $ThreadStore;

  let getThread = (fileName, threadName) => {
    return threads[fileName] && threads[fileName][threadName]
      ? threads[fileName][threadName]
      : undefined;
  };
  let getThreadState = (fileName, threadName) => {
    return threads[fileName] &&
      threads[fileName][threadName] &&
      threads[fileName][threadName].state
      ? threads[fileName][threadName].state
      : "";
  };
  let main;
  let mainSize = 100;
  $: cellWidth = `${Math.floor(mainSize / (fileNames.length + 1)) - 1}px`;

  let setMainSize = () => {
    mainSize = main.getBoundingClientRect().width;
  };

  let closeTab = ({ detail }) => {
    console.log("closeTab", detail);
    FileStore.remove(detail);
    ThreadStore.remove(detail);
  };

  onMount(setMainSize);
  afterUpdate(setMainSize);
  window.onresize = setMainSize;
</script>

<style>
  div {
    box-sizing: border-box;
    font-size: 10pt;
  }

  .main {
    width: 0px;
    align-items: stretch;
  }
  .sidebar {
    width: 100%;
  }
  .filesloaded .sidebar {
    flex-basis: 200px;
  }
  .filesloaded .main {
    width: 100% !important;
    margin: 0 1em;
  }

  .grid {
    width: 100%;
    display: grid;
    grid-gap: 2px;
  }
  .flex-row {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .row-wrapper {
    display: contents;
  }
  .row-wrapper:hover div {
    background-color: rgb(0, 0, 0, 0.2) !important;
  }
</style>

<main>
  <div class={loaded ? 'filesloaded flex-row' : ''}>
    <div class="sidebar">
      <div class="state {loaded ? '' : 'flex-row'}">
        <div class="R">Running</div>
        <div class="CW">Waiting</div>
        <div class="B">Blocked</div>
        <div class="S">Suspended</div>
        <div class="P">Parked</div>
        <div class="Z">Zombie</div>
      </div>
      <FileLoader />
    </div>
    <div class="main" bind:this={main}>
      <div
        class="grid"
        style="grid-template-columns: 200px repeat({fileNames.length}, {cellWidth});">

        <div />
        {#each fileNames as fileName, index}
          <ClosableTab
            eventName="closeTab"
            identifier={fileName}
            on:closeTab={closeTab}>
            <span slot="content">{fileName}</span>
          </ClosableTab>
        {/each}
        {#each threadNames as threadName}
          <div class="row-wrapper">
            <div style="overflow:hidden;">{threadName}</div>
            {#each fileNames as fileName, index}
              <Thread thread={getThread(fileName, threadName)} />
            {/each}
          </div>
        {/each}
      </div>
    </div>
  </div>
</main>
