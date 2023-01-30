import { error } from '@sveltejs/kit';
import { productsList } from '../data';
import type { PageLoad } from './$types';

export const load = (({ params }) => {
	const product = productsList.find((product) => product.name === params.slug.replaceAll('-', ' '));

	if (product) {
		return product;
	}
	throw error(404, 'Not found');
}) satisfies PageLoad;
