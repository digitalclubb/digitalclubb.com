<script lang="ts">
	import { page } from '$app/state';
	import SEO from '$lib/components/SEO.svelte';
</script>

<SEO title="Page not found" description="The page you're looking for doesn't exist." />

<div class="error-page">
	<h1 class="error-code">{page.status}</h1>
	<p class="error-message">
		{#if page.status === 404}
			The page you're looking for doesn't exist.
		{:else}
			Something went wrong.
		{/if}
	</p>
	<a href="/" class="error-link">Back to home</a>
</div>

<style>
	.error-page {
		padding-block: var(--space-3xl);
	}

	.error-code {
		font-size: var(--text-4xl);
		font-weight: 700;
		letter-spacing: var(--tracking-tight);
	}

	.error-message {
		margin-block-start: var(--space-sm);
		font-size: var(--text-lg);
		color: var(--color-text-secondary);
	}

	.error-link {
		display: inline-block;
		margin-block-start: var(--space-lg);
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		text-decoration: none;
	}

	.error-link:hover {
		color: var(--color-text);
	}
</style>
