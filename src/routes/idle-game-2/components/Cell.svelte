<script lang="ts">
	export let color: string,
		size: keyof typeof sizes = 'standard';
	const sizes = {
		badge: 'w-3 h-3',
		standard: 'w-7 h-7'
	};
</script>

<div class={`${sizes[size]} border border-gray-900 ${color}`} />
