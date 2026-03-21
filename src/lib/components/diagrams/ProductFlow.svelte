<script lang="ts">
	interface Props {
		steps: string[];
		label: string;
		id: string;
	}

	let { steps, label, id }: Props = $props();

	const width = $derived(steps.length * 160 - 40);
	const viewBox = $derived(`0 0 ${width} 44`);
	const markerId = $derived(`flow-arrow-${id}`);
	const markerUrl = $derived(`url(#${markerId})`);
</script>

<figure class="product-flow" role="img" aria-label={label}>
	<svg {viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" class="product-flow-svg">
		{#each steps as step, i}
			{@const x = i * 160}
			<rect
				x={x}
				y="4"
				width="120"
				height="36"
				rx="4"
				stroke="var(--color-border-strong)"
				stroke-width="1.5"
			/>
			<text
				x={x + 60}
				y="26"
				text-anchor="middle"
				fill="var(--color-text-secondary)"
				font-size="11"
				font-family="var(--font-sans)"
			>{step}</text>

			{#if i < steps.length - 1}
				<line
					x1={x + 120}
					y1="22"
					x2={x + 160}
					y2="22"
					stroke="var(--color-border-strong)"
					stroke-width="1.5"
					marker-end={markerUrl}
				/>
			{/if}
		{/each}

		<defs>
			<marker id={markerId} markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
				<polygon points="0 0, 6 2.5, 0 5" fill="var(--color-border-strong)" />
			</marker>
		</defs>
	</svg>
</figure>

<style>
	.product-flow {
		margin-block: var(--space-sm);
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
	}

	.product-flow-svg {
		display: block;
		block-size: 44px;
		inline-size: auto;
		min-inline-size: 100%;
		max-inline-size: max-content;
	}
</style>
