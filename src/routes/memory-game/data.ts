export type Card = (typeof cardList)[number];

export const cardList = [
	{
		name: 'Rawst',
		id: crypto.randomUUID(),
		clicked: false,
		img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rawst-berry.png'
	},
	{
		name: 'Mago',
		id: crypto.randomUUID(),
		clicked: false,
		img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/mago-berry.png'
	},
	{
		name: 'Sitrus',
		id: crypto.randomUUID(),
		clicked: false,
		img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/sitrus-berry.png'
	},
	{
		name: 'Cheri',
		id: crypto.randomUUID(),
		clicked: false,
		img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/cheri-berry.png'
	},
	{
		name: 'Aspear',
		id: crypto.randomUUID(),
		clicked: false,
		img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/aspear-berry.png'
	},
	{
		name: 'Persim',
		id: crypto.randomUUID(),
		clicked: false,
		img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/persim-berry.png'
	},
	{
		name: 'Lum',
		id: crypto.randomUUID(),
		clicked: false,
		img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/lum-berry.png'
	},
	{
		name: 'Iapapa',
		id: crypto.randomUUID(),
		clicked: false,
		img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/iapapa-berry.png'
	}
];
