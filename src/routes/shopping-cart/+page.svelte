<script lang="ts">
	import { fade } from 'svelte/transition';
	import { cart } from '../../store';
	import { productsList } from './data';
	let products = productsList;
	let productsQuantity = 0;

	cart.subscribe((c) => {
		productsQuantity = c.reduce((acc, curr) => (acc = acc + curr.quantity), 0);
	});
</script>

<svelte:head>
	<title>Shopping Cart</title>
</svelte:head>

<button class="btn mb-4 gap-2">
	Cart
	<span class="badge-success badge">
		+{productsQuantity}
	</span>
</button>

<div transition:fade class="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
	{#each products as product (product.name)}
		<a
			class="card bg-secondary text-secondary-content"
			href={`/shopping-cart/${product.name
				.split(' ')
				.map((name) => name.toLowerCase())
				.join('-')}`}
		>
			<figure>
				<img class="h-full" src={product.url} alt={product.name} />
			</figure>
			<div class="flex flex-col gap-2 p-5">
				<h2 class="text-base font-semibold uppercase opacity-80">{product.name}</h2>
				<p class="text-3xl font-bold">{product.price}€</p>
			</div>
		</a>
	{/each}
</div>
