<script lang="ts">
	interface Props {
		title: string;
		subtitle?: string;
	}

	let { title, subtitle }: Props = $props();
</script>

<header class="page-header">
	<h1 class="page-title">{title}</h1>
	{#if subtitle}
		<p class="page-subtitle">{subtitle}</p>
	{/if}
</header>

<style>
	.page-header {
		margin-block-end: var(--space-xl);
	}

	.page-title {
		font-size: var(--text-3xl);
		font-weight: 700;
		letter-spacing: var(--tracking-tight);
	}

	.page-subtitle {
		margin-block-start: var(--space-sm);
		font-size: var(--text-lg);
		color: var(--color-text-secondary);
		line-height: var(--leading-snug);
	}
</style>
