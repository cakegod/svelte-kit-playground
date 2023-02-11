<script lang="ts">
	import { IconMouse2, IconPlant, IconSeeding, IconTree, IconTrees } from '@tabler/icons-svelte';
	import Cell from './Cell.svelte';
	import Tooltip from './Tooltip.svelte';
	import { COLORS_NAME, CURRENCY_COLORS } from '../data/colors';
	import { rawCurrency, upgrades } from '../stores';
	import { slide } from 'svelte/transition';

	function rawCurrencyToCurrencyColor(price: number, name?: boolean) {
		const stringifiedPrice = String(price).split('');
		if (name) {
			return CURRENCY_COLORS.find(
				(type) => type.color === COLORS_NAME[stringifiedPrice.length - 1]
			)!.filled;
		}
		return `${stringifiedPrice[0]}${stringifiedPrice[0 + 1] ? '.' + stringifiedPrice[0 + 1] : ''}`;
	}

	const capitalizeFirstLetter = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
	const iconSize = 45;

	const upgradeIcons = [
		{ name: 'cursor', component: IconMouse2 },
		{ name: 'seedling', component: IconSeeding },
		{ name: 'plant', component: IconPlant },
		{ name: 'tree', component: IconTree },
		{ name: 'forest', component: IconTrees }
	];
</script>

<div class="flex flex-wrap gap-6">
	{#each $upgrades as upgrade, i}
		<div class="flex flex-col items-center gap-1">
			<div class="flex w-full justify-between">
				<span class="badge-accent badge gap-1 font-bold">
					{rawCurrencyToCurrencyColor(upgrade.getPrice())}
					<Cell color={rawCurrencyToCurrencyColor(upgrade.getPrice(), true)} size="badge" /></span
				>
				<span class="badge-accent badge font-bold">{upgrade.level}</span>
			</div>

			<Tooltip>
				<button
					disabled={upgrade.getPrice() > $rawCurrency}
					on:click={() => upgrade.buyUpgrade()}
					class="rounded-box btn flex h-24 w-24 flex-col gap-2"
				>
					<svelte:component this={upgradeIcons[i].component} size={iconSize} />
				</button>
				<progress
					class="w-content progress"
					value={$rawCurrency}
					max={upgrade.getPrice()}
					class:progress-success={!(upgrade.getPrice() > $rawCurrency)}
				/>

				<div
					transition:slide
					slot="tooltip-content"
					class="rounded-box absolute flex w-60 -translate-x-1/2 flex-col gap-1 bg-primary p-4 text-primary-content shadow"
				>
					<p>{upgrade.tooltip}</p>
					<div>
						<p class="font-bold text-primary-content/75">
							{`${capitalizeFirstLetter(upgrade.name)}s: ${upgrade.amount} -> ${
								upgrade.getNextLevelInfo().amount
							}`}
						</p>
						<p class="font-bold text-primary-content/75">
							{`${capitalizeFirstLetter(upgrade.name)} power: ${upgrade.power} -> ${
								upgrade.getNextLevelInfo().power
							}`}
						</p>
					</div>
				</div>
			</Tooltip>
		</div>
	{/each}
</div>
