<script lang="ts">
	import Cell from './Cell.svelte';
	import Cells from './Cells.svelte';
	import { COLORS_NAME, CURRENCY_COLORS } from './data';
	import { currency, Upgrade, upgrades } from './store';

	let rawCurrency = 0;

	setInterval(() => (rawCurrency += 1), 1000);

	$: currency.updateCurrency(Math.round(rawCurrency));

	function buyUpgrade(upgrade: Upgrade) {
		if (rawCurrency < upgrade.getPrice()) return;
		rawCurrency -= upgrade.getPrice();
		setInterval(() => (rawCurrency += upgrade.power), upgrade.interval);
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

	function toCurrencyType(price: number, name?: boolean) {
		const stringifiedPrice = String(price).split('');
		if (name) {
			return CURRENCY_COLORS.find(
				(type) => type.color === COLORS_NAME[stringifiedPrice.length - 1]
			)!.filled;
		}
		return `${stringifiedPrice[0]}${stringifiedPrice[0 + 1] ? '.' + stringifiedPrice[0 + 1] : ''}`;
	}
</script>

<div class="flex gap-4">
	{#each CURRENCY_COLORS as { color, filled, empty }}
		<Cells filledColor={filled} emptyColor={empty} {color} />
	{/each}
</div>

<h2>{rawCurrency}</h2>
{#key rawCurrency}
	<button class="btn-error btn-lg btn m-4" on:click={() => (rawCurrency += 1)}>Click</button>
{/key}

{#each $upgrades as upgrade}
	<span class="badge-primary badge gap-1">
		{toCurrencyType(upgrade.getPrice())}
		<Cell color={toCurrencyType(upgrade.getPrice(), true)} /></span
	>

	<button on:click={() => buyUpgrade(upgrade)} class="btn flex flex-col"> Buy cursor </button>
{/each}
