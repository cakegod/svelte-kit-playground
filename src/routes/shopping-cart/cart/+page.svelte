<script lang="ts">
	import { cart } from 'store';
	$: total = new Intl.NumberFormat('fr', { style: 'currency', currency: 'EUR' }).format(
		$cart.reduce((acc, curr) => (acc = curr.quantity * curr.price), 0)
	);
</script>

<svelte:head>
	<title>Cart</title>
</svelte:head>

<div class="flex w-full flex-col gap-4">
	{#each $cart as product}
		<div
			class="card card-side card-compact w-full max-w-md gap-2 bg-secondary text-secondary-content"
		>
			<figure class="w-32">
				<img class="w-full" src={product.url} alt={product.name} />
			</figure>
			<div class="flex flex-1 flex-col justify-evenly text-base font-bold  ">
				<h2 class="text-secondary-content/75">{product.name}</h2>
				<p class="text-lg">{product.price}€</p>
				<div class="flex items-center gap-2">
					<span
						on:click={() => cart.decrementQuantity(product)}
						on:keydown={() => cart.decrementQuantity(product)}
						class="btn-sm btn flex items-center justify-center "
					>
						-
					</span>
					{product.quantity}
					<span
						on:click={() => cart.incrementQuantity(product)}
						on:keydown={() => cart.incrementQuantity(product)}
						class="btn-sm btn flex items-center justify-center "
					>
						+
					</span>
				</div>
			</div>
		</div>
	{/each}
	<p>Total: {total}</p>
</div>
