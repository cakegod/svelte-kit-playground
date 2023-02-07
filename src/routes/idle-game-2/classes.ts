import { get } from 'svelte/store';
import { experience, rawCurrency, upgrades } from './store';

export class Upgrade {
	level: number;
	name: string;
	amount: number;
	price: number;
	power: number;
	priceMultiplier: number;
	interval: number;
	ids: NodeJS.Timer[];
	tooltip: string;
	constructor({
		name,
		price,
		power,
		priceMultiplier,
		interval,
		tooltip
	}: {
		name: string;
		price: number;
		power: number;
		priceMultiplier: number;
		interval: number;
		tooltip: string;
	}) {
		this.level = 0;
		this.name = name;
		this.amount = 0;
		this.price = price;
		this.power = power;
		this.priceMultiplier = priceMultiplier;
		this.interval = interval;
		this.ids = [];
		this.tooltip = tooltip;
	}

	getPrice() {
		return Math.round(this.price * this.priceMultiplier ** this.level);
	}

	getNextLevelInfo() {
		const nextLevel = {
			amount: 0,
			power: 0,
			level: 0
		};
		if (this.level > 0 && this.level % 4 === 0) {
			nextLevel.amount = Math.round(this.amount * 0.5);
			nextLevel.power = Math.round(this.power * 2.5);
		} else {
			nextLevel.amount = this.amount + 1;
			nextLevel.power = this.power;
		}
		nextLevel.level = this.level + 1;
		return nextLevel;
	}

	buyUpgrade() {
		const upgradePrice = this.getPrice();

		if (get(rawCurrency) < upgradePrice) return;

		rawCurrency.decrease(upgradePrice);
		const id = setInterval(() => {
			rawCurrency.increase(this.power);
			// experience.increaseCursor(this.power);
		}, this.interval);
		this.ids.push(id);

		upgrades.update(
			get(upgrades).map((u) => {
				if (u.name === this.name) {
					const nextLevel = this.getNextLevelInfo();
					if (this.amount > nextLevel.amount) {
						this.ids = this.ids.reduce((acc, curr, i) => {
							if (i >= nextLevel.amount) {
								clearInterval(curr);
								return acc;
							}
							return [...acc, curr];
						}, [] as NodeJS.Timer[]);
					}
					this.amount = nextLevel.amount;
					this.power = nextLevel.power;
					this.level = nextLevel.level;

					return this;
				}
				return u;
			})
		);
	}
}

const CURSOR: Upgrade = new Upgrade({
	name: 'cursor',
	price: 5,
	power: 1,
	priceMultiplier: 1.5,
	interval: 1000,
	tooltip: 'Creates a cursor that automatically presses the button every second'
});
const SEEDLING: Upgrade = new Upgrade({
	name: 'seedling',
	price: 25,
	power: 20,
	priceMultiplier: 1.5,
	interval: 2000,
	tooltip: 'Plants a seedling that automatically presses the button every 2 seconds'
});
const PLANT: Upgrade = new Upgrade({
	name: 'plant',
	price: 200,
	power: 100,
	priceMultiplier: 1.5,
	interval: 5000,
	tooltip: 'Plants a plant that automatically presses the button every 5 seconds'
});
const TREE: Upgrade = new Upgrade({
	name: 'tree',
	price: 1000,
	power: 500,
	priceMultiplier: 1.5,
	interval: 10000,
	tooltip: 'Plants a tree that automatically presses the button every 10 seconds'
});
const FOREST: Upgrade = new Upgrade({
	name: 'forest',
	price: 5000,
	power: 2500,
	priceMultiplier: 1.5,
	interval: 25000,
	tooltip: 'Plants a forest that automatically presses the button every 25 seconds'
});

export const UPGRADES_LIST = [CURSOR, SEEDLING, PLANT, TREE, FOREST];
