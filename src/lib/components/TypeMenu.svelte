<script>
  import { page } from '$app/stores';
  import { fade } from 'svelte/transition';
  import { typeMenu, websocket } from '$lib/stores/game.js';

  function handleClick(bType) {
    console.log("This is the type but what is the bid?", bType);

    const event = {
        who: $page.params.player,
        what: "new-building",
        where: $typeMenu.bid,
        type: bType
    };

    console.log("Send this", event);
    $websocket = event;

    $typeMenu.active = false;
  }    
</script>

{#if $typeMenu.active}
<g transition:fade>
  <circle class="button" on:click={() => handleClick("home")} cx={$typeMenu.x - 18} cy={$typeMenu.y - 15} r="8" fill="blue"/>
  <circle class="button" on:click={() => handleClick("work")} cx={$typeMenu.x} cy={$typeMenu.y - 22} r="8" fill="gray"/>
  <circle class="button" on:click={() => handleClick("pub")} cx={$typeMenu.x + 18} cy={$typeMenu.y - 15} r="8" fill="orange"/>
</g>
{/if}

<style>
  .button {
    cursor: pointer;
    filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
  }
</style>