<script lang="ts">
	import Cell from './Cell.svelte';
	import { CURRENCY_COLORS } from './data';
	import { currency } from './store';
</script>

<div class="flex flex-col-reverse">
	{#each CURRENCY_COLORS as { color, filled, empty }}
		<div class="flex">
			{#each Array(10) as _, index}
				<Cell color={index < Number($currency[color]) ? filled : empty} size="w-7 h-7" />
			{/each}
		</div>
	{/each}
</div>
