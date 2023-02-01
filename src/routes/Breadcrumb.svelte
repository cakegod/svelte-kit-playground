<script lang="ts">
	import { page } from '$app/stores';

	// "/shopping-cart/butterscotch-cake"
	// [["shopping-cart", "Shopping Cart"], ["butterscotch-cake","Butterscotch Cake"]]

	function toBreadcrumb(url: string) {
		return url.split('/').reduce((acc, curr, i, arr) => {
			const path = arr.slice(0, i + 1).join('/');
			const name = curr
				.split('-')
				.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
				.join(' ');
			return [...acc, [path, name]];
		}, [] as string[][]);
	}

	$: breadcrumbs = toBreadcrumb($page.url.pathname);
</script>

<div class="breadcrumbs self-start pb-4 text-sm">
	<ul>
		{#each breadcrumbs as breadcrumb, i}
			<li>
				<a
					class={`${
						i === breadcrumbs.length - 1 ? 'font-bold text-base-content' : 'text-base-content'
					}`}
					href={`${breadcrumb[0] ? breadcrumb[0] : '/'}`}>{i === 0 ? 'Home' : breadcrumb[1]}</a
				>
			</li>
		{/each}
	</ul>
</div>
