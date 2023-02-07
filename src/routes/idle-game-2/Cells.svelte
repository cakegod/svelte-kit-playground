<script lang="ts">
	import Cell from './Cell.svelte';
	import { CURRENCY_COLORS } from './data';
	import { currency } from './store';
</script>

<div class="flex ">
	{#each CURRENCY_COLORS as { color, filled, empty }}
		<div class="flex flex-col-reverse ">
			{#each Array(10) as _, index}
				<Cell color={index < Number($currency[color]) ? filled : empty} />
			{/each}
		</div>
	{/each}
</div>
