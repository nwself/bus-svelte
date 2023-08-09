<script>
  import Building from "$lib/components/Building.svelte";
  import People from "$lib/components/People.svelte";
  import { page } from '$app/stores';
  import { activePlayer, buildingDB, peopleDB, phase, websocket } from '$lib/stores/game.js';

  export let x;
  export let y;
  export let type;
  export let nid;
  export let buildings;

  // console.log(x, y, type, nid, buildings);

  function computeStroke() {
    if (type == "tube") return "#99dbdf";
    if (type == "starting") return "white";
    return "#838385";
  }

  function computeFill() {
    if (type == "tube") return "white";
    if (type == "starting") return "#e1d3ab";
    return "#bebebf";
  }

  function computeLine() {
    if (!buildings || buildings.length == 0) {
      return {
        x1: x,
        y1: y,
        x2: x,
        y2: y
      }
    }
    const i = buildings.length - 1;
    return {
      x1: x,
      y1: y,
      x2: buildings[i].x,
      y2: buildings[i].y
    }
  }

  const stroke = computeStroke();
  const fill = computeFill();

  const {x1, y1, x2, y2} = computeLine();

  $: active = (nid == 31 || nid == 9) && $activePlayer == $page.params.player && $phase == "more-people";

  function handleClick() {
    if (active) {
      // $websocket = {
      const event = {
          who: $page.params.player,
          what: "more-people",
          where: nid,
      };
      console.log("Send this", event);
      $websocket = event;
    }
  }
</script>

<line {x1} {y1} {x2} {y2} stroke="#84954f" stroke-width="3"/>

<!-- <use {x} {y} href="#myCircle" on:click={handleClick}/> -->
<circle on:click={handleClick} cx={x} cy={y} r="5" {fill} {stroke}/>
<!-- <text {x} {y}>{nid}</text> -->

{#each buildings as {x, y, bid, stop}, index}
  <Building {x} {y} {type} {stop} {bid} address={index}/>
{/each}

{#if $peopleDB && nid in $peopleDB && $peopleDB[nid]}
  <People on:click={handleClick} {x} {y} {nid} count={$peopleDB[nid]}/>
{/if}
