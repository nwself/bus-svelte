<script>
  import { page } from '$app/stores';
  import { websocket, players, playerDB, activePlayer, phase, maxBuses } from '$lib/stores/game.js';
  import PassButton from "$lib/components/PassButton.svelte";
</script>

<div class="flex flex-col ml-8">
  <p class="mb-3">{ $phase } (max-buses: { $maxBuses })</p>

  <h1>Player Area</h1>
  {#each $players as player}
    <p><span class="w-4 h-4 mr-2 inline-block bg-{player.color}-400"></span>{player.name} {player.workers} (bus count: {player.busCount}) {#if player.name == $page.params.player}
      (me)
    {/if}
    {#if player.passed}
      (passed)
    {/if}</p>
  {/each}

  {#if $playerDB}
  <PassButton player={$playerDB[$page.params.player]}/>
  {/if}
</div>

<div class="hidden">
  <!-- learn how to do this better, putting hidden elements
  so that tailwind will add to built css -->
  <p class="bg-yellow-400"></p>
  <p class="bg-red-400"></p>
</div>
