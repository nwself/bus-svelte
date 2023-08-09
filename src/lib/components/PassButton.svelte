<script>
  import { activePlayer, phase, websocket } from '$lib/stores/game.js';

  export let player;

  function handlePassClick() {
    console.log("a click on", name);
    if (player.name == $activePlayer && $phase == "place-workers" && player.canPass) {

      const event = {
        "who": player.name,
        "what": "pass",
      }

      console.log("Need to send this event", event);
      $websocket = event;
    }
  }
</script>


{#if $activePlayer == player.name && player.canPass}
  <button type="button" on:click={handlePassClick} class="focus:outline-none text-theme-700 bg-theme-50 hover:bg-theme-400 focus:ring-4 border-2 border-theme-700 font-bold hover:text-theme-50 focus:ring-theme-400 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Pass</button>
{:else}
<button type="button" class="cursor-not-allowed text-gray-900 bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-gray-700" disabled>Pass</button>
{/if}
