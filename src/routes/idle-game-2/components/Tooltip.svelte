<script lang="ts">
	let isHovered = false;
	let x: number;
	let y: number;

	function mouseOver(event: MouseEvent) {
		isHovered = true;
		x = event.pageX + 5;
		y = event.pageY + 5;
	}
	function mouseMove(event: MouseEvent) {
		x = event.pageX + 5;
		y = event.pageY + 5;
	}
	function mouseLeave() {
		isHovered = false;
	}
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div on:mouseover={mouseOver} on:mouseleave={mouseLeave} on:mousemove={mouseMove}>
	<slot />
</div>

{#if isHovered}
	<div style="top: {y}px; left: {x}px;" class="">
		<slot name="tooltip-content" />
	</div>
{/if}
