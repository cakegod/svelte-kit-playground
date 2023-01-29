<script>
	import '../app.css';
</script>

<nav class="navbar bg-neutral max-w-screen-2xl text-neutral-content rounded-box my-4 mx-auto">
	<div class="navbar-start">
		<div class="dropdown">
			<button class="btn btn-ghost">Projects</button>
			<ul class="dropdown-content menu p-2 mt-3 shadow bg-base-200 rounded-box w-52">
				<a class="p-4 hover:bg-base-300 transition-colors" href="/memory-game">Memory Game</a>
				<a class="p-4 hover:bg-base-300 transition-colors" href="/shopping-cart">Shopping cart</a>
			</ul>
		</div>
	</div>
	<div class="navbar-center">
		<a class="btn btn-ghost text-xl" href="/">Playground</a>
	</div>
	<div class="navbar-end" />
</nav>

<main class="max-w-7xl h-full m-auto p-4 flex flex-col items-center justify-center">
	<slot />
</main>
