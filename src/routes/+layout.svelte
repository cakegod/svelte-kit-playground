<script>
	import '../app.css';
</script>

<nav class="navbar rounded-box my-4 mx-4 max-w-screen-2xl bg-primary text-primary-content xl:mx-auto">
	<div class="navbar-start">
		<div class="dropdown">
			<button class="btn-ghost btn">Projects</button>
			<ul class="dropdown-content menu rounded-box mt-3 w-52 bg-primary p-2 shadow">
				<a class="p-4 transition-colors hover:bg-primary-focus" href="/memory-game">Memory Game</a>
				<a class="p-4 transition-colors hover:bg-primary-focus" href="/shopping-cart"
					>Shopping cart</a
				>
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
