  <script>
  import { page } from '$app/stores';
  import { players } from '$lib/stores/game.js';

  import ActionArea from "$lib/components/ActionArea.svelte";
  import Banner from "$lib/components/Banner.svelte";
  import PlayerArea from "$lib/components/PlayerArea.svelte";
  import SVG from "$lib/components/SVG.svelte";
  import Defs from "$lib/components/Defs.svelte";
  import Map from "$lib/components/Map.svelte";
  import Clock from "$lib/components/Clock.svelte";
</script>

<div class="container">
  <Banner/>
  {#if $players?.length > 0}
  <div class="flex flex-row">
    <ActionArea/>
    <PlayerArea/>
    <Clock/>
  </div>
  <SVG>
    <Defs/>
    <Map/>
  </SVG>
  {:else}
  <div>Loading...</div>
  {/if}
</div>
