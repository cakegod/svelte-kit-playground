<script>
	import '../app.css';
</script>

<div class="p-2">
	<nav class="navbar rounded-box max-w-screen-2xl bg-accent text-accent-content xl:mx-auto">
		<div class="navbar-start">
			<div class="dropdown">
				<button class="btn-ghost btn">Projects</button>
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
		<slot />
	</main>
</div>
