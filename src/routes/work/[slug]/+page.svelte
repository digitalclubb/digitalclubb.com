<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const alts: Record<string, string> = {
		remindwise:
			'RemindWise dashboard showing household records including car insurance, boiler service and MOT with status indicators and renewal dates',
		implera:
			'Implera quality analysis pipeline showing a GitHub repository flowing through deterministic and AI review layers across seven domains to produce a quality score',
		comparia:
			'Comparia comparison table scoring three televisions across picture quality, gaming, price, brightness and value, with a recommended choice',
		equalplay:
			'Equal Play game view showing playing and bench groups with player chips, next substitution suggestion and make sub action'
	};

	const imageAlt = $derived(alts[data.meta.slug] ?? `${data.meta.company} product screenshot`);
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

	<picture class="case-study-hero">
		<source
			type="image/webp"
			srcset="/products/responsive/{data.meta.slug}-560.webp 560w, /products/responsive/{data.meta.slug}-840.webp 840w, /products/responsive/{data.meta.slug}-1120.webp 1120w, /products/responsive/{data.meta.slug}-1680.webp 1680w"
			sizes="(max-width: 720px) 100vw, 42rem"
		/>
		<img
			class="case-study-hero-image"
			src="/products/{data.meta.slug}.png"
			alt={imageAlt}
			width="1120"
			height="600"
			decoding="async"
		/>
	</picture>

	<div class="prose case-study-prose">
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
		margin-block-end: var(--space-2xl);
	}

	.case-study-hero {
		display: block;
		margin-block-end: var(--space-2xl);
	}

	.case-study-hero-image {
		display: block;
		inline-size: 100%;
		block-size: auto;
		border-radius: 6px;
		border: 1px solid var(--color-border);
	}

	.case-study-prose :global(> p:first-of-type) {
		font-size: var(--text-lg);
		line-height: var(--leading-snug);
		color: var(--color-text);
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
		margin-block-start: var(--space-3xl);
		padding-block-start: var(--space-lg);
		border-block-start: 1px solid var(--color-border);
	}

	.case-study-footer a {
		font-size: var(--text-base);
		color: var(--color-text-secondary);
		text-decoration: none;
	}

	.case-study-footer a:hover {
		color: var(--color-text);
	}
</style>
