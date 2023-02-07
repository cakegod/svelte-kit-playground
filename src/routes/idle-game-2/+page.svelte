<script lang="ts">
	import Upgrades from './Upgrades.svelte';
	import Cells from './Cells.svelte';
	import { currency, rawCurrency } from './store';
	import { onMount } from 'svelte';

	let game;

	onMount(() => {
		game = (() => {
			// let lastTime: number;
			// let totalTime = 0;
			function gameLoop() {
				requestAnimationFrame(() => {
					// const currentTime = Date.now();
					// if (!lastTime) {
					// 	lastTime = currentTime;
					// }
					// const deltaTime = currentTime - lastTime;
					// totalTime += deltaTime;
					// lastTime = currentTime;
					// updateGame(deltaTime, totalTime);
					updateGame();
					setTimeout(gameLoop, 1000 / 30);
				});
			}

			function updateGame() {
				currency.updateCurrency(Math.round($rawCurrency));
			}

			return {
				gameLoop
			};
		})();
		game.gameLoop();
	});
</script>

<Cells />

{#key $rawCurrency}
	<button class="btn-error btn-lg btn my-8" on:click={() => rawCurrency.increase(1)}>
		Click the button!
	</button>
{/key}

<Upgrades />
