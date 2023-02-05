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
</script>

<script lang="ts">
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
	let tickSpeed = 1000;
	let baseOrbCap = 50;
	let orbCap = baseOrbCap;
	$: orbCap =
		baseOrbCap +
		upgrades
			.filter((upgrade): upgrade is ManaCapUpgrade => upgrade.type === 'mana cap')
			.reduce((acc, curr) => (curr ? (acc += curr.amount * curr.capAmount) : acc), 0);
	let baseManaPerTick = 1;
	let manaPerTick = baseManaPerTick;
	$: manaPerTick =
		baseManaPerTick +
		upgrades
			.filter((upgrade): upgrade is GeneratorUpgrade => upgrade.type === 'generator')
			.reduce((acc, curr) => (curr ? (acc += curr.amount * curr.generate) : acc), 0) *
			(prestigeUpgrade.amount * 2);

	let currentMana = 0;
	let upgrades: (GeneratorUpgrade | ManaCapUpgrade | Upgrade)[] = baseUpgrades.map((upgrade) => ({
		...upgrade
	}));

	let prestigeUpgrade = {
		price: 50,
		tooltip: 'reset game to gain bonuses',
		amount: 1
	};

	function generateManaPerTick() {
		// if (currentMana + manaPerTick > orbCap) return;
		if (currentMana < orbCap) currentMana += manaPerTick;
	}

	function canBuy(price: number) {
		return price <= currentMana;
	}

	// function buyGeneratorUpgrade(upgrade: GeneratorUpgrade) {}

	// function buyManaCapUpgrade(upgrade: ManaCapUpgrade) {
	// 	if (!canBuy(upgrade.price)) return;
	// 	if (upgrade.amount + 1 > upgrade.cap) return;
	// 	currentMana -= upgrade.price;
	// 	upgrade.amount += 1;
	// 	upgrade.price *= 2;
	// 	upgrades = upgrades;
	// }

	// function isGenerator(upgrade: Upgrade): upgrade is GeneratorUpgrade {
	// 	return (upgrade as GeneratorUpgrade).type === 'generator';
	// }
	// function isMagicCap(upgrade: Upgrade): upgrade is ManaCapUpgrade {
	// 	return (upgrade as ManaCapUpgrade).type === 'magic cap';
	// }

	function buyUpgrade(upgrade: Upgrade) {
		// if (isGenerator(upgrade)) return buyGeneratorUpgrade(upgrade);
		// if (isMagicCap(upgrade)) return buyManaCapUpgrade(upgrade);
		if (!canBuy(upgrade.price)) return;
		if (upgrade.amount + 1 > upgrade.cap) return;
		currentMana -= upgrade.price;
		upgrade.amount += 1;
		upgrade.price *= 2;
		upgrades = upgrades;
	}

	function acquirePrestige(upgrade: typeof prestigeUpgrade) {
		if (!canBuy(upgrade.price)) return;
		currentMana -= prestigeUpgrade.price;
		prestigeUpgrade.amount += 1;
		upgrades = baseUpgrades.map((upgrade) => ({ ...upgrade }));
		manaPerTick = 10;
	}

	setInterval(generateManaPerTick, tickSpeed);
</script>

<div class="flex gap-4">
	<div class="card h-fit w-48 items-center bg-base-100 p-10">
		<h2 class="stat-title">Mana</h2>
		<p class="stat-value">{currentMana}/{orbCap}</p>
		<p class="stat-title">+{manaPerTick}/s</p>
	</div>

	<div class="flex flex-col gap-2">
		{#each upgrades as upgrade}
			<button
				on:click={() => buyUpgrade(upgrade)}
				class=" tooltip tooltip-info btn flex h-20 w-28 flex-col justify-evenly"
				data-tip={upgrade.tooltip}
			>
				<p class="text-base">{upgrade.name}</p>
				<p class="text-lg text-red-600">{upgrade.price}</p>
				<p class="">{upgrade.amount}/{upgrade.cap}</p>
			</button>
		{/each}
		<button
			on:click={() => acquirePrestige(prestigeUpgrade)}
			class=" tooltip tooltip-info btn flex h-20 w-28 flex-col justify-evenly"
			data-tip="reset game to gain bonus"
		>
			<p class="text-base">Prestige</p>
			<p class="text-lg text-red-600">{prestigeUpgrade.price}</p>
		</button>
	</div>
</div>
