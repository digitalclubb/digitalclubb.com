<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import { formatDate } from '$lib/utils/date';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SEO />

<section class="hero" aria-labelledby="hero-heading">
	<h1 id="hero-heading" class="hero-title">
		I've spent twenty years building frontend systems at scale. The question now is what happens
		when writing code is no longer the hard part.
	</h1>
	<p class="hero-intro">
		Engineering Manager at CrowdStrike, leading frontend teams that build security tooling used
		by thousands of organisations. My work spans architecture, developer tooling and quality
		systems. I build products independently to stay close to the craft and test ideas against
		real problems.
	</p>
	<p class="hero-emphasis">Code is getting cheaper to produce. The things around it are not.</p>
</section>

<section class="section" aria-labelledby="how-i-work">
	<h2 id="how-i-work" class="section-heading">How I work</h2>
	<p class="section-intro">
		Most of what I do comes down to one question: how do you keep quality high when the system
		is changing faster than any team can manually review? I work on the architecture, tooling
		and team structures that make that possible.
	</p>
	<ul class="approach-list">
		<li class="approach-item">
			<h3 class="approach-title">Teams built around ownership, not process</h3>
			<p class="approach-description">
				I lead frontend engineers and SDETs. The focus is on giving teams enough context
				and autonomy to make good decisions without waiting for permission. Structure
				matters, but only if it creates clarity rather than overhead.
			</p>
		</li>
		<li class="approach-item">
			<h3 class="approach-title">Architecture that absorbs change</h3>
			<p class="approach-description">
				Frontend systems at scale need to handle constant change without accumulating
				debt. I focus on performance budgets, observable behaviour and build systems
				that are part of the product, not afterthoughts.
			</p>
		</li>
		<li class="approach-item">
			<h3 class="approach-title">Tooling as infrastructure</h3>
			<p class="approach-description">
				Developer experience is not a perk. When local development, CI pipelines and
				testing feedback are fast and reliable, teams move faster and make fewer
				mistakes. I treat this as core infrastructure.
			</p>
		</li>
		<li class="approach-item">
			<h3 class="approach-title">Quality built into the system, not bolted on through review</h3>
			<p class="approach-description">
				I work with SDETs to embed quality into architecture and automation.
				Accessibility, visual regression and test coverage should be structural
				guarantees, not things that depend on someone catching them in review.
			</p>
		</li>
		<li class="approach-item">
			<h3 class="approach-title">AI in the development lifecycle</h3>
			<p class="approach-description">
				I'm bringing AI into how we build software. Not as a novelty, but as a reason
				to rethink what pipelines, specifications and review need to look like when
				code is cheap to produce and expensive to validate.
			</p>
		</li>
	</ul>
</section>

<section class="section" aria-labelledby="what-i-believe">
	<h2 id="what-i-believe" class="section-heading">What I believe</h2>
	<ul class="beliefs-list">
		<li class="belief-item">
			AI has changed the cost of producing code. It has not changed the cost of producing
			correct code. That gap is where most teams will fail.
		</li>
		<li class="belief-item">
			Specifications, constraints and validation are becoming the primary output of
			engineering. Code is becoming a byproduct.
		</li>
		<li class="belief-item">
			Quality that depends on someone catching it in review is not quality. It is luck.
		</li>
		<li class="belief-item">
			Shared understanding scales. Shared implementations often do not. Reuse knowledge,
			not code.
		</li>
		<li class="belief-item">
			Developer experience is infrastructure. Slow tooling is a tax on every engineer,
			every day.
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

	.hero-emphasis {
		margin-block-start: var(--space-lg);
		font-size: var(--text-xl);
		color: var(--color-text-secondary);
		line-height: var(--leading-snug);
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

	.beliefs-list {
		display: grid;
		gap: var(--space-md);
	}

	.belief-item {
		color: var(--color-text-secondary);
		line-height: var(--leading-normal);
		max-inline-size: var(--measure);
		padding-block-end: var(--space-md);
		border-block-end: 1px solid var(--color-border);
	}

	.belief-item:last-child {
		border-block-end: none;
		padding-block-end: 0;
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
