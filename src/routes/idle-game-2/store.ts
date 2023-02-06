import { writable } from 'svelte/store';

// export const currency = writable({
// 	red: '5',
// 	orange: '0',
// 	yellow: '0',
// 	green: '0',
// 	blue: '0',
// 	indigo: '0',
// 	violet: '0'
// });

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

export const currency = createCurrencyStore();