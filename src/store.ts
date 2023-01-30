import { writable } from 'svelte/store';
import type { Product } from './routes/shopping-cart/data';

export const cart = writable<Product[]>([]);
