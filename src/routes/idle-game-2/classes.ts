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
	constructor(
		name: string,
		price: number,
		power: number,
		priceMultiplier: number,
		interval: number
	) {
		this.level = 0;
		this.name = name;
		this.amount = 0;
		this.price = price;
		this.power = power;
		this.priceMultiplier = priceMultiplier;
		this.interval = interval;
	}

	getPrice() {
		return Math.round(this.price * this.priceMultiplier ** this.level);
	}

	// TODO: extract this to cursor upgrade ONLY
	buyUpgrade() {
		if (get(rawCurrency) < this.getPrice()) return;
		rawCurrency.decrease(this.getPrice());

		// const timeoutList: NodeJS.Timeout[] = [];
		// const click = () => {
		// 	const timeout = setTimeout(() => {
		// 		rawCurrency.increase(this.power);
		// 		experience.increaseCursor(this.power);
		// 		timeoutList.push(timeout);
		// 		console.log(timeout);

		// 		click();
		// 	}, this.interval);
		// };

		// click();

		const id = setInterval(() => {
			rawCurrency.increase(this.power);
			experience.increaseCursor(this.power);
		}, this.interval);
		ids.push(id);

		upgrades.update(
			get(upgrades).map((u) => {
				if (u.name === this.name) {
					if (this.level > 0 && this.level % 4 === 0) {
						this.amount -= 3;

						// TODO: refactor interval removal
						// experimental fix
						ids.forEach((item, i) => {
							i !== 3 && clearInterval(item);
						});
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
const ids: NodeJS.Timer[] = [];
export const UPGRADES_LIST = [
	new Upgrade('cursor', 1, 1, 1.1, 2000),
	new Upgrade('something else', 50, 100, 2.25, 2000)
];
