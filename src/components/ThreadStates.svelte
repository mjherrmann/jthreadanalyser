<script>
  export let loaded = false;
  export let type;
</script>

<style>
  .state div {
    display: none;
    padding: 2px;
  }
  .loaded div {
    display: block;
  }
</style>

<div class="state {loaded ? 'loaded' : ''}">
	{#if type === 'IBM'}
		<div class="R">Running</div>
		<div class="CW">Waiting</div>
		<div class="B">Blocked</div>
		<div class="S">Suspended</div>
		<div class="P">Parked</div>
		<div class="Z">Zombie</div>
	{/if}
	{#if type === 'OPENJDK'}
		<div class="NEW">New</div>
		<div class="RUNNABLE">Runnable</div>
		<div class="BLOCKED">Blocked</div>
		<div class="WAITING">Waiting</div>
		<div class="TIMED_WAITING">Timed Waiting</div>
		<div class="TERMINATED">Terminated</div>
	{/if}
</div>


