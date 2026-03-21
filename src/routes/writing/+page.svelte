<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { formatDate } from '$lib/utils/date';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
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

{#if data.writing.length > 0}
	<ul class="writing-list">
		{#each data.writing as entry}
			<li class="writing-item">
				<a href="/writing/{entry.slug}" class="writing-link">
					<time class="writing-date" datetime={entry.date}>{formatDate(entry.date)}</time>
					<h2 class="writing-title">{entry.title}</h2>
					<p class="writing-summary">{entry.summary}</p>
				</a>
			</li>
		{/each}
	</ul>
{:else}
	<p class="coming-soon">Posts coming soon.</p>
{/if}

<style>
	.writing-list {
		display: grid;
		gap: var(--space-lg);
	}

	.writing-item {
		border-block-end: 1px solid var(--color-border);
		padding-block-end: var(--space-lg);
	}

	.writing-item:last-child {
		border-block-end: none;
	}

	.writing-link {
		text-decoration: none;
		display: block;
	}

	.writing-date {
		font-size: var(--text-sm);
		color: var(--color-text-tertiary);
	}

	.writing-title {
		font-size: var(--text-xl);
		font-weight: 600;
		margin-block-start: var(--space-2xs);
		letter-spacing: var(--tracking-tight);
	}

	.writing-link:hover .writing-title {
		color: var(--color-text-secondary);
	}

	.writing-summary {
		margin-block-start: var(--space-xs);
		color: var(--color-text-secondary);
		line-height: var(--leading-normal);
	}

	.coming-soon {
		color: var(--color-text-tertiary);
		font-size: var(--text-base);
	}
</style>
