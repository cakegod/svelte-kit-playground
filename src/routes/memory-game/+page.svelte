<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { cardList, type Card } from './data';

	let isGameReady = false;
	let cards = cardList;
	let bestScore = 0;
	$: score = cards.reduce((acc, curr) => (curr.clicked ? acc + 1 : acc), 0);
	$: if (score > bestScore) {
		bestScore = score;
	}
	function handleClick(card: Card) {
		if (card.clicked) {
			cards = shuffleCards(cards.map((card) => ({ ...card, clicked: false })));
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

{#if isGameReady}
	<div class="stats flex pb-4">
		<div class="stat justify-items-end">
			<p class="stat-title">Score</p>
			{#key score}
				<p in:fly={{ y: -15, duration: 500 }} class="stat-value">{score}</p>
			{/key}
		</div>
		<div class="stat">
			<p class="stat-title">Best score</p>
			{#key bestScore}
				<p in:fly={{ y: -15, duration: 500 }} class="stat-value">{bestScore}</p>
			{/key}
		</div>
	</div>

	<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
		{#each cards as card (card.id)}
			<button
				class="btn btn-lg h-40 flex flex-col gap-2"
				transition:fade
				on:click={() => handleClick(card)}
			>
				<img src={card.img} class="h-14" alt="a fictional fruit from Pokémon world" />
				<p>{card.name}</p>
			</button>
		{/each}
	</div>
{:else}
	<button class="btn btn-lg btn-wide btn-primary" on:click={() => (isGameReady = !isGameReady)}>
		Press to start!
	</button>
{/if}
