import { writable } from 'svelte/store';
import { Upgrade, UPGRADES_LIST } from './classes';

function createCurrencyStore() {
	const { subscribe, update } = writable({
		red: '5',
		orange: '0',
		yellow: '0',
		green: '0',
		blue: '0',
		indigo: '0',
		violet: '0'
	});

	return {
		subscribe,
		updateCurrency: (value: number) =>
			update((currency) => {
				const stringCurrency = String(value).split('').reverse();
				const clone = { ...currency };
				(Object.keys(currency) as (keyof typeof currency)[]).forEach((currencyType, index) => {
					return (clone[currencyType] = stringCurrency[index] ? stringCurrency[index] : '0');
				});

				return clone;
			})
	};
}

function createUpgradesStore() {
	const { subscribe, update } = writable(UPGRADES_LIST);

	return {
		subscribe,
		update: (next: Upgrade[]) => update((u) => (u = next))
	};
}

function createRawCurrencyStore() {
	const { subscribe, update } = writable(0);

	return {
		subscribe,
		decrease: (amount: number) => update((c) => (c -= amount)),
		increase: (amount: number) => update((c) => (c += amount))
	};
}

export const rawCurrency = createRawCurrencyStore();
export const currency = createCurrencyStore();
export const upgrades = createUpgradesStore();
