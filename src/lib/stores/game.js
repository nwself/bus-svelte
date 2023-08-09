import { writable, derived } from 'svelte/store';
import websocketStore from "svelte-websocket-store";

export const game = writable({"slug": "abc", "phase": "place-workers", "activePlayer": "tripswithtires", "players": {"tripswithtires": {"name": "tripswithtires", "workers": 21, "canPass": false, "workersUsedThisPhase": 0, "passed": false, "roads": [3], "canRoad": [32, 1, 2, 4, 25, 42, 30], "startNode": 1, "endNode": 3, "busCount": 1, "timeyWimeys": 0, "hasFirstPlayerToken": true}, "piestastedgood": {"name": "piestastedgood", "workers": 21, "canPass": false, "workersUsedThisPhase": 0, "passed": false, "roads": [], "canRoad": [], "startNode": null, "endNode": null, "busCount": 1, "timeyWimeys": 0, "hasFirstPlayerToken": false}}, "workerAreas": {"build-road": {"name": "build-road", "size": 6, "workers": [], "done": false}, "new-bus": {"name": "new-bus", "size": 1, "workers": [], "done": false}, "more-people": {"name": "more-people", "size": 6, "workers": [], "done": false}, "new-buildings": {"name": "new-buildings", "size": 6, "workers": [], "done": false}, "stop-time": {"name": "stop-time", "size": 1, "workers": [], "done": false}, "vroom": {"name": "vroom", "size": 6, "workers": [], "done": false}, "first-player": {"name": "first-player", "size": 1, "workers": [], "done": false}}, "timeyWimeys": 5, "time": "work"});


export const websocket = websocketStore("ws://localhost:8000/ws/game/abcdef/", {});
export const players = derived(websocket, $websocket => {
  console.log("Hey the websocket is awake", $websocket);
  return $websocket.players ? Object.values($websocket.players): []
});

export const playerDB = derived(websocket, $websocket => {
  return $websocket.players;
})

export const activePlayer = derived(websocket, $websocket => $websocket.activePlayer);
export const phase = derived(websocket, $websocket => $websocket.phase);
export const maxBuses = derived(websocket, $websocket => $websocket.maxBuses);
export const workerAreas = derived(websocket, $websocket => $websocket.workerAreas);

export const roadDB = derived(websocket, $websocket => {
  if (!$websocket.players) {
    return;
  }
  let r = {};
  Object.values($websocket.players).forEach(player => {
    player.roads.forEach(eid => {
      if (eid in r) {
        r[eid].push(player.name);
      } else {
        r[eid] = [player.name]
      }
    })
  });
  console.log("Made roadDB", r);
  return r;
});

export const buildingDB = derived(websocket, $websocket => $websocket.buildings);
export const peopleDB = derived(websocket, $websocket => $websocket.people);

export const typeMenu = writable({
  active: false,
  x: 0,
  y: 0,
  bid: -1,
});

// export const workerSpaces = derived(websocket, $websocket => {
//   if (!$websocket.workerAreas || !$websocket.players) return;

//   const track = [{
//     name: "A",
//     value: "MAX",
//     class: "bg-theme-50",
//   }, {
//     name: "B",
//     value: "-1",
//     class: "bg-theme-50",
//   }, {
//     name: "C",
//     value: "-2",
//     class: "bg-theme-50",
//   }, {
//     name: "D",
//     value: "-3",
//     class: "bg-theme-50",
//   }, {
//     name: "E",
//     value: "-4",
//     class: "bg-theme-50",
//   }, {
//     name: "F",
//     value: "-5",
//     class: "bg-theme-50",
//   }];

//   let temp = singleton ? [{name: " ", value: " ", class: "bg-theme-50"}] : track;

//   $websocket.workerAreas[name].workers.forEach((player, i) => {
//     // track[i].class = player.color;
//     temp[i].class = `bg-${$playerDB[player].color}-400`;
//   });
//   console.log("Recomputing spaces to", temp, name);

//   return temp;

// });