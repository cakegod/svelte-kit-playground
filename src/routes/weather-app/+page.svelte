<script lang="ts">
	let query: string;
	let result = {
		name: '',
		country: '',
		temp: '',
		description: '',
		wind: '',
		humidity: '',
		icon: ''
	};
	async function getWeatherData(query: string) {
		const fetchData = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=897dcd4fdb105148b7436c12cb942fc3&units=metric`,
			{ mode: 'cors' }
		);
		return await fetchData.json();
	}

	async function handleFetch(query: string) {
		const data = await getWeatherData(query);
		result.name = data.name;
		result.country = data.sys.country;
		result.temp = data.main.feels_like.toFixed(0);
		result.description = data.weather[0].main;
		result.wind = data.wind.speed;
		result.humidity = data.main.humidity;
		result.icon = data.weather[0].icon;
	}

	handleFetch('Marseille');

	function convertToF(celsius: number) {
		return (celsius * 9) / 5 + 32;
	}

	let isFahrenheit = false;
</script>

<div class="flex w-full flex-col items-center gap-4">
	<form on:submit={() => handleFetch(query)}>
		<input
			bind:value={query}
			type="text"
			placeholder="Search City"
			class="input-accent input rounded-box"
		/>
	</form>

	<div class="stats stats-vertical w-full max-w-sm bg-info/10 text-info-content shadow">
		<div class="stat border-none">
			<img
				class="stat-figure"
				src={`http://openweathermap.org/img/wn/${result.icon}@2x.png`}
				alt="weather"
			/>
			<p class="stat-title w-20">{`${result.name}, ${result.country}`}</p>
			<div class="stat-value flex gap-2">
				<p>{isFahrenheit ? convertToF(Number(result.temp)) : result.temp}</p>
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
				<p>{`${Number(result.wind).toFixed(1)} km/h`}</p>
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
	<div class="stats bg-primary text-primary-content" />
</div>
