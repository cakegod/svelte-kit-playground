<script lang="ts">
	import { IconAlignJustified } from '@tabler/icons-svelte';

	const links = [
		{ route: 'memory-game', name: 'Memory Game' },
		{ route: 'shopping-cart', name: 'Shopping Cart' },
		{ route: 'weather-app', name: 'Weather App' }
	];
</script>

<nav class="navbar rounded-box max-w-screen-2xl bg-accent text-accent-content xl:mx-auto">
	<div class="navbar-start">
		<div class="dropdown">
			<button class="btn-ghost btn flex flex-wrap">
				<IconAlignJustified />
			</button>
			<ul class="dropdown-content menu rounded-box mt-3 w-52 bg-accent p-2 shadow">
				{#each links as link}
					<a class="p-4 transition-colors hover:bg-accent-focus" href={`/${link.route}`}>
						{link.name}
					</a>
				{/each}
			</ul>
		</div>
	</div>
	<div class="navbar-center">
		<a class="btn-ghost btn text-xl" href="/">Playground</a>
	</div>
	<div class="navbar-end" />
</nav>
