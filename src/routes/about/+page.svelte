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
			I'm Gareth Clubb. I've worked in software engineering for twenty years across media,
			travel, property, gaming and cybersecurity. I lead frontend teams at CrowdStrike,
			building security tooling used by thousands of organisations.
		</p>

		<p>
			The through-line has been the same problem: how do you build frontend systems that stay
			fast, reliable and maintainable as everything around them changes? The tools shift. The
			frameworks come and go. The underlying challenge does not.
		</p>

		<p>
			What has changed is the economics. AI has made producing code cheap. Architecture,
			testing strategy, specifications and team judgement have not. They matter more now than
			they did before. Most teams are still optimising for a cost structure that no longer
			applies.
		</p>

		<p>
			I build products on the side to stay close to the craft. It is easy to lose that
			connection when you spend most of your time leading teams. Building things keeps me
			honest about what is actually hard.
		</p>

		<h2>Background</h2>

		<p>
			Before CrowdStrike, I worked across several industries. Each shaped how I think about
			building software.
		</p>

		<p>
			At <strong>Telegraph Media Group</strong>, I worked on the frontend platform serving
			millions of readers. Performance at that scale is not optional. It taught me that
			architecture decisions made early compound for years.
		</p>

		<p>
			At <strong>Houseful</strong>, I led frontend architecture and the replatforming of
			Alto, an estate agency product used across the UK. That meant consolidating shared UI
			systems, improving build performance and establishing accessibility standards that
			held across the organisation.
		</p>

		<p>
			At <strong>TUI</strong>, I built booking and search experiences for specialist travel
			brands under real commercial pressure. Systems that are slow or unreliable lose money
			visibly and immediately.
		</p>

		<p>
			At <strong>Jagex</strong>, I led a team building the web platform and internal tooling
			for RuneScape. That was where I first learned how platform work differs from product
			work.
		</p>

		<h2>How I think about engineering</h2>

		<p>
			I care about how frontend systems behave at scale. That means codebases that remain
			understandable, performance and behaviour that are observable and teams that can work
			independently without creating fragmentation.
		</p>

		<p>
			Strong typing, build tooling and testing strategy are not additions to the system. They
			are the system. When these are treated as optional, quality becomes a matter of
			individual discipline. When they are structural, quality becomes a default.
		</p>

		<p>
			I think the most important shift happening in software development right now is the
			move from code as the primary output to specifications, constraints and validation as
			the primary output. AI is making code cheap. The teams that invest in everything around
			the code will be the ones that benefit most.
		</p>

		<p>
			I write here about systems, tradeoffs and how software gets built at scale. You can
			find me on
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
