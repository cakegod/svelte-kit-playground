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

	handleFetch('New York');

	function convertToF(celsius: number) {
		return (celsius * 9) / 5 + 32;
	}

	let isFahrenheit = true;
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

	<div class="stats stats-vertical w-full max-w-xs bg-info/10 text-info-content shadow">
		<div class="stat border-none">
			<img
				class="stat-figure"
				src={`http://openweathermap.org/img/wn/${result.icon}@2x.png`}
				alt="weather"
			/>
			<p class="stat-title">{`${result.name}, ${result.country}`}</p>
			<div class="stat-value flex gap-2">
				<p>{isFahrenheit ? convertToF(Number(result.temp)) : result.temp}</p>
				<div class="flex items-start text-xl">
					<button
						on:click={() => (isFahrenheit = false)}
						class={isFahrenheit ? 'text-info-content/40' : ''}>{`°C`}</button
					>
					<span class="font-normal">|</span>
					<button
						on:click={() => (isFahrenheit = true)}
						class={!isFahrenheit ? 'text-info-content/40' : ''}>{`°F`}</button
					>
				</div>
				<!-- {isFahrenheit ? `${result.temp}°C` : `${convertToF(Number(result.temp))}°F`} -->
			</div>
			<p class="stat-desc">{result.description}</p>
		</div>
		<div class="stat border-none">
			<p class="stat-title">{`Wind speed`}</p>
			<p class="stat-value">{`${Number(result.wind).toFixed(1)} km/h`}</p>
		</div>
		<div class="stat border-none">
			<p class="stat-title">{`Humidity`}</p>
			<p class="stat-value">{`${result.humidity}%`}</p>
		</div>
	</div>
	<div class="stats bg-primary text-primary-content" />
</div>
