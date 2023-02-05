<script lang="ts" context="module">
	interface Upgrade {
		name: string;
		amount: number;
		cap: number;
		price: number;
		type: string;
		tooltip: string;
	}

	interface GeneratorUpgrade extends Upgrade {
		generate: number;
		type: 'generator';
	}

	interface ManaCapUpgrade extends Upgrade {
		capAmount: number;
		type: 'mana cap';
	}

	interface Spell {
		name: string;
		manaCost: number;
		effect: () => void;
	}
</script>

<script lang="ts">
	import { fly } from 'svelte/transition';

	const baseUpgrades: ReadonlyArray<Upgrade | GeneratorUpgrade | ManaCapUpgrade> = Object.freeze([
		Object.freeze({
			name: 'infuser',
			amount: 0,
			cap: 5,
			generate: 1,
			price: 5,
			type: 'generator',
			tooltip: 'generate 2 mana per second'
		}),
		Object.freeze({
			name: 'focus',
			amount: 0,
			cap: 5,
			capAmount: 10,
			price: 15,
			type: 'mana cap',
			tooltip: 'increase mana cap by 20'
		})
	]);
	let tickSpeed = 100;
	let baseOrbCap = 50;
	let orbCap = baseOrbCap;
	$: {
		const nextCap =
			baseOrbCap +
			upgrades
				.filter((upgrade): upgrade is ManaCapUpgrade => upgrade.type === 'mana cap')
				.reduce((acc, curr) => (curr ? (acc += curr.amount * curr.capAmount) : acc), 0);
		orbCap = nextCap;
	}
	let baseManaPerTick = 1;
	let manaPerTick = baseManaPerTick;
	$: {
		const nextManaPerTick =
			baseManaPerTick +
			upgrades
				.filter((upgrade): upgrade is GeneratorUpgrade => upgrade.type === 'generator')
				.reduce((acc, curr) => (curr ? (acc += curr.amount * curr.generate) : acc), 0) *
				(prestigeUpgrade.amount + 1);
		manaPerTick = nextManaPerTick;
	}

	let currentMana = 0;
	let upgrades: (GeneratorUpgrade | ManaCapUpgrade | Upgrade)[] = baseUpgrades.map((upgrade) => ({
		...upgrade
	}));

	let prestigeUpgrade = {
		price: 50,
		tooltip: 'reset game to gain bonuses',
		amount: 0
	};

	let knowledge = 0;
	let knowledgeCap = 10;
	let isKnowledgeUnlocked = false;

	function generateManaPerTick() {
		if (currentMana < orbCap) currentMana += manaPerTick;
	}

	function canBuy(price: number) {
		return price <= currentMana;
	}

	function buyUpgrade(upgrade: Upgrade) {
		if (!canBuy(upgrade.price)) return;
		if (upgrade.amount + 1 > upgrade.cap) return;
		currentMana -= upgrade.price;
		upgrade.amount += 1;
		upgrade.price *= 1.5;
		upgrades = upgrades;
	}

	function acquirePrestige(upgrade: typeof prestigeUpgrade) {
		if (!canBuy(upgrade.price)) return;
		currentMana -= prestigeUpgrade.price;
		prestigeUpgrade.amount += prestigeUpgrade.amount + 0.2;
		upgrades = baseUpgrades.map((upgrade) => ({ ...upgrade }));
		manaPerTick = 10;
	}

	function round(number: number) {
		return Math.round(number * 10) / 10;
	}

	function castSpell(spell: Spell) {
		if (!canBuy(spell.manaCost)) return;
		currentMana -= spell.manaCost;
		spell.effect();
	}

	const spells = {
		gainKnowledge: {
			name: 'Gain knowledge',
			manaCost: 50,
			effect: () => {
				knowledge += 1;
			}
		}
	};

	setInterval(generateManaPerTick, tickSpeed);
</script>

<h2 class="mb-4 text-lg">Current prestige power: {round(prestigeUpgrade.amount * 100)}%</h2>

<div class="flex gap-4">
	<!-- Mana -->
	<div class="stats stats-vertical">
		<div class="card h-fit w-60 items-center bg-base-100 p-10">
			<h2 class="stat-title">Mana</h2>
			<div
				class="stat-value flex"
				class:text-error={currentMana > orbCap || currentMana === orbCap}
				class:text-warning={currentMana > orbCap * 0.8 && currentMana < orbCap}
			>
				{#key currentMana}
					<p in:fly>{round(currentMana)}</p>
				{/key}
				<p>/{round(orbCap)}</p>
			</div>
			<p class="stat-title">+{round(manaPerTick)}/s</p>
		</div>
		<!-- Knowledge -->
		{#if isKnowledgeUnlocked}
			<div class="card h-fit w-60 items-center bg-base-100 p-10">
				<h2 class="stat-title">Knowledge</h2>
				<div class="stat-value flex">
					{#key knowledge}
						<p in:fly>{round(knowledge)}</p>
					{/key}
					<p>/{round(knowledgeCap)}</p>
				</div>
			</div>{/if}
	</div>

	<div class="flex flex-col gap-2">
		<h3 class="flex flex-col items-center font-bold text-base-content/70">Upgrades</h3>
		{#each upgrades as upgrade}
			<button
				disabled={upgrade.price > currentMana || upgrade.amount === upgrade.cap}
				on:click={() => buyUpgrade(upgrade)}
				class="tooltip tooltip-info btn flex h-24 w-28 flex-col justify-evenly"
				data-tip={upgrade.tooltip}
			>
				<p class="text-base">{upgrade.name}</p>
				<p class="text-xl text-warning">{round(upgrade.price)}</p>
				<p class="">{upgrade.amount}/{upgrade.cap}</p>
			</button>
		{/each}
		<button
			disabled={prestigeUpgrade.price > currentMana}
			on:click={() => acquirePrestige(prestigeUpgrade)}
			class="tooltip tooltip-info btn flex h-24 w-28 flex-col justify-evenly"
			data-tip={prestigeUpgrade.tooltip}
		>
			<p class="text-base">Prestige</p>
			<p class="text-xl text-error">{round(prestigeUpgrade.price)}</p>
		</button>
	</div>
	<div class="flex flex-col gap-2">
		<h3 class="flex flex-col items-center font-bold text-base-content/70">Spells</h3>
		<button
			disabled={spells.gainKnowledge.manaCost > currentMana}
			on:click={() => castSpell(spells.gainKnowledge)}
			on:click|once={() => (isKnowledgeUnlocked = true)}
			class="tooltip tooltip-info btn flex h-24 w-fit flex-col justify-evenly"
		>
			<p class="text-base">{spells.gainKnowledge.name}</p>
			<p class="text-xl text-warning">{round(spells.gainKnowledge.manaCost)}</p>
		</button>
	</div>
</div>
