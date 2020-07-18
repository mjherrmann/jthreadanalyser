<script>
  import { onMount, afterUpdate } from "svelte";

  import { FileStore } from "../stores/FileStore";
  import { ThreadStore } from "../stores/ThreadStore";

  import ClosableTab from "./ClosableTab.svelte";
  import ThreadRow from "./ThreadRow.svelte";

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
  let threadFilter = "";
  let threadFilterChange = evt => {
    threadFilter = evt.target.value;
  };
  $: fileNames = $ThreadStore ? Object.keys($ThreadStore).sort() : [];
  $: threadNames = $ThreadStore
    ? Object.keys(
        Object.entries($ThreadStore).reduce((reduced, [fileName, threads]) => {
          return Object.assign({}, reduced, threads);
        }, {})
      )
        .filter(
          threadName =>
            threadFilter === "" ||
            threadName.toLowerCase().indexOf(threadFilter.toLowerCase()) >= 0
        )
        .sort(nameSort)
    : [];

  let getThreads = threadName => {
    let ts = fileNames.map(fileName => {
      return $ThreadStore[fileName] && $ThreadStore[fileName][threadName];
    });
    return ts;
  };

  let setMainSize = () => {
    mainSize = main.getBoundingClientRect().width;
  };

  let closeTab = ({ detail }) => {
    console.log("closeTab", detail);
    FileStore.remove(detail);
    ThreadStore.remove(detail);
  };

  let main;
  let mainSize = 100;
  $: cellWidth = `${Math.floor(mainSize / (fileNames.length + 1)) - 1}px`;
  onMount(setMainSize);
  afterUpdate(setMainSize);
  window.onresize = setMainSize;
</script>

<style>
  .grid {
    display: grid;
    grid-column-gap: 1px;
  }
  input {
    width: 100%;
    margin: 10px 0;
  }
</style>

<div class="main" bind:this={main}>
  <div
    class="grid"
    style="grid-template-columns: 200px repeat({fileNames.length}, {cellWidth});">

    <div style={fileNames.length > 0 ? '' : 'display:none;'}>
      <input
        value={threadFilter}
        on:keyup={threadFilterChange}
        placeholder="Thread Filter" />
    </div>
    {#each fileNames as fileName, index}
      <ClosableTab
        eventName="closeTab"
        identifier={fileName}
        on:closeTab={closeTab}>
        <span slot="content">{fileName}</span>
      </ClosableTab>
    {/each}
    {#each threadNames as threadname}
      <ThreadRow threadName={threadname} threads={getThreads(threadname)} />
    {/each}
  </div>
</div>
