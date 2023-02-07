<script lang="ts">
	import { CURRENCY_COLORS } from '../data/colors';
	import { currency } from '../stores';
	import Cell from './Cell.svelte';
</script>

<div class="flex flex-col-reverse">
	{#each CURRENCY_COLORS as { color, filled, empty }}
		<div class="flex">
			{#each Array(10) as _, index}
				<Cell color={index < Number($currency[color]) ? filled : empty} />
			{/each}
		</div>
	{/each}
</div>
