<script lang="ts">
	import { cart } from 'store';
	import type { PageData } from './$types';

	export let data: PageData;

	function addProduct() {
		cart.update((c) => {
			const isProductPresent = c.some((product) => product.name === data.name);

			if (isProductPresent) {
				return c.map((product) =>
					product.name === data.name ? { ...product, quantity: product.quantity + 1 } : product
				);
			}
			return [...c, data];
		});
	}
</script>

<svelte:head>
	<title>{data.name}</title>
</svelte:head>

<!-- Product -->
<div class="flex max-w-5xl flex-col items-center gap-4 lg:self-start md:flex-row md:items-start">
	<figure>
		<img class="rounded-box" src={data.url} alt={data.name} />
	</figure>
	<div class="flex flex-col gap-4 md:gap-6">
		<h2 class="text-4xl font-bold ">{data.name}</h2>
		<p class="text-4xl font-bold text-red-700">{data.price}€</p>
		<button on:click={addProduct} class="btn-success btn w-full max-w-xs self-center md:self-auto">
			Add to cart
		</button>
		<div>
			<h3 class="text-lg font-bold">Product details</h3>
			<p class="text-base-content/75">{data.description}</p>
		</div>
	</div>
</div>
