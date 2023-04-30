import { writable } from 'svelte/store';
import { Upgrade, UPGRADES_LIST } from './data/upgrades';

const baseCurrency = {
	red: '0',
	orange: '0',
	yellow: '0',
	green: '0',
	blue: '0',
	indigo: '0',
	violet: '0'
};

const INITIAL = {
	currency: {
		red: '0',
		orange: '0',
		yellow: '0',
		green: '0',
		blue: '0',
		indigo: '0',
		violet: '0'
	},
	experience: {
		cursor: 0
	},
	upgrades: UPGRADES_LIST,
	rawCurrency: 0
};

function createCurrencyStore() {
	const { set, subscribe, update } = writable(INITIAL.currency);

	return {
		subscribe,
		set,
		update,
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
	const { set, subscribe, update } = writable(INITIAL.upgrades);

	return {
		subscribe,
		set,
		update: (next: Upgrade[]) => update((u) => (u = next))
	};
}

function createRawCurrencyStore() {
	const { set, subscribe, update } = writable(INITIAL.rawCurrency);

	return {
		subscribe,
		set,
		decrease: (amount: number) => update((c) => (c -= amount)),
		increase: (amount: number) => update((c) => (c += amount))
	};
}

function createExperienceStore() {
	const { set, subscribe, update } = writable(INITIAL.experience);

	return {
		subscribe,
		set,
		decreaseCursors: (amount: number) => update((e) => ({ ...e, cursor: e.cursor - amount })),
		increaseCursor: (amount: number) => update((e) => ({ ...e, cursor: e.cursor + amount }))
	};
}

export const currency = createCurrencyStore();
export const upgrades = createUpgradesStore();
export const rawCurrency = createRawCurrencyStore();
export const experience = createExperienceStore();
