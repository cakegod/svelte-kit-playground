<script lang="ts">
	import Upgrades from './Upgrades.svelte';

	import Cells from './Cells.svelte';
	import { currency, rawCurrency, upgrades } from './store';
	import { onMount } from 'svelte';
	import { CURRENCY_COLORS } from './data';

	let lastTime: number;
	let totalTime = 0;

	onMount(() => {
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
		gameLoop();
	});

	function updateGame(deltaTime: number, totalTime: number) {
		// rawCurrency += (deltaTime / 1000) * 1;

		rawCurrency.increase(
			$upgrades.reduce(
				(acc, curr) => (acc += (curr.amount * curr.power * deltaTime) / curr.interval),
				0
			)
		);
	}
	$: currency.updateCurrency(Math.round($rawCurrency));
</script>

<div class="flex gap-4">
	{#each CURRENCY_COLORS as { color, filled, empty }}
		<Cells filledColor={filled} emptyColor={empty} {color} />
	{/each}
</div>

<!-- {#key rawCurrency} -->
<button class="btn-error btn-lg btn m-4" on:click={() => rawCurrency.increase(1)}
	>Click</button
>
<!-- {/key} -->

<Upgrades />
