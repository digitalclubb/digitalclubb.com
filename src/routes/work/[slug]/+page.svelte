<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import RemindWiseDiagram from '$lib/components/diagrams/RemindWiseDiagram.svelte';
	import ImpleraDiagram from '$lib/components/diagrams/ImpleraDiagram.svelte';
	import CompariaDiagram from '$lib/components/diagrams/CompariaDiagram.svelte';
	import EqualPlayDiagram from '$lib/components/diagrams/EqualPlayDiagram.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const diagrams: Record<string, typeof RemindWiseDiagram> = {
		remindwise: RemindWiseDiagram,
		implera: ImpleraDiagram,
		comparia: CompariaDiagram,
		equalplay: EqualPlayDiagram
	};

	const Diagram = $derived(diagrams[data.meta.slug]);
</script>

<SEO
	title={data.meta.company}
	description={data.meta.summary}
	path="/work/{data.meta.slug}"
/>

<article class="case-study">
	<header class="case-study-header">
		<h1 class="case-study-name">{data.meta.company}</h1>
		<p class="case-study-tagline">{data.meta.title}</p>
		<div class="case-study-meta">
			<span class="case-study-role">{data.meta.role}</span>
			<span class="case-study-separator" aria-hidden="true">&middot;</span>
			<span class="case-study-period">{data.meta.period}</span>
			{#if data.meta.url}
				<span class="case-study-separator" aria-hidden="true">&middot;</span>
				<a class="case-study-url" href={data.meta.url} rel="noopener noreferrer">{data.meta.url.replace(/^https?:\/\//, '')}</a>
			{/if}
		</div>
	</header>

	{#if Diagram}
		<Diagram />
	{/if}

	<div class="prose">
		{#if data.content}
			{@const Content = data.content}
			<Content />
		{/if}
	</div>

	<footer class="case-study-footer">
		<a href="/work">&larr; All products</a>
	</footer>
</article>

<style>
	.case-study {
		max-inline-size: var(--measure);
	}

	.case-study-header {
		margin-block-end: var(--space-xl);
	}

	.case-study-name {
		font-size: var(--text-3xl);
		font-weight: 700;
		letter-spacing: var(--tracking-tight);
		line-height: var(--leading-tight);
	}

	.case-study-tagline {
		margin-block-start: var(--space-xs);
		font-size: var(--text-lg);
		color: var(--color-text-secondary);
		line-height: var(--leading-snug);
	}

	.case-study-meta {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--space-xs) var(--space-sm);
		margin-block-start: var(--space-md);
		font-size: var(--text-sm);
		color: var(--color-text-tertiary);
	}

	.case-study-role {
		font-weight: 500;
	}

	.case-study-separator {
		color: var(--color-border-strong);
	}

	.case-study-url {
		color: var(--color-text-tertiary);
		text-decoration: underline;
		text-underline-offset: 0.15em;
		text-decoration-thickness: 1px;
	}

	.case-study-url:hover {
		color: var(--color-text-secondary);
	}

	.case-study-footer {
		margin-block-start: var(--space-2xl);
		padding-block-start: var(--space-lg);
		border-block-start: 1px solid var(--color-border);
	}

	.case-study-footer a {
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		text-decoration: none;
	}

	.case-study-footer a:hover {
		color: var(--color-text);
	}
</style>
