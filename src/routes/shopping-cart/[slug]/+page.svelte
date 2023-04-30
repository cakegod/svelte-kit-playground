<script lang="ts">
	import { cart } from 'store';

	export let data;
</script>

<svelte:head>
	<title>{data.name}</title>
</svelte:head>

<!-- Product -->
<div class="flex max-w-5xl flex-col items-center gap-4 md:flex-row md:items-start lg:self-start">
	<figure>
		<img class="rounded-box" src={data.url} alt={data.name} />
	</figure>
	<div class="flex flex-col gap-4 md:gap-6">
		<h2 class="text-4xl font-bold">{data.name}</h2>
		<p class="text-4xl font-bold text-red-700">{data.price}€</p>
		<button
			on:click={() => cart.addProduct(data)}
			class="btn-success btn w-full max-w-xs self-center md:self-auto"
		>
			Add to cart
		</button>
		<div>
			<h3 class="text-lg font-bold">Product details</h3>
			<p class="text-base-content/75">{data.description}</p>
		</div>
	</div>
</div>
