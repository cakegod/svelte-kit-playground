<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-col gap-4">
	<figure>
		<img class="rounded-box" src={data.url} alt={data.name} />
	</figure>
	<div class="flex flex-col gap-4">
		<h2 class="text-4xl font-bold ">{data.name}</h2>
		<p class="text-3xl font-bold text-red-600">{data.price}€</p>
		<button class="btn btn-success">Add to cart</button>
		<div>
			<h3 class="text-lg font-bold">Product details</h3>
			<p class="text-base-content/75">{data.description}</p>
		</div>
	</div>
</div>
