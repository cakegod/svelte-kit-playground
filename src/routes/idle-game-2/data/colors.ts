interface Color {
	color: string;
	filled: string;
	empty: string;
}

export const RED = { color: 'red', filled: 'bg-red-500', empty: 'bg-red-900' } as const;
export const ORANGE = { color: 'orange', filled: 'bg-orange-500', empty: 'bg-orange-900' } as const;
export const YELLOW = { color: 'yellow', filled: 'bg-yellow-500', empty: 'bg-yellow-900' } as const;
export const GREEN = { color: 'green', filled: 'bg-green-500', empty: 'bg-green-900' } as const;
export const BLUE = { color: 'blue', filled: 'bg-blue-500', empty: 'bg-blue-900' } as const;
export const INDIGO = { color: 'indigo', filled: 'bg-indigo-500', empty: 'bg-indigo-900' } as const;
export const VIOLET = { color: 'violet', filled: 'bg-violet-500', empty: 'bg-violet-900' } as const;

export const CURRENCY_COLORS = [RED, ORANGE, YELLOW, GREEN, BLUE, INDIGO, VIOLET] satisfies Color[];
export const COLORS_NAME = CURRENCY_COLORS.map((currency) => currency.color);
