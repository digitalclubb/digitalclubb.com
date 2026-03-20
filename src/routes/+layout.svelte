<script lang="ts">
	import '$lib/styles/tokens.css';
	import '$lib/styles/reset.css';
	import '$lib/styles/prose.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<a href="#main" class="skip-link">Skip to content</a>

<Header />

<main id="main" class="main">
	{@render children()}
</main>

<Footer />

<style>
	.main {
		max-inline-size: var(--content-width);
		margin-inline: auto;
		padding-inline: var(--content-padding);
		padding-block-start: var(--space-xl);
		padding-block-end: var(--space-2xl);
	}
</style>
