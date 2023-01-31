<script lang="ts">
	import { cart } from 'store';
</script>

<div class="flex w-full flex-col gap-4">
	{#each $cart as product}
		<div class="card card-side card-compact w-full gap-2 bg-secondary text-secondary-content">
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
						class="badge-primary badge flex h-full w-8 items-center justify-center text-lg"
					>
						-
					</span>
					{product.quantity}
					<span
						on:click={() => cart.incrementQuantity(product)}
						on:keydown={() => cart.incrementQuantity(product)}
						class="badge-primary badge flex h-full w-8 items-center justify-center text-lg"
					>
						+
					</span>
				</div>
			</div>
		</div>
	{/each}
</div>
