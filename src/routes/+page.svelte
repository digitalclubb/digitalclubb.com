<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { formatDate } from '$lib/utils/date';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SEO />

<section class="hero" aria-labelledby="hero-heading">
	<h1 id="hero-heading" class="hero-title">
		I build and lead teams that ship fast, accessible and reliable web platforms.
	</h1>
	<p class="hero-intro">
		Engineering Manager at CrowdStrike. I work across frontend architecture, developer tooling
		and UI quality, helping teams build and ship with confidence. Increasingly focused on
		AI-assisted development and the responsible use of AI in production systems.
	</p>
</section>

<section class="section" aria-labelledby="how-i-work">
	<h2 id="how-i-work" class="section-heading">How I work</h2>
	<p class="section-intro">
		I work across product, engineering and the systems that connect them. Most of my time is
		spent reducing friction, improving confidence in what we ship and helping teams move faster
		without losing control.
	</p>
	<ul class="approach-list">
		<li class="approach-item">
			<h3 class="approach-title">Building teams that can deliver</h3>
			<p class="approach-description">
				I lead frontend engineers and SDETs, focusing on creating an environment where
				people can do their best work. That means clear direction, psychological safety
				and a shared understanding of what good looks like.
			</p>
		</li>
		<li class="approach-item">
			<h3 class="approach-title">Architecture that holds up under change</h3>
			<p class="approach-description">
				I focus on frontend architecture that stays fast and maintainable as products
				evolve. Performance budgets, observability and build systems are treated as
				part of the product, not something to revisit later.
			</p>
		</li>
		<li class="approach-item">
			<h3 class="approach-title">Developer experience as a force multiplier</h3>
			<p class="approach-description">
				I invest in tooling, build pipelines and local development environments that
				make it easy to work on the system. When changes are quick to make and easy to
				verify, teams move faster and with more confidence.
			</p>
		</li>
		<li class="approach-item">
			<h3 class="approach-title">Quality built into the system</h3>
			<p class="approach-description">
				I work closely with SDETs to define UI quality strategy across teams. That
				includes accessibility, visual regression and automation that gives teams
				confidence without slowing them down.
			</p>
		</li>
		<li class="approach-item">
			<h3 class="approach-title">Introducing AI carefully</h3>
			<p class="approach-description">
				I'm focused on bringing AI into the development lifecycle in a way that remains
				reviewable and predictable. Generated code goes through the same process as any
				other change, and the system makes it clear what has changed and why.
			</p>
		</li>
	</ul>
</section>

<section class="section" aria-labelledby="selected-work">
	<h2 id="selected-work" class="section-heading">Products</h2>
	<ul class="work-list">
		{#each data.work as entry}
			<li class="work-item">
				<a href="/work/{entry.slug}" class="work-link">
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
		max-inline-size: 45rem;
	}

	.section {
		margin-block-end: var(--space-2xl);
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
		margin-block-end: var(--space-lg);
	}

	.approach-list {
		display: grid;
		gap: var(--space-lg);
	}

	.approach-item {
		padding-block-end: var(--space-lg);
		border-block-end: 1px solid var(--color-border);
	}

	.approach-item:last-child {
		border-block-end: none;
		padding-block-end: 0;
	}

	.approach-title {
		font-size: var(--text-base);
		font-weight: 600;
		letter-spacing: var(--tracking-tight);
	}

	.approach-description {
		margin-block-start: var(--space-xs);
		color: var(--color-text-secondary);
		line-height: var(--leading-normal);
		max-inline-size: var(--measure);
	}

	.work-list {
		display: grid;
		gap: var(--space-lg);
	}

	.work-item {
		border-block-end: 1px solid var(--color-border);
		padding-block-end: var(--space-lg);
	}

	.work-item:last-child {
		border-block-end: none;
	}

	.work-link {
		text-decoration: none;
		display: block;
	}

	.work-company {
		font-size: var(--text-sm);
		color: var(--color-text-tertiary);
		font-weight: 500;
	}

	.work-title {
		font-size: var(--text-xl);
		font-weight: 600;
		margin-block-start: var(--space-2xs);
		letter-spacing: var(--tracking-tight);
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
