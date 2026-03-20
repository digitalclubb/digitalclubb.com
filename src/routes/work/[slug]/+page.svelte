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
	title={data.meta.title}
	description={data.meta.summary}
	path="/work/{data.meta.slug}"
/>

<article class="case-study">
	<header class="case-study-header">
		<div class="case-study-meta">
			<span class="case-study-company">{data.meta.company}</span>
			<span class="case-study-period">{data.meta.period}</span>
		</div>
		<h1 class="case-study-title">{data.meta.title}</h1>
		<p class="case-study-role">{data.meta.role}</p>
		{#if data.meta.url}
			<p class="case-study-url">
				<a href={data.meta.url} rel="noopener noreferrer">{data.meta.url.replace(/^https?:\/\//, '')}</a>
			</p>
		{/if}
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

	.case-study-meta {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		margin-block-end: var(--space-sm);
	}

	.case-study-company {
		font-size: var(--text-sm);
		font-weight: 600;
	}

	.case-study-period {
		font-size: var(--text-sm);
		color: var(--color-text-tertiary);
	}

	.case-study-title {
		font-size: var(--text-3xl);
		font-weight: 700;
		letter-spacing: var(--tracking-tight);
	}

	.case-study-role {
		margin-block-start: var(--space-xs);
		font-size: var(--text-base);
		color: var(--color-text-secondary);
	}

	.case-study-url {
		margin-block-start: var(--space-xs);
		font-size: var(--text-sm);
	}

	.case-study-url a {
		color: var(--color-text-secondary);
		text-decoration: underline;
		text-underline-offset: 0.15em;
		text-decoration-thickness: 1px;
	}

	.case-study-url a:hover {
		color: var(--color-text);
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
