<script>
  import { activePlayer, phase, websocket } from '$lib/stores/game.js';

  export let player;

  function handleClick() {
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

<p class="mb-3">Do you want to stop time??!?!</p>
<button type="button" on:click={() => handleClick("yes")} class="focus:outline-none text-theme-700 bg-theme-50 hover:bg-theme-400 focus:ring-4 border-2 border-theme-700 font-bold hover:text-theme-50 focus:ring-theme-400 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Yes, Stop Time</button>
<button type="button" on:click={() => handleClick("no")} class="focus:outline-none text-theme-700 bg-theme-50 hover:bg-theme-400 focus:ring-4 border-2 border-theme-700 font-bold hover:text-theme-50 focus:ring-theme-400 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">No, Don't Stop Time</button>
