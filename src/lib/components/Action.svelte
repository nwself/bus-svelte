<script>
  import { page } from '$app/stores';
  import { activePlayer, workerAreas, playerDB, phase, websocket } from '$lib/stores/game.js';

  export let name;
  export let img;
  export let reverse;
  export let singleton;

  const track = [{
    name: "A",
    value: "MAX",
    class: "bg-theme-50",
  }, {
    name: "B",
    value: "-1",
    class: "bg-theme-50",
  }, {
    name: "C",
    value: "-2",
    class: "bg-theme-50",
  }, {
    name: "D",
    value: "-3",
    class: "bg-theme-50",
  }, {
    name: "E",
    value: "-4",
    class: "bg-theme-50",
  }, {
    name: "F",
    value: "-5",
    class: "bg-theme-50",
  }];

  $: spaces = computeSpaces($workerAreas, $playerDB);

  function computeSpaces() {
    let temp = singleton ? [{name: " ", value: " ", class: "bg-theme-50"}] : track;

    console.log("label", $workerAreas[name]);

    for (var i = 0; i < temp.length; i++) {
      if ($workerAreas[name].workers.length > i) {
        const player = $workerAreas[name].workers[i];
        temp[i].class = `bg-${$playerDB[player].color}-400`;
      } else {
        temp[i].class = "bg-theme-50";
      }
    }

    // $workerAreas?.[name]?.workers?.forEach((player, i) => {
    //   // track[i].class = player.color;
    //   temp[i].class = `bg-${$playerDB[player].color}-400`;
    // });
    console.log("Recomputing spaces to", temp, name);

    return temp;
  }

  // const spaces = singleton ? [{name: " ", value: " ", class: "bg-theme-50"}] : track;
  
  // console.log($websocket.workerAreas?.[name]?.workers, "workers on", name);
  function handleClick() {
    console.log("a click on", name);
    if ($page.params.player == $activePlayer && $phase == "place-workers") {
      const event = {
        "where": name,
        "who": $page.params.player,
        "what": "place-worker",
      }

      console.log("Need to send this event", event);
      $websocket = event;
    }
  }

  const prettyName = {
    "build-road": "Line Expansion",
    "new-bus": "Buy a Bus",
    "more-people": "New Passengers",
    "new-buildings": "New Buildings",
    "stop-time": "The Clock",
    "vroom": "   Vroooooooom",
    "first-player": "Starting Player",
  }[name];
</script>

<div class="flex flex-row drop-shadow-lg bg-theme-400 border-2 border-theme-700 my-1">
  <div class:-rotate-12={name == "vroom"} class="w-20 flex items-center justify-center text-white text-sm text-center font-bold bg-theme-700">
    {#if name == "vroom"}
      <svg viewBox="0 0 425 300">
        <path id="curve" d="M6,150C49.63,93,105.79,36.65,156.2,47.55,207.89,58.74,213,131.91,264,150c40.67,14.43,108.57-6.91,229-145" />
        <text x="25">
          <textPath xlink:href="#curve">
            Vrooooooooooom
          </textPath>
        </text>
      </svg>
    {:else}
      {prettyName}
    {/if}
  </div>
  <div on:click={handleClick} class="flex" class:flex-row-reverse={reverse}>
    {#each spaces as space, i}
    <div class="flex flex-col items-center justify-center p-2 font-bold text-theme-700">
      <div class="text-sm mb-0">
        {space.value}
      </div>
      <div class="{space.class} mx-0.5 mb-1 w-8 h-8 flex items-center justify-center border border-theme-700 rounded-full">
        {space.name}
      </div>
    </div>
    {/each}
  </div>
</div>


<div class="hidden">
  <!-- learn how to do this better, putting hidden elements
  so that tailwind will add to built css -->
  <p class="bg-yellow-400"></p>
  <p class="bg-red-400"></p>
</div>

<style>
  path {
    fill: transparent;
  }

  text {
    fill: white;
    font-size: 4rem;
  }
</style>