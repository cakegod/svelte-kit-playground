<script lang="ts">
	import { cardList, type Card } from './data';

	let cards = cardList;
	let bestScore = 0;
	$: score = cards.reduce((acc, curr) => (curr.clicked ? acc + 1 : acc), 0);
	$: if (score > bestScore) {
		bestScore = score;
	}
	function handleClick(card: Card) {
		if (card.clicked) {
			cards = cards.map((card) => ({ ...card, clicked: false }));
		} else {
			card.clicked = true;
			cards = shuffleCards(cards);
		}
	}

	function shuffleCards(cards: Card[]) {
		for (let i = 0; i < cards.length; i++) {
			let j = Math.floor(Math.random() * (i + 1));
			[cards[i], cards[j]] = [cards[j], cards[i]];
		}
		return cards;
	}
</script>

<div class="stats flex">
	<div class="stat justify-items-end">
		<p class="stat-title">Score</p>
		<p class="stat-value">{score}</p>
	</div>
	<div class="stat">
		<p class="stat-title">Best score</p>
		<p class="stat-value">{bestScore}</p>
	</div>
</div>

<main class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
	{#each cards as card (card.id)}
		<button class="btn btn-lg h-40 flex flex-col gap-2" on:click={() => handleClick(card)}>
			<img src={card.img} class="h-14" alt="a fictional fruit from Pokémon world" />
			<p>{card.name}</p>
		</button>
	{/each}
</main>
