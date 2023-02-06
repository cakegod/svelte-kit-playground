<script lang="ts">
	import { currency } from './store';

	export let filledColor: string, emptyColor: string, color: keyof typeof $currency;
</script>

<div class="grid grid-cols-10 border border-gray-900">
	{#each Array(10) as _, index}
		<div
			class={`h-3 w-3 border border-gray-900 ${
				index < Number($currency[color]) ? filledColor : emptyColor
			}`}
		/>
	{/each}
</div>
