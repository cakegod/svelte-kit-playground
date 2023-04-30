<script lang="ts">
	import '../app.css';
	import Breadcrumb from './Breadcrumb.svelte';
	import Navbar from './Navbar.svelte';
</script>

<div class="flex h-full max-w-7xl grow flex-col p-2">
	<Navbar />
	<main class="flex h-full flex-col items-center p-4">
		<Breadcrumb />
		<slot />
	</main>
</div>
