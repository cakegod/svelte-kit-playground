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

		if (acc.some((item) => item.name === projectName)) {
			return acc;
		}
		return projectName === '' ? acc : [...acc, { route: projectPath, name: projectName }];
	}, [] as ProjectLink[]);
</script>

<script lang="ts">
	import { IconAlignJustified } from '@tabler/icons-svelte';
	import { page } from '$app/stores';

	$: console.log($page);
</script>

<nav class="navbar rounded-box bg-accent text-accent-content max-w-screen-2xl xl:mx-auto">
	<div class=" navbar-start dropdown">
		<button class="btn-ghost btn flex flex-wrap">
			<IconAlignJustified />
		</button>
		<ul class="dropdown-content menu rounded-box bg-accent mt-3 w-52 p-2 shadow">
			{#each projectLinks as link}
				<a
					class="hover:bg-accent-focus p-4 transition-colors"
					href={`${link.route}`}
					aria-current={link.route === $page.url.pathname}
				>
					{link.name}
				</a>
			{/each}
		</ul>
	</div>
	<a class=" navbar-center btn-ghost btn text-xl" href="/">Playground</a>
	<div class="navbar-end" />
</nav>
