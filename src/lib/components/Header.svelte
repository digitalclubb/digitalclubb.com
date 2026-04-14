<script lang="ts">
	import { page } from '$app/state';

	const navItems = [
		{ href: '/work', label: 'Products' },
		{ href: '/writing', label: 'Writing' },
		{ href: '/about', label: 'About' }
	];

	function isActive(href: string): boolean {
		return page.url.pathname === href || page.url.pathname.startsWith(href + '/');
	}
</script>

<header class="header">
	<nav class="header-nav" aria-label="Primary">
		<a href="/" class="header-home">Gareth Clubb</a>
		<ul class="header-links">
			{#each navItems as item}
				<li>
					<a
						href={item.href}
						class="header-link"
						aria-current={isActive(item.href) ? 'page' : undefined}
					>
						{item.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<style>
	.header {
		padding-block: var(--space-md);
		padding-inline: var(--content-padding);
		border-block-end: 1px solid var(--color-border);
	}

	.header-nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-inline-size: var(--content-width);
		margin-inline: auto;
	}

	.header-home {
		font-weight: 600;
		font-size: var(--text-base);
		text-decoration: none;
		letter-spacing: var(--tracking-tight);
		min-block-size: 44px;
		display: inline-flex;
		align-items: center;
	}

	.header-links {
		display: flex;
		gap: var(--space-md);
	}

	.header-link {
		font-size: var(--text-sm);
		text-decoration: none;
		color: var(--color-text-secondary);
		transition: color var(--duration-fast) var(--easing-default);
		padding: var(--space-xs) var(--space-sm);
		min-block-size: 44px;
		display: inline-flex;
		align-items: center;
	}

	.header-link:hover {
		color: var(--color-text);
	}

	.header-link[aria-current='page'] {
		color: var(--color-text);
		font-weight: 500;
	}

	@media (max-width: 640px) {
		.header-links {
			gap: var(--space-2xs);
		}
	}
</style>
