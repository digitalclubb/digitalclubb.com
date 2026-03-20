<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
</script>

<SEO
	title="Writing"
	description="Thoughts on frontend architecture, performance, accessibility and engineering leadership."
	path="/writing"
/>

<PageHeader
	title="Writing"
	subtitle="On frontend architecture, performance, accessibility and leading engineering teams."
/>

<p class="coming-soon">Coming soon.</p>

<style>
	.coming-soon {
		color: var(--color-text-tertiary);
		font-size: var(--text-base);
	}
</style>
