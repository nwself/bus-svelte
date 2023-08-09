<script>
  import { page } from '$app/stores';
  import { activePlayer, workerAreas, roadDB, playerDB, phase, websocket } from '$lib/stores/game.js';

  export let eid;
  export let source;
  export let target;

  const x1 = source.x;
  const y1 = source.y;
  const x2 = target.x;
  const y2 = target.y;

  $: active = $activePlayer == $page.params.player && $phase == "build-road";

  function handleClick() {
    console.log("Click on an edge", eid)
    if (active) {
      $websocket = {
          "who": $page.params.player,
          "what": "build-road",
          "where": eid
      }
    }
  }

  const dashoffset = {
    yellow: "0",
    red: "5",
    blue: "10",
    black: "7",
  }

  function computePLines() {
    if (!$roadDB || !(eid in $roadDB)) {
      return [];
    }
    // console.log("road db", $roadDB[eid]);
    // console.log("player db", $playerDB[$roadDB[eid]]);
    // const ans = $playerDB[$roadDB[eid]].color;
    const ans = $roadDB[eid].map(playerName => $playerDB[playerName].color);
    // console.log("Computed", ans);
    return ans;
  }

  $: plines = computePLines($roadDB);

  // const height = 10;
  // const slope = (y2 - y1) / (x2 - x1);
  // // const parallelX1 = x1 

  // const degrees = Math.atan(slope) * 180;
  // const distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

  // console.log(x1, y1, x2, y2, slope, distance);
  // // if (slop != 0 && slope != Infinity) {
  // //   const m = -1/slope;
  // //   const px1 = m * x1;
  // //   const p
  // //   const px2 = m * x2;

  // //   const px1 = m * x1;
  // //   const px2 = m * x2;
  // // }
  // const delta = 3;
  // let px1;
  // let py1;
  // let px2;
  // let py2;
  // let p2x1;
  // let p2y1;
  // let p2x2;
  // let p2y2;
  // if (slope == -1) {
  //   console.log("Got another one")
  //   px1 = x1 - delta;
  //   py1 = y1 - delta;
  //   px2 = x2 - delta;
  //   py2 = y2 - delta;

  //   p2x1 = x1 + delta;
  //   p2y1 = y1 + delta;
  //   p2x2 = x2 + delta;
  //   p2y2 = y2 + delta;
  // } else if (slope == 1) {
  //   px1 = x1 + delta;
  //   py1 = y1 - delta;
  //   px2 = x2 + delta;
  //   py2 = y2 - delta;

  //   p2x1 = x1 - delta;
  //   p2y1 = y1 + delta;
  //   p2x2 = x2 - delta;
  //   p2y2 = y2 + delta;
  // } else if (slope == Infinity || slope == -Infinity) {
  //   px1 = x1 + delta;
  //   py1 = y1;
  //   px2 = x2 + delta;
  //   py2 = y2;

  //   p2x1 = x1 - delta;
  //   p2y1 = y1;
  //   p2x2 = x2 - delta;
  //   p2y2 = y2;
  // } else if (slope == 0 || slope == -0) {
  //   px1 = x1;
  //   py1 = y1 + delta;
  //   px2 = x2;
  //   py2 = y2 + delta;

  //   p2x1 = x1;
  //   p2y1 = y1 - delta;
  //   p2x2 = x2;
  //   p2y2 = y2 - delta;
  // }
</script>

<g class:active on:click={handleClick}>
  <line {x1} {y1} {x2} {y2} data-eid={eid} stroke="#838385" stroke-width="7"/>
  <line {x1} {y1} {x2} {y2} stroke="white" stroke-dasharray="4" />

  {#each plines as pline}
    <line {x1} {y1} {x2} {y2} stroke={pline} stroke-dashoffset={dashoffset[pline]} stroke-dasharray="5 5" stroke-width="3" />
  {/each}
</g>

<!-- <rect x={x1} y={y1 - height/2} width={distance} {height} transform="rotate({degrees} {x1} {y1})"/> -->

<!--
{#if slope == -1 || slope == 1 || slope == Infinity || slope == -Infinity || slope == 0 || slope == -0}
  <line x1={px1} y1={py1} x2={px2} y2={py2} stroke="#838385"  />
  <line x1={p2x1} y1={p2y1} x2={p2x2} y2={p2y2} stroke="#838385"  />
{/if}
-->

<style>
  .active:hover {
    cursor: pointer;
  }

  .active:hover line:first-child {
    stroke: black !important;
  }

  .player-yellow {
    stroke: yellow !important;
  }

  .player-red {
    stroke: red !important;
  }
</style>