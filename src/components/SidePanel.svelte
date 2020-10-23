<script>
  import FileLoader from "./FileLoader.svelte";
  import ThreadStates from "./ThreadStates.svelte";

  export let fileStore;
  export let threadStore;
</script>

<style>

</style>

<div class="sidebar">
  <ThreadStates type={threadStore.type} loaded={fileStore && Object.keys(fileStore).length > 0} />
  <FileLoader />
</div>
