<script>
  import { setContext, onMount, afterUpdate } from "svelte";
  import FileLoader from "./components/FileLoader.svelte";
  import Thread from "./components/Thread.svelte";

  import { FileStore } from "./stores/FileStore";
  import { ThreadStore } from "./stores/ThreadStore";

  export let services;
  setContext("services", services);

  $: fileNames = $FileStore.map(file => file.name).sort();
  $: loaded = fileNames && fileNames.length > 0;
  $: threadNames = Object.keys(
    Object.entries($ThreadStore).reduce((reduced, [fileName, threads]) => {
      return Object.assign({}, reduced, threads);
    }, {})
  ).sort(nameSort);

  let nameSort = (a, b) => {
    let len = Math.min(a.length, b.length);
    let a2 = a.padEnd(0, len - 1);
    let b2 = b.slice(0, len - 1);

    let sizeComp = a2.localeCompare(b2);
    if (sizeComp == 0) {
      if (a.length != b.length) {
        return a.length - b.length;
      }
      return a.localeCompare(b);
    } else {
      return sizeComp;
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
  let flexWidth;

  let doResize = () => {
    flexWidth = Math.floor(
      main.getBoundingClientRect().width / (fileNames.length + 1)
    );
  };

  onMount(() => {
    doResize();
  });
  afterUpdate(() => {
    doResize();
  });

  window.onresize = doResize;
</script>

<style>
  div {
    box-sizing: border-box;
    font-size: 10pt;
  }

  div {
    width: 100%;
  }

  .flex-container {
    display: flex;
    align-items: stretch;
    width: 100%;
  }
  .flex-child {
    overflow: hidden;
    padding: 1px;
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
  .thread-row:hover {
    background-color: rgb(0, 0, 0, 0.2);
    /* border-top: 2px solid blue;
    border-bottom: 2px solid blue; */
  }
</style>

<main>
  <div class="flex-container {loaded ? 'filesloaded' : ''}">
    <div class="sidebar">
      <div class="state {loaded ? '' : 'flex-container'}">
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
      <div class="fileNames flex-container">
        <div class="flex-child" style="width: {flexWidth}px" />
        {#each fileNames as fileName, index}
          <div class="flex-child" style="width: {flexWidth}px">{fileName}</div>
        {/each}
      </div>
      {#each threadNames as threadName, index}
        <div class="flex-container thread-row">
          <div class="flex-child" style="width: {flexWidth}px">
            {threadName}
          </div>
          {#each fileNames as fileName, index}
            <Thread
              thread={getThread(fileName, threadName)}
              maxWidth={flexWidth} />
          {/each}
        </div>
      {/each}
    </div>
  </div>
</main>
