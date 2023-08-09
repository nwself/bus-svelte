<script>
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';
  import { typeMenu, websocket } from '$lib/stores/game.js';

  export let count = 0;
  export let nid;
  export let x;
  export let y;



</script>

<!-- <circle cx={x} cy={y} r="5" fill="#99dbdf"/> -->

<use on:click {x} {y} fill="white" stroke="#99dbdf" stroke-width="2" xlink:href="#peopletag"/>

<text class="pointer-events-none" x={x+5} y={y+.5} fill="black" font-size="7" dominant-baseline="middle" text-anchor="middle">x{count}</text>
