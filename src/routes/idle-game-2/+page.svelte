<script lang="ts">
	import Upgrades from './Upgrades.svelte';
	import Cells from './Cells.svelte';
	import { currency, experience, rawCurrency } from './store';
	import { CURRENCY_COLORS } from './data';
	import { onMount } from 'svelte';

	let game;

	onMount(() => {
		game = (() => {
			let lastTime: number;
			let totalTime = 0;
			function gameLoop() {
				requestAnimationFrame(() => {
					const currentTime = Date.now();
					if (!lastTime) {
						lastTime = currentTime;
					}
					const deltaTime = currentTime - lastTime;
					totalTime += deltaTime;
					lastTime = currentTime;
					updateGame(deltaTime, totalTime);
					setTimeout(() => requestAnimationFrame(gameLoop), 1000 / 30);
				});
			}

			function updateGame(deltaTime: number, totalTime: number) {
				// rawCurrency.increase(
				// 	$upgrades.reduce(
				// 		(acc, curr) => (acc += (curr.amount * curr.power * deltaTime) / curr.interval),
				// 		0
				// 	)
				// );
			}

			return {
				gameLoop
			};
		})();
		game.gameLoop();
	});

	// Update when rawCurrency changes
	$: currency.updateCurrency(Math.round($rawCurrency));
	$: console.log($rawCurrency);
</script>

<div class="flex gap-4">
	{#each CURRENCY_COLORS as { color, filled, empty }}
		<Cells filledColor={filled} emptyColor={empty} {color} />
	{/each}
</div>

<p>Experience {$experience.cursor}</p>

<button class="btn-error btn-lg btn m-4" on:click={() => rawCurrency.increase(1)}>Click</button>

<Upgrades />
