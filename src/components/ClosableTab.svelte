<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export let identifier;
  export let eventName;
  let size = 20;
  let linecolour = "#000000";
  let fillcolour = "#FF0000";
</script>

<style>
  .closable {
    position: relative;
  }

  .contentcontainer {
    margin: 10px 0;
    bottom: 0;
    padding: 10px;
    border-top: 1px solid grey;
    border-right: 1px solid grey;
    text-align: center;
    overflow: hidden;
  }
  svg {
    position: absolute;
    right: 0px;
    z-index: 10;
  }
  svg:hover {
    /* Start the shake animation and make the animation last for 0.5 seconds */
    animation: shake 0.5s;

    /* When the animation is finished, start again */
    animation-iteration-count: infinite;
  }

  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }
  }
</style>

<div class="closable">
  <div class="contentcontainer">
    <slot name="content" />
  </div>
  <svg
    on:click={dispatch(eventName, identifier)}
    xml:space="preserve"
    viewBox="0 0 100 100"
    y="0"
    x="0"
    xmlns="http://www.w3.org/2000/svg"
    id=""
    version="1.1"
    width={size}
    height={size}
    style="top:0; right:-{size / 2}px"
    xmlns:xlink="http://www.w3.org/1999/xlink">
    <g
      style="transform-origin: 50% 50%; transform: rotate(0deg) scale(0.8, 0.8);">
      <circle
        stroke-miterlimit="10"
        stroke-width="8"
        stroke={linecolour}
        fill="white"
        r="40"
        cy="50"
        cx="50"
        style="" />
      <path
        d="M60.6 29.5L50 40.1 39.4 29.5c-2.7-2.7-7.1-2.7-9.9 0-2.7 2.7-2.7 7.1 0
        9.9L40.1 50 29.5 60.6c-2.7 2.7-2.7 7.1 0 9.9s7.1 2.7 9.9 0L50 59.9l10.6
        10.6c2.7 2.7 7.1 2.7 9.9 0 2.7-2.7 2.7-7.1 0-9.9L59.9
        50l10.6-10.6c2.7-2.7 2.7-7.1 0-9.9s-7.2-2.7-9.9 0z"
        style="fill: {fillcolour}" />
    </g>
  </svg>

</div>
