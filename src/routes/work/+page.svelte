<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SEO title="Products" description="Products built end-to-end, shaped by real constraints around usability, performance and maintainability." path="/work" />

<PageHeader
	title="Products"
	subtitle="Products I've built independently. Each one starts with a real problem and is shaped by constraints around usability, performance and keeping the system simple enough to maintain."
/>

<ul class="work-list">
	{#each data.work as entry}
		<li class="work-item">
			<a href="/work/{entry.slug}" class="work-link">
				<div class="work-meta">
					<span class="work-company">{entry.company}</span>
					<span class="work-period">{entry.period}</span>
				</div>
				<h2 class="work-title">{entry.title}</h2>
				<p class="work-role">{entry.role}</p>
				<p class="work-summary">{entry.summary}</p>
			</a>
		</li>
	{/each}
</ul>

<style>
	.work-list {
		display: grid;
		gap: var(--space-xl);
	}

	.work-item {
		border-block-end: 1px solid var(--color-border);
		padding-block-end: var(--space-xl);
	}

	.work-item:last-child {
		border-block-end: none;
	}

	.work-link {
		text-decoration: none;
		display: block;
	}

	.work-meta {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		margin-block-end: var(--space-xs);
	}

	.work-company {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-text);
	}

	.work-period {
		font-size: var(--text-sm);
		color: var(--color-text-tertiary);
	}

	.work-title {
		font-size: var(--text-xl);
		font-weight: 600;
		letter-spacing: var(--tracking-tight);
	}

	.work-link:hover .work-title {
		color: var(--color-text-secondary);
	}

	.work-role {
		margin-block-start: var(--space-2xs);
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		font-weight: 500;
	}

	.work-summary {
		margin-block-start: var(--space-sm);
		color: var(--color-text-secondary);
		line-height: var(--leading-normal);
	}
</style>
