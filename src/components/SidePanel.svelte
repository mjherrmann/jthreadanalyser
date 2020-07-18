<script>
  import FileLoader from "./FileLoader.svelte";
  import ThreadStates from "./ThreadStates.svelte";

  export let fileStore;
</script>

<style>

</style>

<div class="sidebar">
  <ThreadStates loaded={fileStore && Object.keys(fileStore).length > 0} />
  <FileLoader />
</div>
