import { error } from '@sveltejs/kit';
import { productsList } from '../data';
import type { PageLoad } from './$types';

export const load = (({ params }) => {
	const product = productsList.find(
		(product) =>
			product.name ===
			params.slug
				.split('-')
				.map((name) => name.charAt(0).toUpperCase() + name.slice(1))
				.join(' ')
	);

	if (product) {
		return { ...product, slug: params.slug };
	}
	throw error(404, 'Not found');
}) satisfies PageLoad;
