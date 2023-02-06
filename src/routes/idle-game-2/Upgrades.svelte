<script lang="ts">
	import { IconMouse2 } from '@tabler/icons-svelte';
	import Cell from './Cell.svelte';
	import Tooltip from './Tooltip.svelte';
	import { COLORS_NAME, CURRENCY_COLORS } from './data';
	import { rawCurrency, upgrades } from './store';
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
</script>

<div class="flex gap-4">
	{#each $upgrades as upgrade}
		<div class="flex flex-col items-center gap-1">
			<div class="flex w-full justify-between">
				<span class="badge-accent badge gap-1 font-bold">
					{rawCurrencyToCurrencyColor(upgrade.getPrice())}
					<Cell color={rawCurrencyToCurrencyColor(upgrade.getPrice(), true)} /></span
				>
				<span class="badge-accent badge font-bold">{upgrade.level}</span>
			</div>

			<Tooltip>
				<button
					disabled={upgrade.getPrice() > $rawCurrency}
					on:click={() => upgrade.buyUpgrade()}
					class="rounded-box btn flex h-20 w-20 flex-col gap-2"
				>
					<IconMouse2 size={34} />
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
					class="rounded-box absolute flex w-52 -translate-x-1/2 flex-col gap-1 bg-primary/25 p-4 text-primary-content shadow"
				>
					<p>Creates a cursor that automatically presses the button every 2 seconds</p>
					<div>
						<p class="font-bold text-primary-content/75">
							{`Cursors: ${upgrade.amount} -> ${
								upgrade.level % 4 === 0 ? upgrade.amount - 1 : upgrade.amount + 1
							}`}
						</p>
						<p class="font-bold text-primary-content/75">
							{`Click power: ${upgrade.power} -> ${
								upgrade.level % 4 === 0 ? upgrade.power + 1 : upgrade.power
							}`}
						</p>
					</div>
				</div>
			</Tooltip>
		</div>
	{/each}
</div>
