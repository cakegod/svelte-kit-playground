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
}

const CURSOR = new Upgrade('cursor', 5, 1, 2.25, 2000);
export const UPGRADES_LIST = [CURSOR];
