<script lang="ts" context="module">
	import type { Response } from './types';

	async function getWeatherData(query: string): Promise<Response> {
		const fetchData = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=897dcd4fdb105148b7436c12cb942fc3&units=metric`
		);
		return await fetchData.json();
	}

	async function fetchWeather(query: string): Promise<FetchWeatherReturn> {
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

	const convertToF = (celsius: number) => (celsius * 9) / 5 + 32;

	export interface FetchWeatherReturn {
		name: string;
		country: string;
		temp: {
			celsius: number;
			fahreinheit: number;
		};
		description: string;
		wind: number;
		humidity: number;
		icon: string;
	}
</script>

<script lang="ts">
	import { IconWhirl, IconAlertTriangle, IconSearch } from '@tabler/icons-svelte';
	import CurrentWeather from './CurrentWeather.svelte';

	let query: string;
	let promise = fetchWeather('Marseille');

	const date = new Intl.DateTimeFormat('default', {
		hour: 'numeric',
		month: 'short',
		day: '2-digit'
	}).format(new Date());
</script>

<svelte:head>
	<title>Weather App</title>
</svelte:head>

<div class="flex h-full w-full flex-col items-center gap-4">
	<form on:submit={() => (promise = fetchWeather(query))}>
		<div class=" input-group">
			<input bind:value={query} type="text" placeholder="Search City" class="input-accent input " />
			<button class="btn-accent btn"><IconSearch /></button>
		</div>
	</form>
	{#await promise}
		<IconWhirl size={100} class="animate-spin" />
		<p>Loading...</p>
	{:then weatherData}
		<p class="text-lg font-medium text-success-content/60">{`Today, ${date}`}</p>
		<CurrentWeather {weatherData} />
	{:catch}
		<div class="rounded-box flex items-center gap-2 bg-error p-6 font-bold text-error-content">
			<IconAlertTriangle size={35} />
			<span>Oops, something went wrong! <br /> Please check the city name and try again.</span>
		</div>
	{/await}
</div>
