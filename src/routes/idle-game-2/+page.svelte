<script lang="ts">
	import { IconMouse2 } from '@tabler/icons-svelte';
	import Cell from './Cell.svelte';
	import Cells from './Cells.svelte';
	import Tooltip from './Tooltip.svelte';
	import { COLORS_NAME, CURRENCY_COLORS } from './data';
	import { currency, Upgrade, upgrades } from './store';
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';

	let rawCurrency = 0;

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

		rawCurrency += $upgrades.reduce((acc, curr) => {
			return (acc += (curr.amount * curr.power * deltaTime) / curr.interval);
		}, 0);
	}
	$: currency.updateCurrency(Math.round(rawCurrency));

	function buyUpgrade(upgrade: Upgrade) {
		if (rawCurrency < upgrade.getPrice()) return;
		rawCurrency -= upgrade.getPrice();

		upgrades.update(
			$upgrades.map((u) => {
				if (u.name === upgrade.name) {
					upgrade.amount += 1;
					upgrade.amount % 3 === 0 && (upgrade.power += 1);

					return upgrade;
				}
				return u;
			})
		);
	}

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
	{#each CURRENCY_COLORS as { color, filled, empty }}
		<Cells filledColor={filled} emptyColor={empty} {color} />
	{/each}
</div>

<!-- {#key rawCurrency} -->
<button class="btn-error btn-lg btn m-4" on:click={() => (rawCurrency += 1)}>Click</button>
<!-- {/key} -->

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
				disabled={upgrade.getPrice() > rawCurrency}
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
						{`Cursors: ${upgrade.amount} -> ${upgrade.amount + 1}`}
					</p>
					<p class="font-bold text-primary-content/75">
						{`Click power: ${upgrade.power} -> ${
							upgrade.amount % 3 === 0 ? upgrade.power + 1 : upgrade.power
						}`}
					</p>
				</div>
			</div>
		</Tooltip>
	</div>
{/each}
