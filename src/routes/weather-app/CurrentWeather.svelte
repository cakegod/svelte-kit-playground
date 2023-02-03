<script lang="ts">
	import { IconDropletFilled, IconWind } from '@tabler/icons-svelte';
	import type { fetchWeatherReturn } from './+page.svelte';

	export let weatherData: fetchWeatherReturn;
	let temperatureType: 'celsius' | 'fahreinheit' = 'celsius';
	$: temperatureType;
</script>

<div class="stats stats-vertical w-full max-w-sm bg-success/10 text-success-content shadow">
	<div class="stat border-none">
		<img
			class="stat-figure"
			src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
			alt="weather"
		/>
		<p class="stat-title w-20">{`${weatherData.name}, ${weatherData.country}`}</p>
		<div class="stat-value flex gap-2">
			<p>
				{temperatureType === 'fahreinheit'
					? weatherData.temp.fahreinheit
					: weatherData.temp.celsius}
			</p>
			<button
				on:click={() => (temperatureType = 'celsius')}
				class:light-text={temperatureType !== 'celsius'}
				class="flex text-xl"
			>
				°C
			</button>
			<span class="text-xl font-normal">|</span>
			<button
				on:click={() => (temperatureType = 'fahreinheit')}
				class:light-text={temperatureType !== 'fahreinheit'}
				class="flex text-xl"
			>
				°F
			</button>
		</div>
		<p class="stat-title">{weatherData.description}</p>
	</div>
	<div class="stat border-none">
		<div class="stat-title flex gap-1">
			<IconWind />
			<p>Wind Speed</p>
		</div>
		<div class="stat-value flex items-center gap-2">
			<p>{`${weatherData.wind.toFixed(1)} km/h`}</p>
		</div>
	</div>
	<div class="stat border-none">
		<div class="stat-title flex gap-1">
			<IconDropletFilled />
			<p>Humidity</p>
		</div>
		<p class="stat-value">{`${weatherData.humidity}%`}</p>
	</div>
</div>

<style lang="postcss">
	.light-text {
		@apply text-info-content/40;
	}
</style>
