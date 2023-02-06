import { writable } from 'svelte/store';

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

export class Upgrade {
	name: string;
	amount: number;
	price: number;
	power: number;
	priceMultiplier: number;
	interval: number;
	constructor(
		name: string,
		price: number,
		power: number,
		priceMultiplier: number,
		interval: number
	) {
		this.name = name;
		this.amount = 0;
		this.price = price;
		this.power = power;
		this.priceMultiplier = priceMultiplier;
		this.interval = interval;
	}

	getPrice() {
		return Math.round(this.price * this.priceMultiplier ** this.amount);
	}
}

function createUpgradesStore() {
	const { subscribe, update } = writable([new Upgrade('cursor', 1, 1, 1.5, 2000)]);

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
