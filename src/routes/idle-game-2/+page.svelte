<script lang="ts">
	import Upgrades from './Upgrades.svelte';
	import Cells from './Cells.svelte';
	import { currency, rawCurrency } from './store';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

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
					gameLoop()
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

<div class="my-8 flex flex-col items-center gap-8">
	{#key $rawCurrency}
		<p in:fly={{ y: -20, duration: 500 }} class="text-6xl font-bold">{$rawCurrency}</p>
		<button class="btn-error btn-lg btn" on:click={() => rawCurrency.increase(1)}>
			Click the button!
		</button>
	{/key}
</div>

<Upgrades />
