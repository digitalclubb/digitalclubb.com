<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
</script>

<SEO
	title="About"
	description="Engineering Manager at CrowdStrike. Frontend architecture, UI quality, developer tooling and engineering leadership."
	path="/about"
/>

<svelte:head>
	<script type="application/ld+json">
		{JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: 'Gareth Clubb',
			jobTitle: 'Engineering Manager',
			worksFor: {
				'@type': 'Organization',
				name: 'CrowdStrike'
			},
			url: 'https://digitalclubb.com',
			sameAs: [
				'https://github.com/digitalclubb',
				'https://linkedin.com/in/garethclubb'
			]
		})}
	</script>
</svelte:head>

<article class="about">
	<h1 class="about-title">About</h1>

	<div class="about-content prose">
		<p>
			I'm Gareth Clubb, an Engineering Manager at CrowdStrike. I lead frontend teams building
			security tooling used by thousands of organisations worldwide.
		</p>

		<p>
			My work focuses on improving how teams build and ship. That includes frontend
			architecture, UI quality, developer tooling and the systems that support them. The aim
			is to make delivery faster, more predictable and easier to maintain at scale.
		</p>

		<p>
			I spend a lot of time working across teams, setting direction, aligning standards and
			removing friction. The goal is not just to ship features, but to build systems and teams
			that can sustain quality over time.
		</p>

		<h2>Background</h2>

		<p>
			Before CrowdStrike, I worked across media, travel, property and gaming.
		</p>

		<p>
			At <strong>Telegraph Media Group</strong>, I helped modernise the frontend platform
			serving millions of readers. The focus was performance, platform architecture and
			improving how teams built and shipped across a large content system.
		</p>

		<p>
			At <strong>Houseful</strong>, I led frontend architecture and the replatforming of
			Alto, an estate agency software product. This involved consolidating shared UI systems,
			improving build performance and establishing accessibility standards adopted across
			the organisation.
		</p>

		<p>
			Earlier in my career, I worked at <strong>TUI</strong> on specialist travel brands
			such as Crystal Ski, building booking and search experiences under real commercial
			pressure where performance and reliability were critical.
		</p>

		<p>
			At <strong>Jagex</strong>, I led a team building the web platform that acts as the
			entry point into the game, alongside internal tooling to support it.
		</p>

		<h2>How I think about engineering</h2>

		<p>
			I focus on how frontend systems behave at scale. That means keeping codebases
			understandable, making performance and behaviour observable and allowing teams to work
			independently without creating fragmentation.
		</p>

		<p>
			Strong typing, build tooling and testing strategy are part of the system, not additions
			to it. The aim is to make changes predictable, reviewable and safe as the organisation
			grows.
		</p>

		<h2>What I focus on</h2>

		<ul>
			<li>Frontend architecture and platform strategy</li>
			<li>Frontend infrastructure for performance and scale</li>
			<li>UI quality, testing strategy and accessibility</li>
			<li>Developer tooling, build systems and workflows</li>
			<li>Performance and Core Web Vitals</li>
			<li>Observability, release processes and incident management</li>
			<li>Team structure, leadership and engineering culture</li>
		</ul>

		<p>
			This site is where I write about these areas and share some of the products I've built.
			You can find me on
			<a href="https://github.com/digitalclubb" rel="noopener noreferrer">GitHub</a> or
			<a href="https://linkedin.com/in/garethclubb" rel="noopener noreferrer">LinkedIn</a>.
		</p>
	</div>
</article>

<style>
	.about {
		max-inline-size: var(--measure);
	}

	.about-title {
		font-size: var(--text-3xl);
		font-weight: 700;
		letter-spacing: var(--tracking-tight);
		margin-block-end: var(--space-xl);
	}
</style>
