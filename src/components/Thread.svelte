<script>
  export let thread;
</script>

<style>

</style>

{#if thread}
  <div class="flex-child {thread.info && thread.info.state} file-thread" style="overflow:hidden">
    {(thread.stack && thread.stack[0]) || (thread.nativeStack && thread.nativeStack[0]) || 'Stack not yet parsed'}
  </div>
{:else}
  <div class="flex-child" />
{/if}
