<script lang="ts">
	import type { Response } from './types';
	import { IconWhirl, IconWind, IconDropletFilled, IconAlertTriangle } from '@tabler/icons-svelte';

	let query: string;
	let promise = handleFetch('Marseille');
	let temperatureType: 'celsius' | 'fahreinheit' = 'celsius';
	$: temperatureType;

	const date = new Intl.DateTimeFormat('default', {
		hour: 'numeric',
		month: 'short',
		day: '2-digit'
	}).format(new Date());

	async function getWeatherData(query: string): Promise<Response> {
		const fetchData = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=897dcd4fdb105148b7436c12cb942fc3&units=metric`,
			{ mode: 'cors' }
		);
		return await fetchData.json();
	}

	async function handleFetch(query: string) {
		const data = await getWeatherData(query);
		return {
			name: data.name,
			country: data.sys.country,
			temp: {
				celsius: Math.round(data.main.feels_like * 10) / 10,
				fahreinheit: Math.round(convertToF(data.main.feels_like) * 10) / 10
			},
			description: data.weather[0].main,
			wind: data.wind.speed,
			humidity: data.main.humidity,
			icon: data.weather[0].icon
		};
	}

	function convertToF(celsius: number) {
		return (celsius * 9) / 5 + 32;
	}
</script>

<svelte:head>
	<title>Weather App</title>
</svelte:head>

<div class="flex w-full flex-col items-center gap-4">
	<form on:submit={() => (promise = handleFetch(query))}>
		<input
			bind:value={query}
			type="text"
			placeholder="Search City"
			class="input-accent input rounded-box"
		/>
	</form>
	<p class="text-lg">{`Today, ${date}`}</p>

	{#await promise}
		<IconWhirl size={50} class="animate-spin" />
	{:then { icon, name, country, temp, description, wind, humidity }}
		<div class="stats stats-vertical w-full max-w-sm bg-info/10 text-info-content shadow">
			<div class="stat border-none">
				<img
					class="stat-figure"
					src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
					alt="weather"
				/>
				<p class="stat-title w-20">{`${name}, ${country}`}</p>
				<div class="stat-value flex gap-2">
					<p>{temperatureType === 'fahreinheit' ? temp.fahreinheit : temp.celsius}</p>
					<div class="flex items-start text-xl">
						<button
							on:click={() => (temperatureType = 'celsius')}
							class:light-text={temperatureType !== 'celsius'}
						>
							°C
						</button>
						<span class="font-normal">|</span>
						<button
							on:click={() => (temperatureType = 'fahreinheit')}
							class:light-text={temperatureType !== 'fahreinheit'}
						>
							°F
						</button>
					</div>
				</div>
				<p class="stat-title">{description}</p>
			</div>
			<div class="stat border-none">
				<div class="stat-title flex gap-1">
					<IconWind />
					<p>Wind Speed</p>
				</div>
				<div class="stat-value flex items-center gap-2">
					<p>{`${wind.toFixed(1)} km/h`}</p>
				</div>
			</div>
			<div class="stat border-none">
				<div class="stat-title flex gap-1">
					<IconDropletFilled />
					<p>Humidity</p>
				</div>
				<p class="stat-value">{humidity}</p>
			</div>
		</div>
	{:catch}
		<div class="rounded-box flex gap-2 bg-error p-2 font-bold text-error-content">
			<IconAlertTriangle />
			<span>Oops, something went wrong! Please check the city name and try again.</span>
		</div>
	{/await}
</div>

<style lang="postcss">
	.light-text {
		@apply text-info-content/40;
	}
</style>
