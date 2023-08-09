<script>
  import { page } from '$app/stores';
  import { activePlayer, buildingDB, phase, websocket, typeMenu } from '$lib/stores/game.js';

  export let bid;
  export let address;
  export let x;
  export let y;
  export let type;
  export let stop;

  $: active = $activePlayer == $page.params.player && $phase == "new-buildings";

  function handleClick() {
    if (!active) return;

    console.log("Turn on type menu");
    
    $typeMenu = {
      active: true,
      x,
      y,
      bid
    };
  }

  function handleTypeClick(bType) {
    if (active) {
      // $websocket = {
      const event = {
          who: $page.params.player,
          what: "new-building",
          where: bid,
          type: bType
      };
      console.log("Send this", event);
      // $websocket = event;
    }
  }

  function computeBuildingType() {
    if (!$buildingDB || !(bid in $buildingDB)) {
      return "";
    }

    const ans = $buildingDB[bid];
    // console.log("Computed", ans);
    return ans;
  }

  $: bType = computeBuildingType($buildingDB);

</script>

<g class:active on:click={handleClick}>
  <circle cx={x} cy={y} r="8" fill="#84954f"/>

  {#if bType}
    <text class="pointer-events-none" {x} y={y+1} fill="#eeda87" font-size="8" dominant-baseline="middle" text-anchor="middle">{bType}</text>
  {:else}
    <text class="pointer-events-none" {x} y={y+1} fill="#eeda87" font-size="8" dominant-baseline="middle" text-anchor="middle">{stop}</text>
  {/if}
</g>

<style>
  .active:hover circle {
    fill: black;
    cursor: pointer;
  }
</style>