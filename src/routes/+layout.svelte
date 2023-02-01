<script lang="ts">
	import '../app.css';
	import Breadcrumb from './Breadcrumb.svelte';
	import Navbar from './Navbar.svelte';
</script>

<div class="p-2">
	<Navbar />
	<main class="m-auto flex h-full max-w-7xl flex-col items-center justify-center p-4">
		<Breadcrumb />
		<slot />
	</main>
</div>
