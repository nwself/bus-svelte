<script>
  import { page } from '$app/stores';
  import { activePlayer, playerDB, websocket, phase } from '$lib/stores/game.js';

  import Action from "$lib/components/Action.svelte";

  const actions = [{
    name: "build-road",
    img: "",
    reverse: true,
    singleton: false,
  }, {
    name: "new-bus",
    img: "",
    reverse: false,
    singleton: true,
  }, {
    name: "more-people",
    img: "",
    reverse: false,
    singleton: false,
  }, {
    name: "new-buildings",
    img: "",
    reverse: true,
    singleton: false,
  }, {
    name: "stop-time",
    img: "",
    reverse: false,
    singleton: true,
  }, {
    name: "vroom",
    img: "",
    reverse: false,
    singleton: false,
  }, {
    name: "first-player",
    img: "",
    reverse: false,
    singleton: true,
  }];


</script>

<div class="flex flex-col items-start">
{#each actions as {name, img, reverse, singleton}}
  <Action
    {name}
    {img}
    {reverse}
    {singleton}
  />
{/each}
</div>
