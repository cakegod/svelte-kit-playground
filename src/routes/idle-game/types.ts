export interface Upgrade {
	name: string;
	amount: number;
	cap: number;
	price: number;
	type: string;
	tooltip: string;
}

export interface GeneratorUpgrade extends Upgrade {
	generate: number;
	type: 'generator';
}

export interface ManaCapUpgrade extends Upgrade {
	capAmount: number;
	type: 'mana cap';
}

export interface Spell {
	name: string;
	manaCost: number;
	effect: () => void;
}

export interface Resource {
	current: number;
	baseCap: number;
	cap: number;
	basePerTick: number;
	perTick: number;
}
