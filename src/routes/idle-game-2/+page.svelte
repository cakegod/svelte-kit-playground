<script lang="ts">
	import Upgrades from './Upgrades.svelte';
	import Cells from './Cells.svelte';
	import { currency, experience, rawCurrency } from './store';
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
					// updateGame(deltaTime, totalTime);
					currency.updateCurrency(Math.round($rawCurrency))
					setTimeout(gameLoop, 1000 / 30)
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

	$: console.log($rawCurrency);
</script>

<Cells />

<p>Experience {$experience.cursor}</p>

<button class="btn-error btn-lg btn m-4" on:click={() => rawCurrency.increase(1)}>Click</button>

<Upgrades />
