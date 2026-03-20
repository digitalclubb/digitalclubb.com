<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { formatDate, isoDate } from '$lib/utils/date';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SEO
	title={data.meta.title}
	description={data.meta.summary}
	path="/writing/{data.meta.slug}"
	type="article"
	publishedTime={isoDate(data.meta.date)}
/>

<svelte:head>
	<script type="application/ld+json">
		{JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'Article',
			headline: data.meta.title,
			datePublished: isoDate(data.meta.date),
			author: {
				'@type': 'Person',
				name: 'Gareth Clubb',
				url: 'https://digitalclubb.com'
			}
		})}
	</script>
</svelte:head>

<article class="article">
	<header class="article-header">
		<time class="article-date" datetime={data.meta.date}>{formatDate(data.meta.date)}</time>
		<h1 class="article-title">{data.meta.title}</h1>
		<p class="article-reading-time">{data.readingTime}</p>
	</header>

	<div class="prose">
		{#if data.content}
			{@const Content = data.content}
			<Content />
		{/if}
	</div>

	<footer class="article-footer">
		<a href="/writing">&larr; All writing</a>
	</footer>
</article>

<style>
	.article {
		max-inline-size: var(--measure);
	}

	.article-header {
		margin-block-end: var(--space-xl);
	}

	.article-date {
		font-size: var(--text-sm);
		color: var(--color-text-tertiary);
	}

	.article-title {
		font-size: var(--text-3xl);
		font-weight: 700;
		letter-spacing: var(--tracking-tight);
		margin-block-start: var(--space-xs);
	}

	.article-reading-time {
		margin-block-start: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text-tertiary);
	}

	.article-footer {
		margin-block-start: var(--space-2xl);
		padding-block-start: var(--space-lg);
		border-block-start: 1px solid var(--color-border);
	}

	.article-footer a {
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		text-decoration: none;
	}

	.article-footer a:hover {
		color: var(--color-text);
	}
</style>
