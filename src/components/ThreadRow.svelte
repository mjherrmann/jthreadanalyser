<script>
  import Thread from "./Thread.svelte";
  import ThreadDetails from "./ThreadDetails.svelte";

  export let threads;
  export let threadName;

  let showDetails = false;
</script>

<style>
  .row-wrapper {
    display: contents;
  }
  .row-wrapper:hover div {
    background-color: rgb(0, 0, 0, 0.2) !important;
  }
</style>

<div
  class="row-wrapper"
  on:click={() => {
    showDetails = !showDetails;
  }}>
  <div style="overflow:hidden;">{threadName}</div>
  {#each threads as t, index}
    <Thread thread={t} />
  {/each}
</div>
{#if showDetails}
  <div
    class="row-wrapper threadDetails"
    on:click={() => {
      showDetails = !showDetails;
    }}>
    <div style="overflow:hidden;" />
    {#each threads as t, index}
      <ThreadDetails thread={t} />
    {/each}
  </div>
{/if}
