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
		<div class="card card-side card-compact w-full max-w-md gap-2 bg-base-300 text-base-content">
			<figure class="w-32">
				<img class="w-full" src={product.url} alt={product.name} />
			</figure>
			<div class="flex flex-1 flex-col justify-evenly text-base font-bold">
				<h2 class="text-base-content/75">{product.name}</h2>
				<p class="text-lg">{product.price}€</p>
				<div class="input-group flex items-center">
					<button
						on:click={() => cart.decrementQuantity(product)}
						on:keydown={() => cart.decrementQuantity(product)}
						class="btn-secondary btn-xs btn flex items-center justify-center"
					>
						-
					</button>
					<input
						type=""
						value={product.quantity}
						class="input-secondary input input-xs flex w-12"
					/>
					<button
						on:click={() => cart.incrementQuantity(product)}
						on:keydown={() => cart.incrementQuantity(product)}
						class="btn-secondary btn-xs btn flex items-center justify-center"
					>
						+
					</button>
				</div>
			</div>
		</div>
	{/each}
	<div class="stat rounded-box text-primary-content">
		<div>
			<div class="stat-title">Total</div>
			<div class="stat-value">{total}</div>
		</div>
		<div class="stat-actions">
			<button class="btn-primary btn">Checkout</button>
		</div>
	</div>
</div>
