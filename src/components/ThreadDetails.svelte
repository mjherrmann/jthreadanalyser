<script>
  export let thread;
</script>

<style>
  .head {
    font-weight: 800;
    border-bottom: 1px solid rgb(0, 0, 0, 0.2);
  }
  .stack {
    padding: 2px;
    white-space: pre-line;
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
  }
</style>

{#if thread}
  <div class="wrapper">
    <div class="head">Java Stack</div>
    <div class="stack">{thread.stack.join('\n')}</div>
    <div class="head">Native Stack</div>
    <div class="stack">{thread.nativeStack.join('\n')}</div>
  </div>
{:else}
  <div class="wrapper" />
{/if}
