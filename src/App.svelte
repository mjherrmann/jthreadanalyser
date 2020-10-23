<script>
  import SidePanel from "./components/SidePanel.svelte";
  import MainPanel from "./components/MainPanel.svelte";

  import { FileStore } from "./stores/FileStore";
  import { ThreadStore } from "./stores/ThreadStore";
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
  <SidePanel threadStore={$ThreadStore} fileStore={$FileStore} />
  <MainPanel />
</main>
