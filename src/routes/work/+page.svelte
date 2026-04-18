<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const taglines: Record<string, string> = {
		remindwise: 'Household renewal tracking',
		implera: 'Codebase quality intelligence',
		comparia: 'Structured decision-making',
		equalplay: 'Fair rotations for youth sport'
	};

	const images: Record<string, { src: string; alt: string }> = {
		remindwise: {
			src: '/products/remindwise.png',
			alt: 'RemindWise dashboard showing household records including car insurance, boiler service and MOT with status indicators and renewal dates'
		},
		implera: {
			src: '/products/implera.png',
			alt: 'Implera quality analysis pipeline showing a GitHub repository flowing through deterministic and AI review layers across seven domains to produce a quality score'
		},
		comparia: {
			src: '/products/comparia.png',
			alt: 'Comparia comparison table scoring three televisions across picture quality, gaming, price, brightness and value, with a recommended choice'
		},
		equalplay: {
			src: '/products/equalplay.png',
			alt: 'Equal Play game view showing playing and bench groups with player chips, next substitution suggestion and make sub action'
		}
	};
</script>

<SEO title="Products" description="Products built independently, shaped by real constraints around usability, performance and maintainability." path="/work" />

<PageHeader
	title="Products"
	subtitle="Products I've built independently. Each one starts with a real problem and is shaped by constraints around usability, performance and keeping the system simple enough to maintain."
/>

<ul class="product-list">
	{#each data.work as entry}
		<li class="product-item">
			<a href="/work/{entry.slug}" class="product-link">
				{#if images[entry.slug]}
					<picture class="product-media">
						<source
							type="image/webp"
							srcset="/products/responsive/{entry.slug}-560.webp 560w, /products/responsive/{entry.slug}-840.webp 840w, /products/responsive/{entry.slug}-1120.webp 1120w, /products/responsive/{entry.slug}-1680.webp 1680w"
							sizes="(max-width: 860px) 100vw, 34rem"
						/>
						<img
							class="product-image"
							src={images[entry.slug].src}
							alt={images[entry.slug].alt}
							width="1120"
							height="600"
							loading="lazy"
							decoding="async"
						/>
					</picture>
				{/if}

				<div class="product-body">
					<p class="product-meta">{entry.role} · {entry.period}</p>
					<h2 class="product-name">{entry.company}</h2>
					<p class="product-tagline">{taglines[entry.slug] ?? entry.title}</p>
					<p class="product-summary">{entry.summary}</p>
				</div>
			</a>
		</li>
	{/each}
</ul>

<style>
	.product-list {
		display: grid;
		gap: var(--space-3xl);
	}

	.product-link {
		text-decoration: none;
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
		align-items: start;
	}

	.product-media {
		display: block;
	}

	.product-image {
		display: block;
		inline-size: 100%;
		block-size: auto;
		border-radius: 6px;
		border: 1px solid var(--color-border);
		transition: border-color var(--duration-normal) var(--easing-default);
	}

	.product-link:hover .product-image {
		border-color: var(--color-border-strong);
	}

	.product-meta {
		font-size: var(--text-sm);
		color: var(--color-text-tertiary);
		margin-block-end: var(--space-sm);
	}

	.product-name {
		font-size: var(--text-2xl);
		font-weight: 700;
		letter-spacing: var(--tracking-tight);
		line-height: var(--leading-tight);
	}

	.product-link:hover .product-name {
		color: var(--color-link-hover);
	}

	.product-tagline {
		margin-block-start: var(--space-2xs);
		font-size: var(--text-base);
		color: var(--color-text-tertiary);
	}

	.product-summary {
		margin-block-start: var(--space-md);
		color: var(--color-text-secondary);
		line-height: var(--leading-normal);
		max-inline-size: var(--measure);
	}

	@media (min-width: 860px) {
		.product-link {
			grid-template-columns: 1fr 1fr;
			column-gap: var(--space-2xl);
			align-items: center;
		}

		.product-item:nth-child(even) .product-media {
			order: 2;
		}
	}
</style>
