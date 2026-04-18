<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { formatDate } from '$lib/utils/date';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SEO />

<section class="hero" aria-labelledby="hero-heading">
	<h1 id="hero-heading" class="hero-title">
		The hard part of building software is no longer writing the code.
	</h1>
	<p class="hero-intro">
		I lead frontend teams at CrowdStrike, building security tooling used by thousands of
		organisations. My work spans architecture, developer tooling and quality systems. I build
		products independently to stay close to the craft and test ideas against real problems.
	</p>
	<p class="hero-quote">
		Code is getting cheaper to produce. The things around it are not.
	</p>
</section>

<section class="section" aria-labelledby="how-i-work">
	<h2 id="how-i-work" class="section-heading">How I work</h2>
	<p class="section-intro">
		How do you keep quality high when the system is changing faster than any team can manually
		review?
	</p>
	<ol class="approach-list">
		<li class="approach-item">
			<div class="approach-head">
				<span class="approach-index" aria-hidden="true">01</span>
				<h3 class="approach-title">Teams built around ownership, not process</h3>
			</div>
			<p class="approach-description">
				I lead frontend engineers and SDETs. The focus is on giving teams enough context
				and autonomy to make good decisions without waiting for permission. Structure
				matters, but only if it creates clarity rather than overhead.
			</p>
		</li>
		<li class="approach-item">
			<div class="approach-head">
				<span class="approach-index" aria-hidden="true">02</span>
				<h3 class="approach-title">Architecture that absorbs change</h3>
			</div>
			<p class="approach-description">
				Frontend systems at scale need to handle constant change without accumulating
				debt. I focus on performance budgets, observable behaviour and build systems
				that are part of the product, not afterthoughts.
			</p>
		</li>
		<li class="approach-item">
			<div class="approach-head">
				<span class="approach-index" aria-hidden="true">03</span>
				<h3 class="approach-title">Tooling as infrastructure</h3>
			</div>
			<p class="approach-description">
				Developer experience is not a perk. When local development, CI pipelines and
				testing feedback are fast and reliable, teams move faster and make fewer
				mistakes. I treat this as core infrastructure.
			</p>
		</li>
		<li class="approach-item">
			<div class="approach-head">
				<span class="approach-index" aria-hidden="true">04</span>
				<h3 class="approach-title">Quality built into the system, not bolted on through review</h3>
			</div>
			<p class="approach-description">
				I work with SDETs to embed quality into architecture and automation.
				Accessibility, visual regression and test coverage should be structural
				guarantees, not things that depend on someone catching them in review.
			</p>
		</li>
		<li class="approach-item">
			<div class="approach-head">
				<span class="approach-index" aria-hidden="true">05</span>
				<h3 class="approach-title">AI in the development lifecycle</h3>
			</div>
			<p class="approach-description">
				I'm bringing AI into how we build software. Not as a novelty, but as a reason
				to rethink what pipelines, specifications and review need to look like when
				code is cheap to produce and expensive to validate.
			</p>
		</li>
	</ol>
</section>

<section class="section" aria-labelledby="selected-work">
	<h2 id="selected-work" class="section-heading">Products</h2>
	<ul class="work-grid">
		{#each data.work as entry}
			<li class="work-item">
				<a href="/work/{entry.slug}" class="work-link">
					<picture class="work-thumb">
						<source
							type="image/webp"
							srcset="/products/responsive/{entry.slug}-560.webp 560w, /products/responsive/{entry.slug}-840.webp 840w, /products/responsive/{entry.slug}-1120.webp 1120w"
							sizes="(max-width: 720px) 100vw, 34rem"
						/>
						<img
							class="work-image"
							src="/products/{entry.slug}.png"
							alt=""
							width="1120"
							height="600"
							loading="lazy"
							decoding="async"
						/>
					</picture>
					<span class="work-company">{entry.company}</span>
					<h3 class="work-title">{entry.title}</h3>
					<p class="work-summary">{entry.summary}</p>
				</a>
			</li>
		{/each}
	</ul>
</section>

<section class="section" aria-labelledby="recent-writing">
	<h2 id="recent-writing" class="section-heading">Writing</h2>
	{#if data.writing.length > 0}
		<ul class="writing-list">
			{#each data.writing as entry}
				<li class="writing-item">
					<a href="/writing/{entry.slug}" class="writing-link">
						<time class="writing-date" datetime={entry.date}>{formatDate(entry.date)}</time>
						<h3 class="writing-title">{entry.title}</h3>
						<p class="writing-summary">{entry.summary}</p>
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="coming-soon">Posts coming soon.</p>
	{/if}
</section>

<style>
	/* ——— Hero ——— */

	.hero {
		margin-block-end: var(--space-3xl);
		max-inline-size: 50rem;
	}

	.hero-title {
		font-size: var(--text-3xl);
		font-weight: 700;
		letter-spacing: var(--tracking-tight);
		line-height: var(--leading-tight);
	}

	.hero-intro {
		margin-block-start: var(--space-md);
		font-size: var(--text-lg);
		color: var(--color-text-secondary);
		line-height: var(--leading-normal);
		max-inline-size: var(--measure);
	}

	.hero-quote {
		margin-block-start: var(--space-xl);
		padding-inline-start: var(--space-md);
		border-inline-start: 2px solid var(--color-border-strong);
		font-family: var(--font-serif);
		font-style: italic;
		font-size: var(--text-xl);
		line-height: var(--leading-snug);
		color: var(--color-text);
		max-inline-size: var(--measure);
	}

	/* ——— Sections ——— */

	.section {
		margin-block-end: var(--space-3xl);
	}

	.section-heading {
		font-size: var(--text-sm);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: var(--tracking-wide);
		color: var(--color-text-tertiary);
		margin-block-end: var(--space-lg);
	}

	.section-intro {
		color: var(--color-text-secondary);
		line-height: var(--leading-normal);
		max-inline-size: var(--measure);
		margin-block-end: var(--space-xl);
	}

	/* ——— Approach ——— */

	.approach-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.approach-item {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-sm);
		padding-block: var(--space-lg);
	}

	.approach-item + .approach-item {
		border-block-start: 1px solid var(--color-border);
	}

	.approach-head {
		display: flex;
		align-items: baseline;
		gap: var(--space-sm);
	}

	.approach-index {
		font-family: var(--font-serif);
		font-size: var(--text-sm);
		color: var(--color-text-tertiary);
		font-variant-numeric: tabular-nums;
		letter-spacing: var(--tracking-wide);
	}

	.approach-title {
		font-size: var(--text-base);
		font-weight: 600;
		letter-spacing: var(--tracking-tight);
		line-height: var(--leading-snug);
	}

	.approach-description {
		color: var(--color-text-secondary);
		line-height: var(--leading-normal);
		max-inline-size: var(--measure);
	}

	@media (min-width: 720px) {
		.approach-item {
			grid-template-columns: 18rem 1fr;
			gap: var(--space-xl);
			align-items: baseline;
		}
	}

	/* ——— Work ——— */

	.work-grid {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-2xl);
	}

	@media (min-width: 720px) {
		.work-grid {
			grid-template-columns: repeat(2, 1fr);
			column-gap: var(--space-xl);
		}
	}

	.work-link {
		text-decoration: none;
		display: block;
	}

	.work-thumb {
		display: block;
		margin-block-end: var(--space-md);
	}

	.work-image {
		display: block;
		inline-size: 100%;
		block-size: auto;
		border-radius: 6px;
		border: 1px solid var(--color-border);
	}

	.work-link:hover .work-image {
		border-color: var(--color-border-strong);
	}

	.work-company {
		display: block;
		font-size: var(--text-sm);
		color: var(--color-text-tertiary);
		font-weight: 500;
	}

	.work-title {
		font-size: var(--text-lg);
		font-weight: 600;
		margin-block-start: var(--space-2xs);
		letter-spacing: var(--tracking-tight);
		line-height: var(--leading-snug);
	}

	.work-link:hover .work-title {
		color: var(--color-text-secondary);
	}

	.work-summary {
		margin-block-start: var(--space-xs);
		color: var(--color-text-secondary);
		font-size: var(--text-base);
		line-height: var(--leading-normal);
	}

	/* ——— Writing ——— */

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
		font-size: var(--text-base);
		line-height: var(--leading-normal);
	}

	.coming-soon {
		color: var(--color-text-tertiary);
		font-size: var(--text-base);
	}
</style>
