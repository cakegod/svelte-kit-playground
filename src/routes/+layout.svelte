<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';

	// "/shopping-cart/butterscotch-cake"
	// [["shopping-cart", "Shopping Cart"], ["butterscotch-cake","Butterscotch Cake"]]

	function toBreadcrumb(url: string) {
		const paths = url

			.split('/')
			.map((item) => item.toLowerCase())
			.map((path, i, arr) => arr.slice(0, i).join('/') + (i === 0 ? '' : '/') + path);
		const names = url
			.slice(1)
			.split('/')
			.map((item) =>
				item
					.split('-')
					.map((name) => name.charAt(0).toUpperCase() + name.slice(1))
					.join(' ')
			);
		return paths.map((path, i) => [path, names[i - 1]]);
	}

	$: breadcrumbs = toBreadcrumb($page.url.pathname);
</script>

<div class="p-2">
	<!-- Navbar -->
	<nav class="navbar rounded-box max-w-screen-2xl bg-accent text-accent-content xl:mx-auto">
		<div class="navbar-start">
			<div class="dropdown">
				<button class="btn-ghost btn flex flex-wrap">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h7"
						/>
					</svg>
				</button>
				<ul class="dropdown-content menu rounded-box mt-3 w-52 bg-accent p-2 shadow">
					<a class="p-4 transition-colors hover:bg-accent-focus" href="/memory-game">
						Memory Game
					</a>
					<a class="p-4 transition-colors hover:bg-accent-focus" href="/shopping-cart">
						Shopping cart
					</a>
				</ul>
			</div>
		</div>
		<div class="navbar-center">
			<a class="btn-ghost btn text-xl" href="/">Playground</a>
		</div>
		<div class="navbar-end" />
	</nav>

	<main class="m-auto flex h-full max-w-7xl flex-col items-center justify-center p-4">
		<!-- Breadcrumb -->

		<div class="breadcrumbs self-start pb-4 text-sm">
			<ul>
				{#each breadcrumbs as breadcrumb, i}
					<li>
						<a
							class={` ${
								i === breadcrumbs.length - 1 ? 'font-bold text-base-content' : 'text-base-content'
							}`}
							href={`/${breadcrumb[0]}`}>{i === 0 ? 'Home' : breadcrumb[1]}</a
						>
					</li>
				{/each}
			</ul>
		</div>

		<slot />
	</main>
</div>
