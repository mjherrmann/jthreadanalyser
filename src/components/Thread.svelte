<script>
  //import { FileStore } from "../stores/FileStore";
  export let thread;
</script>

<style>

</style>

{#if thread}
  <div class="flex-child {thread.state} file-thread" style="overflow:hidden">
    {thread.stack[0] || thread.nativeStack[0]}
  </div>
{:else}
  <div class="flex-child" />
{/if}
