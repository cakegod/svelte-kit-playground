<script context="module" lang="ts">
	const modules = import.meta.glob('./**/+page.svelte');

	interface ProjectLink {
		route: string;
		name: string;
	}

	const projectLinks = Object.keys(modules).reduce((acc, curr) => {
		const clean = curr.replace('+page.svelte', '').slice(1).split('/')[1];
		const projectPath = '/' + clean;
		const projectName = clean
			.split('-')
			.map((name) => name.charAt(0).toUpperCase() + name.slice(1))
			.join(' ');
		return acc.some((item) => item.name === projectName) || projectName === ''
			? acc
			: [...acc, { route: projectPath, name: projectName }];
	}, [] as ProjectLink[]);
</script>

<script lang="ts">
	import { IconAlignJustified } from '@tabler/icons-svelte';
</script>

<nav class="navbar rounded-box max-w-screen-2xl bg-accent text-accent-content xl:mx-auto">
	<div class=" dropdown navbar-start">
		<button class="btn-ghost btn flex flex-wrap">
			<IconAlignJustified />
		</button>
		<ul class="dropdown-content menu rounded-box mt-3 w-52 bg-accent p-2 shadow">
			{#each projectLinks as link}
				<a class="p-4 transition-colors hover:bg-accent-focus" href={`${link.route}`}>
					{link.name}
				</a>
			{/each}
		</ul>
	</div>
	<a class=" navbar-center btn-ghost btn text-xl" href="/">Playground</a>
	<div class="navbar-end" />
</nav>
