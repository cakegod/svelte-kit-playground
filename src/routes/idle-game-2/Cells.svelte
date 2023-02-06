<script lang="ts">
	import Cell from './Cell.svelte';

	import { currency } from './store';

	export let filledColor: string, emptyColor: string, color: keyof typeof $currency;
</script>

<div class="grid grid-cols-10 border border-gray-900">
	{#each Array(10) as _, index}
		<Cell color={index < Number($currency[color]) ? filledColor : emptyColor} />
	{/each}
</div>
