<script>
  export let loaded = false;
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
  <div class="R">Running</div>
  <div class="CW">Waiting</div>
  <div class="B">Blocked</div>
  <div class="S">Suspended</div>
  <div class="P">Parked</div>
  <div class="Z">Zombie</div>
</div>
