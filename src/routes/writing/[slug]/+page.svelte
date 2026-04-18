<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { siteConfig } from '$lib/config';
	import { formatDate, isoDate } from '$lib/utils/date';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const canonicalUrl = $derived(`${siteConfig.url}/writing/${data.meta.slug}`);
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
			description: data.meta.summary,
			author: {
				'@type': 'Person',
				name: siteConfig.author.name,
				url: siteConfig.url,
				jobTitle: siteConfig.author.role,
				worksFor: {
					'@type': 'Organization',
					name: siteConfig.author.company
				}
			},
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id': canonicalUrl
			}
		})}
	</script>
</svelte:head>

<article class="article">
	<header class="article-header">
		<p class="article-meta">
			<time datetime={data.meta.date}>{formatDate(data.meta.date)}</time>
			<span aria-hidden="true">·</span>
			<span>{data.readingTime}</span>
		</p>
		<h1 class="article-title">{data.meta.title}</h1>
	</header>

	<div class="prose article-prose">
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
		margin-block-end: var(--space-2xl);
	}

	.article-meta {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text-tertiary);
		margin-block-end: var(--space-md);
	}

	.article-title {
		font-size: var(--text-3xl);
		font-weight: 700;
		letter-spacing: var(--tracking-tight);
		line-height: var(--leading-tight);
	}

	.article-prose :global(> p:first-of-type) {
		font-size: var(--text-lg);
		line-height: var(--leading-snug);
		color: var(--color-text);
	}

	.article-footer {
		margin-block-start: var(--space-3xl);
		padding-block-start: var(--space-lg);
		border-block-start: 1px solid var(--color-border);
	}

	.article-footer a {
		font-size: var(--text-base);
		color: var(--color-text-secondary);
		text-decoration: none;
	}

	.article-footer a:hover {
		color: var(--color-link-hover);
	}
</style>
