<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { cardList, type Card } from './data';

	let isGameReady = false;
	let cards = cardList;
	let bestScore = 0;
	$: score = cards.filter((card) => card.clicked).length;

	$: if (score > bestScore) {
		bestScore = score;
	}

	$: shuffledCards = shuffleCards(cards);

	const handleClick = (card: Card): void => {
		if (card.clicked) {
			cards = cards.map((c) => ({ ...c, clicked: false }));
		} else {
			cards = cards.map((c) => (c.id === card.id ? { ...c, clicked: true } : c));
		}
	};


	const shuffleCards = (cards: Card[]): Card[] => {
		for (let i = 0; i < cards.length; i++) {
			let j = Math.floor(Math.random() * (i + 1));
			[cards[i], cards[j]] = [cards[j], cards[i]];
		}
		return cards;
	};
</script>

<svelte:head>
	<title>Memory Game</title>
</svelte:head>

{#if isGameReady}
	<!-- Scores -->
	<div class="stats bg-base-300 mb-4">
		<div class="stat w-40 justify-items-end">
			<p class="stat-title">Score</p>
			{#key score}
				<p in:fly={{ y: -15, duration: 500 }} class="stat-value">{score}</p>
			{/key}
		</div>
		<div class="stat w-40">
			<p class="stat-title">Best score</p>
			{#key bestScore}
				<p in:fly={{ y: -15, duration: 500 }} class="stat-value">{bestScore}</p>
			{/key}
		</div>
	</div>

	<!-- Cards -->
	<div class="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
		{#each shuffledCards as card (card.id)}
			<button
				class="btn-secondary btn-lg btn flex h-40 flex-col gap-2"
				transition:fade
				on:click={() => handleClick(card)}
			>
				<img
					src={card.img}
					class="h-14"
					alt={`${card.name}, a fictional fruit from Pokémon world`}
				/>
				<p>{card.name}</p>
			</button>
		{/each}
	</div>
{:else}
	<button class="btn-primary btn-wide btn-lg btn" on:click={() => (isGameReady = !isGameReady)}>
		Press to start!
	</button>
{/if}
