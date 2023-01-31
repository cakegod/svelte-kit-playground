import { writable } from 'svelte/store';
import type { Product } from './routes/shopping-cart/data';

// export const cart = writable<Product[]>([]);

export const cart = createCartStore();

function createCartStore() {
	const { subscribe, update } = writable<Product[]>([]);
	return {
		subscribe,
		addProduct: (newProduct: Product) =>
			update((c) => {
				const isProductPresent = c.some((product) => product.name === newProduct.name);

				if (isProductPresent) {
					return c.map((product) =>
						product.name === newProduct.name
							? { ...product, quantity: product.quantity + 1 }
							: product
					);
				}
				return [...c, newProduct];
			}),
		incrementQuantity: (product: Product) =>
			update((c) =>
				c.map((p) => (p.name === product.name ? { ...p, quantity: p.quantity + 1 } : p))
			),
		decrementQuantity: (product: Product) =>
			update((c) =>
				product.quantity === 1
					? c.filter((p) => p.name !== product.name)
					: c.map((p) => (p.name === product.name ? { ...p, quantity: p.quantity - 1 } : p))
			)
	};
}
