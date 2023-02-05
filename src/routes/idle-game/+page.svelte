<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { GeneratorUpgrade, ManaCapUpgrade, Resource, Spell, Upgrade } from './types';

	const BASE_UPGRADES: ReadonlyArray<Upgrade | GeneratorUpgrade | ManaCapUpgrade> = Object.freeze([
		Object.freeze({
			name: 'infuser',
			amount: 0,
			cap: 5,
			generate: 1,
			price: 5,
			type: 'generator',
			tooltip: 'increases mana regeneration by 1'
		}),
		Object.freeze({
			name: 'focus',
			amount: 0,
			cap: 5,
			capAmount: 10,
			price: 15,
			type: 'mana cap',
			tooltip: 'increases mana cap by 10'
		}),
		Object.freeze({
			name: 'Supreme focus',
			amount: 0,
			cap: 5,
			capAmount: 10,
			price: 1500,
			type: 'mana cap',
			tooltip: 'increases mana cap by 200'
		})
	]);
	const TICK_SPEED = 100;

	const resources: Record<string, Resource> = {
		mana: {
			current: 0,
			baseCap: 50,
			cap: 50,
			basePerTick: 1,
			perTick: 1
		},
		knowledge: {
			current: 0,
			baseCap: 10,
			cap: 10,
			basePerTick: 0,
			perTick: 0
		}
	};

	$: {
		const nextCap =
			resources.mana.baseCap +
			upgrades
				.filter((upgrade): upgrade is ManaCapUpgrade => upgrade.type === 'mana cap')
				.reduce((acc, curr) => (curr ? (acc += curr.amount * curr.capAmount) : acc), 0);
		resources.mana.cap = nextCap;
	}
	$: {
		const nextManaPerTick =
			resources.mana.basePerTick +
			upgrades
				.filter((upgrade): upgrade is GeneratorUpgrade => upgrade.type === 'generator')
				.reduce((acc, curr) => (curr ? (acc += curr.amount * curr.generate) : acc), 0) *
				(prestigeUpgrade.amount + 1);
		resources.mana.perTick = nextManaPerTick;
	}

	let upgrades: (GeneratorUpgrade | ManaCapUpgrade | Upgrade)[] = BASE_UPGRADES.map((upgrade) => ({
		...upgrade
	}));

	let prestigeUpgrade = {
		price: 50,
		tooltip: 'reset game to gain bonuses',
		amount: 0
	};

	let isKnowledgeUnlocked = false;

	function generateManaPerTick() {
		if (resources.mana.current < resources.mana.cap)
			resources.mana.current += resources.mana.perTick;
	}

	function canBuy(price: number) {
		return price <= resources.mana.current;
	}

	function buyUpgrade(upgrade: Upgrade) {
		const UPGRADE_MULTIPLIER = 1.5;
		if (!canBuy(upgrade.price)) return;
		if (upgrade.amount + 1 > upgrade.cap) return;
		resources.mana.current -= upgrade.price;
		upgrade.amount += 1;
		upgrade.price *= UPGRADE_MULTIPLIER;
		upgrades = upgrades;
	}

	function acquirePrestige(upgrade: typeof prestigeUpgrade) {
		if (!canBuy(upgrade.price)) return;
		resources.mana.current -= prestigeUpgrade.price;
		prestigeUpgrade.amount += prestigeUpgrade.amount + 0.2;
		upgrades = BASE_UPGRADES.map((upgrade) => ({ ...upgrade }));
		resources.mana.perTick = 10;
		resources.knowledge.current = 0;
	}

	function round(number: number) {
		return Math.round(number * 10) / 10;
	}

	function castSpell(spell: Spell) {
		if (!canBuy(spell.manaCost)) return;
		resources.mana.current -= spell.manaCost;
		spell.effect();
	}

	const spells: Record<string, Spell> = {
		gainKnowledge: {
			name: 'Gain knowledge',
			manaCost: 100,
			effect: () => {
				resources.knowledge.current += 1;
			}
		}
	};

	setInterval(generateManaPerTick, TICK_SPEED);
</script>

<h2 class="mb-4 text-lg">Current prestige power: {round(prestigeUpgrade.amount * 100)}%</h2>

<div class="flex gap-4">
	<!-- Mana -->
	<div class="stats stats-vertical">
		<div class="card h-fit w-60 items-center bg-base-100 p-10">
			<h2 class="stat-title">Mana</h2>
			<div
				class="stat-value flex"
				class:text-error={resources.mana.current > resources.mana.cap ||
					resources.mana.current === resources.mana.cap}
				class:text-warning={resources.mana.current > resources.mana.cap * 0.8 &&
					resources.mana.current < resources.mana.cap}
			>
				{#key resources.mana.current}
					<p in:fly>{round(resources.mana.current)}</p>
				{/key}
				<p>/{round(resources.mana.cap)}</p>
			</div>
			<p class="stat-title">+{round(resources.mana.perTick)}/s</p>
		</div>
		<!-- Knowledge -->
		{#if isKnowledgeUnlocked}
			<div class="card h-fit w-60 items-center bg-base-100 p-10">
				<h2 class="stat-title">Knowledge</h2>
				<div class="stat-value flex">
					{#key resources.knowledge.current}
						<p in:fly>{round(resources.knowledge.current)}</p>
					{/key}
					<p>/{round(resources.knowledge.cap)}</p>
				</div>
			</div>{/if}
	</div>

	<div class="flex flex-col gap-2">
		<h3 class="flex flex-col items-center font-bold text-base-content/70">Upgrades</h3>
		{#each upgrades as upgrade}
			<button
				disabled={upgrade.price > resources.mana.current || upgrade.amount === upgrade.cap}
				on:click={() => buyUpgrade(upgrade)}
				class="w-content tooltip tooltip-info btn flex h-24 flex-col justify-evenly"
				data-tip={upgrade.tooltip}
			>
				<p class="text-base">{upgrade.name}</p>
				<p class="text-xl text-warning">{round(upgrade.price)}</p>
				<p class="">{upgrade.amount}/{upgrade.cap}</p>
			</button>
		{/each}
		<button
			disabled={prestigeUpgrade.price > resources.mana.current}
			on:click={() => acquirePrestige(prestigeUpgrade)}
			class="w-content tooltip tooltip-info btn flex h-24 flex-col justify-evenly"
			data-tip={prestigeUpgrade.tooltip}
		>
			<p class="text-base">Prestige</p>
			<p class="text-xl text-error">{round(prestigeUpgrade.price)}</p>
		</button>
	</div>
	<div class="flex flex-col gap-2">
		<h3 class="flex flex-col items-center font-bold text-base-content/70">Spells</h3>
		<button
			disabled={spells.gainKnowledge.manaCost > resources.mana.current}
			on:click={() => castSpell(spells.gainKnowledge)}
			on:click|once={() => (isKnowledgeUnlocked = true)}
			class="w-content tooltip tooltip-info btn flex h-24 flex-col justify-evenly"
		>
			<p class="text-base">{spells.gainKnowledge.name}</p>
			<p class="text-xl text-warning">{round(spells.gainKnowledge.manaCost)}</p>
		</button>
	</div>
</div>
