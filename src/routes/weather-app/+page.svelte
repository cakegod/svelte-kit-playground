<script lang="ts">
	import type { Response } from './types';

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
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="icon icon-tabler icon-tabler-whirl animate-spin"
			width="50"
			height="50"
			viewBox="0 0 24 24"
			stroke-width="2"
			stroke="currentColor"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M14 12a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
			<path d="M12 21c-3.314 0 -6 -2.462 -6 -5.5s2.686 -5.5 6 -5.5" />
			<path d="M21 12c0 3.314 -2.462 6 -5.5 6s-5.5 -2.686 -5.5 -6" />
			<path d="M12 14c3.314 0 6 -2.462 6 -5.5s-2.686 -5.5 -6 -5.5" />
			<path d="M14 12c0 -3.314 -2.462 -6 -5.5 -6s-5.5 2.686 -5.5 6" />
		</svg>
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
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="icon icon-tabler icon-tabler-wind"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M5 8h8.5a2.5 2.5 0 1 0 -2.34 -3.24" />
						<path d="M3 12h15.5a2.5 2.5 0 1 1 -2.34 3.24" />
						<path d="M4 16h5.5a2.5 2.5 0 1 1 -2.34 3.24" />
					</svg>
					<p>Wind Speed</p>
				</div>
				<div class="stat-value flex items-center gap-2">
					<p>{`${result.wind.toFixed(1)} km/h`}</p>
				</div>
			</div>
			<div class="stat border-none">
				<div class="stat-title flex gap-1">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="icon icon-tabler icon-tabler-droplet"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M6.8 11a6 6 0 1 0 10.396 0l-5.197 -8l-5.2 8z" />
					</svg>
					<p>Humidity</p>
				</div>
				<p class="stat-value">{`${result.humidity}%`}</p>
			</div>
		</div>
	{:catch}
		<div class="alert alert-error shadow-lg">
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 flex-shrink-0 stroke-current"
					fill="none"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<span>Error! Check the city name and try again.</span>
			</div>
		</div>
	{/await}
</div>
