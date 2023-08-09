<script>
  import { activePlayer, phase, players } from '$lib/stores/game.js';
</script>

<div class="w-full bg-theme-50 border-2 border-theme-700 p-4">
  <p>{$activePlayer} may {$phase}</p>
</div>
