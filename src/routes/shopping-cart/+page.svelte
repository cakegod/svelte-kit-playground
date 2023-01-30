<script lang="ts">
	import { fade } from 'svelte/transition';
	import { productsList } from './data';
	let products = productsList;
</script>

<div transition:fade class="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
	{#each products as product (product.name)}
		<a
			class="card bg-secondary text-secondary-content"
			href={`/shopping-cart/${product.name.replaceAll(' ', '-')}`}
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
