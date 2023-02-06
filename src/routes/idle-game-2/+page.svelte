<script lang="ts">
	import Cells from './Cells.svelte';
	import { currency } from './store';

	let currentCurrency = 0;

	const cellColors: {
		name: keyof typeof $currency;
		filled: `bg-${keyof typeof $currency}-500`;
		empty: `bg-${keyof typeof $currency}-900`;
	}[] = [
		{ name: 'red', filled: 'bg-red-500', empty: 'bg-red-900' },
		{ name: 'orange', filled: 'bg-orange-500', empty: 'bg-orange-900' },
		{ name: 'yellow', filled: 'bg-yellow-500', empty: 'bg-yellow-900' },
		{ name: 'green', filled: 'bg-green-500', empty: 'bg-green-900' },
		{ name: 'blue', filled: 'bg-blue-500', empty: 'bg-blue-900' },
		{ name: 'indigo', filled: 'bg-indigo-500', empty: 'bg-indigo-900' },
		{ name: 'violet', filled: 'bg-violet-500', empty: 'bg-violet-900' }
	];

	setInterval(() => (currentCurrency += 10), 1);

	$: currency.updateCurrency(currentCurrency);
</script>

<div class="flex gap-4">
	{#each cellColors as color}
		<Cells filledColor={color.filled} emptyColor={color.empty} color={color.name} />
	{/each}
</div>

<h2>{currentCurrency}</h2>
<button class="btn m-4" on:click={() => (currentCurrency += 1)}>Click</button>
