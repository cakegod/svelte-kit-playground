<script lang="ts">
	import { IconMouse2 } from '@tabler/icons-svelte';
	import Cell from './Cell.svelte';
	import Tooltip from './Tooltip.svelte';
	import { COLORS_NAME, CURRENCY_COLORS } from './data';
	import { rawCurrency, upgrades } from './store';
	import { slide } from 'svelte/transition';
	import type { Upgrade } from './classes';

	function rawCurrencyToCurrencyColor(price: number, name?: boolean) {
		const stringifiedPrice = String(price).split('');
		if (name) {
			return CURRENCY_COLORS.find(
				(type) => type.color === COLORS_NAME[stringifiedPrice.length - 1]
			)!.filled;
		}
		return `${stringifiedPrice[0]}${stringifiedPrice[0 + 1] ? '.' + stringifiedPrice[0 + 1] : ''}`;
	}

	function buyUpgrade(upgrade: Upgrade) {
		if ($rawCurrency < upgrade.getPrice()) return;
		rawCurrency.decrease(upgrade.getPrice());

		upgrades.update(
			$upgrades.map((u) => {
				if (u.name === upgrade.name) {
					if (upgrade.level > 0 && upgrade.level % 4 === 0) {
						upgrade.amount -= 1;
						upgrade.power += 10;
					} else {
						upgrade.amount += 1;
					}

					upgrade.level += 1;

					return upgrade;
				}
				return u;
			})
		);
	}
</script>

{#each $upgrades as upgrade}
	<div class="flex flex-col items-center gap-1">
		<div class="flex w-full justify-between">
			<span class="badge-accent badge gap-1 font-bold">
				{rawCurrencyToCurrencyColor(upgrade.getPrice())}
				<Cell color={rawCurrencyToCurrencyColor(upgrade.getPrice(), true)} /></span
			>
			<span class="badge-accent badge font-bold">{upgrade.amount}</span>
		</div>
		<Tooltip>
			<button
				disabled={upgrade.getPrice() > $rawCurrency}
				on:click={() => buyUpgrade(upgrade)}
				class="rounded-box btn flex h-20 w-20 flex-col gap-2"
			>
				<IconMouse2 size={34} />
			</button>

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
