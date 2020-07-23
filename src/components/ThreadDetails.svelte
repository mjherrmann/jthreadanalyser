<script>
  export let thread;

</script>

<style>
  .head {
    font-weight: 800;
    border-bottom: 1px solid rgb(0, 0, 0, 0.2);
  }
  .stack, .blocking, .blocked, .waitingOn {
    padding: 2px;
    white-space: pre-line;
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
  }
</style>

{#if thread}
  <div class="wrapper">
  	{#if thread.blocking && thread.blocking.length > 0}
		<div class="head">Blocking</div>
		<div class="blocking">{thread.blocking.join('\n')}</div>
	{/if}
	{#if thread.blockedBy && thread.blockedBy.length > 0}
		<div class="head">Blocked by</div>
		<div class="blocked">{thread.blockedBy.join('\n')}</div>
	{/if}
	{#if thread.waitingOn && thread.waitingOn.length > 0}
	<div class="head">Blocked by</div>
    <div class="waitingOn">{thread.waitingOn.join('\n')}</div>
	{/if}
	{#if thread.monitor}
		<div class="head">Monitoring</div>
		<div class="blocked">
		{#if thread.waitingOn && thread.waitingOn.length > 0 || thread.blockedBy && thread.blockedBy.length > 0}
			waiting for lock on:{'\n'}
		{/if}
		{#if thread.blocking && thread.blocking.length > 0}
			holding lock on:{'\n'}
		{/if}
		{ thread.monitor}
		</div>
	{/if}
	{#if thread.stack && thread.stack.length > 0}
		<div class="head">Java Stack</div>
		<div class="stack">{thread.stack.join('\n')}</div>
	{/if}
	{#if thread.nativeStack && thread.nativeStack.length > 0}
		<div class="head">Native Stack</div>
		<div class="stack">{thread.nativeStack.join('\n')}</div>
	{/if}
  </div>
{:else}
  <div class="wrapper" />
{/if}
