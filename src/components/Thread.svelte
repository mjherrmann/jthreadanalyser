<script>
  //import { FileStore } from "../stores/FileStore";
  export let thread;
  export let maxWidth = 100;
  let width = `${maxWidth}px`;
</script>

<style>
  div {
    overflow: hidden;
  }
</style>

{#if thread}
  <div class="flex-child {thread.state} file-thread" style="width: {width}">
    {thread.stack[0]}
  </div>
{:else}
  <div class="flex-child" style="width: {maxWidth}px" />
{/if}
