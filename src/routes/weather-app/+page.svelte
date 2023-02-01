<script lang="ts">
	import type { Response } from './types';
	import { IconWhirl, IconWind, IconDropletFilled, IconAlertTriangle } from '@tabler/icons-svelte';

	let query: string;
	let isFahrenheit = false;
	let promise = handleFetch('Marseille');
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
			temp: Math.round(data.main.feels_like * 10) / 10,
			description: data.weather[0].main,
			wind: data.wind.speed,
			humidity: data.main.humidity,
			icon: data.weather[0].icon
		};
	}

	function convertToF(celsius: number) {
		return Math.round((celsius * 9) / 5 + 32 * 10) / 10;
	}
</script>

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
	{:then result}
		<div class="stats stats-vertical w-full max-w-sm bg-info/10 text-info-content shadow">
			<div class="stat border-none">
				<img
					class="stat-figure"
					src={`http://openweathermap.org/img/wn/${result.icon}@2x.png`}
					alt="weather"
				/>
				<p class="stat-title w-20">{`${result.name}, ${result.country}`}</p>
				<div class="stat-value flex gap-2">
					<p>{isFahrenheit ? convertToF(result.temp) : result.temp}</p>
					<div class="flex items-start text-xl">
						<button
							on:click={() => (isFahrenheit = false)}
							class={isFahrenheit ? 'text-info-content/40' : ''}
						>
							{`°C`}
						</button>
						<span class="font-normal">|</span>
						<button
							on:click={() => (isFahrenheit = true)}
							class={!isFahrenheit ? 'text-info-content/40' : ''}
						>
							{`°F`}
						</button>
					</div>
				</div>
				<p class="stat-title">{result.description}</p>
			</div>
			<div class="stat border-none">
				<div class="stat-title flex gap-1">
					<IconWind />
					<p>Wind Speed</p>
				</div>
				<div class="stat-value flex items-center gap-2">
					<p>{`${result.wind.toFixed(1)} km/h`}</p>
				</div>
			</div>
			<div class="stat border-none">
				<div class="stat-title flex gap-1">
					<IconDropletFilled />
					<p>Humidity</p>
				</div>
				<p class="stat-value">{`${result.humidity}%`}</p>
			</div>
		</div>
	{:catch}
		<div class="rounded-box flex gap-2 bg-error p-2 font-bold text-error-content">
			<IconAlertTriangle />
			<span>Error! Check the city name and try again.</span>
		</div>
	{/await}
</div>
