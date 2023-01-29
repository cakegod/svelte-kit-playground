<script>
	import '../app.css'
</script>

<nav class="navbar bg-base-200">
	<div>
		<a class="btn btn-ghost text-xl" href="/">Playground</a>
	</div>
	<a class="btn btn-ghost" href="/memory-game">Memory Game</a>
</nav>

<main class="max-w-7xl h-full m-auto p-4 flex flex-col items-center justify-center">
	<slot></slot>
</main>