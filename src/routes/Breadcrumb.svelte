<script lang="ts">
	import { page } from '$app/stores';

	// "/shopping-cart/butterscotch-cake"
	// [["shopping-cart", "Shopping Cart"], ["butterscotch-cake","Butterscotch Cake"]]

	type Breadcrumb = {
		path: string;
		name: string;
	};

	const toBreadcrumb = (url: string): Breadcrumb[] | [] =>
		url === '/'
			? []
			: url.split('/').reduce((acc, curr, i, arr) => {
					const path = arr.slice(0, i + 1).join('/');
					const name = curr
						.split('-')
						.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
						.join(' ');
					return [...acc, path && name ? { path, name } : { path: '/', name: 'Home' }];
			  }, [] as Breadcrumb[]);

	$: breadcrumbs = toBreadcrumb($page.url.pathname);
	$: isLastItem = (index: number) => index === breadcrumbs.length - 1;
</script>

<div class="breadcrumbs flex self-start py-4 text-sm">
	<ul>
		{#each breadcrumbs as breadcrumb, index}
			<li>
				<a class:font-bold={isLastItem(index)} href={breadcrumb.path}>
					{breadcrumb.name}
				</a>
			</li>
		{/each}
	</ul>
</div>
