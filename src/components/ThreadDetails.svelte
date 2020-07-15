<script>
  export let thread;
</script>

<style>

</style>

{#if thread}
  <div class="wrapper">
    <div class="stack" style="">{thread.stack.join('')}</div>
    <div class="stack" style="">{thread.nativeStack.join('')}</div>
  </div>
{:else}
  <div class="wrapper" />
{/if}
