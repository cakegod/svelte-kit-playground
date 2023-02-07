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
	constructor({
		name,
		price,
		power,
		priceMultiplier,
		interval
	}: {
		name: string;
		price: number;
		power: number;
		priceMultiplier: number;
		interval: number;
	}) {
		this.level = 0;
		this.name = name;
		this.amount = 0;
		this.price = price;
		this.power = power;
		this.priceMultiplier = priceMultiplier;
		this.interval = interval;
		this.ids = [];
	}

	getPrice() {
		return Math.round(this.price * this.priceMultiplier ** this.level);
	}

	// TODO: extract this to cursor upgrade ONLY
	buyUpgrade() {
		if (get(rawCurrency) < this.getPrice()) return;
		rawCurrency.decrease(this.getPrice());

		const id = setInterval(() => {
			rawCurrency.increase(this.power);
			experience.increaseCursor(this.power);
		}, this.interval);
		this.ids.push(id);

		upgrades.update(
			get(upgrades).map((u) => {
				if (u.name === this.name) {
					if (this.level > 0 && this.level % 4 === 0) {
						this.amount -= 3;
						this.ids.forEach((item, i) => i !== 3 && clearInterval(item));
						this.power += 100;
					} else {
						this.amount += 1;
					}
					this.level += 1;
					return this;
				}
				return u;
			})
		);
	}
}

const CURSOR: Upgrade = new Upgrade({
	name: 'cursor',
	price: 1,
	power: 1,
	priceMultiplier: 2,
	interval: 1000
});
const SEEDLING: Upgrade = new Upgrade({
	name: 'seedling',
	price: 10,
	power: 2,
	priceMultiplier: 2,
	interval: 5000
});

export const UPGRADES_LIST = [CURSOR, SEEDLING];
