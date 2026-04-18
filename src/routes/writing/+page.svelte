<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { formatDate } from '$lib/utils/date';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const lead = $derived(data.writing[0]);
	const rest = $derived(data.writing.slice(1));
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
	{#if lead}
		<article class="lead">
			<a href="/writing/{lead.slug}" class="lead-link">
				<p class="meta">
					<time datetime={lead.date}>{formatDate(lead.date)}</time>
					<span aria-hidden="true">·</span>
					<span>{lead.readingTime}</span>
				</p>
				<h2 class="lead-title">{lead.title}</h2>
				<p class="lead-summary">{lead.summary}</p>
			</a>
		</article>
	{/if}

	{#if rest.length > 0}
		<ul class="writing-list">
			{#each rest as entry}
				<li class="writing-item">
					<a href="/writing/{entry.slug}" class="writing-link">
						<p class="meta">
							<time datetime={entry.date}>{formatDate(entry.date)}</time>
							<span aria-hidden="true">·</span>
							<span>{entry.readingTime}</span>
						</p>
						<h3 class="writing-title">{entry.title}</h3>
						<p class="writing-summary">{entry.summary}</p>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
{:else}
	<p class="coming-soon">Posts coming soon.</p>
{/if}

<style>
	.meta {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text-tertiary);
	}

	/* ——— Lead ——— */

	.lead {
		margin-block-end: var(--space-3xl);
	}

	.lead-link {
		text-decoration: none;
		display: block;
	}

	.lead-title {
		margin-block-start: var(--space-sm);
		font-size: var(--text-2xl);
		font-weight: 700;
		letter-spacing: var(--tracking-tight);
		line-height: var(--leading-tight);
		max-inline-size: var(--measure);
	}

	.lead-link:hover .lead-title {
		color: var(--color-link-hover);
	}

	.lead-summary {
		margin-block-start: var(--space-sm);
		font-size: var(--text-lg);
		color: var(--color-text-secondary);
		line-height: var(--leading-normal);
		max-inline-size: var(--measure);
	}

	/* ——— List ——— */

	.writing-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: var(--space-2xl);
	}

	.writing-link {
		text-decoration: none;
		display: block;
	}

	.writing-title {
		margin-block-start: var(--space-2xs);
		font-size: var(--text-xl);
		font-weight: 600;
		letter-spacing: var(--tracking-tight);
		line-height: var(--leading-snug);
		max-inline-size: var(--measure);
	}

	.writing-link:hover .writing-title {
		color: var(--color-link-hover);
	}

	.writing-summary {
		margin-block-start: var(--space-xs);
		color: var(--color-text-secondary);
		line-height: var(--leading-normal);
		max-inline-size: var(--measure);
	}

	.coming-soon {
		color: var(--color-text-tertiary);
		font-size: var(--text-base);
	}
</style>
