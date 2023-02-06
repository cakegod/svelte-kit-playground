<script lang="ts">
	import Cell from './Cell.svelte';
	import Cells from './Cells.svelte';
	import { CELL_COLORS, RED } from './data';
	import { currency, Upgrade, upgrades } from './store';

	let currentCurrency = 0;

	setInterval(() => (currentCurrency += 1), 1000);

	$: currency.updateCurrency(Math.round(currentCurrency));
	$: console.log(currentCurrency);

	function buyUpgrade(upgrade: Upgrade) {
		if (currentCurrency < upgrade.getPrice()) return;
		currentCurrency -= upgrade.getPrice();
		setInterval(() => (currentCurrency += upgrade.power), upgrade.interval);
		upgrades.update(
			$upgrades.map((u) => {
				if (u.name === upgrade.name) {
					upgrade.amount += 1;
					return upgrade;
				}
				return u;
			})
		);
	}
</script>

<div class="flex gap-4">
	{#each CELL_COLORS as { color, filled: filledColor, empty: emptyColor }}
		<Cells {filledColor} {emptyColor} {color} />
	{/each}
</div>

<h2>{currentCurrency}</h2>
{#key currentCurrency}
	<button class="btn-error btn-lg btn m-4" on:click={() => (currentCurrency += 1)}>Click</button>
{/key}

{#each $upgrades as upgrade}
	<Cell color={RED.filled} />
	<span class="badge-primary badge">{upgrade.getPrice()}</span>

	<button on:click={() => buyUpgrade(upgrade)} class="btn flex flex-col"> Buy cursor </button>
{/each}
