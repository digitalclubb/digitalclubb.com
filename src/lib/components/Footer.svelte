<footer class="footer">
	<div class="footer-inner">
		<p class="footer-text">&copy; {new Date().getFullYear()} Gareth Clubb</p>
		<nav class="footer-links" aria-label="Footer">
			<a href="/api/rss" class="footer-link">RSS</a>
			<a href="https://github.com/digitalclubb" class="footer-link" rel="noopener noreferrer">GitHub</a>
			<a href="https://linkedin.com/in/garethclubb" class="footer-link" rel="noopener noreferrer">LinkedIn</a>
		</nav>
	</div>
</footer>

<style>
	.footer {
		padding-block: var(--space-lg);
		padding-inline: var(--content-padding);
		border-block-start: 1px solid var(--color-border);
		margin-block-start: var(--space-3xl);
	}

	.footer-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-inline-size: var(--content-width);
		margin-inline: auto;
	}

	.footer-text {
		font-size: var(--text-sm);
		color: var(--color-text-tertiary);
	}

	.footer-links {
		display: flex;
		gap: var(--space-xs);
	}

	.footer-link {
		font-size: var(--text-sm);
		color: var(--color-text-tertiary);
		text-decoration: none;
		padding: var(--space-xs) var(--space-sm);
		min-block-size: 44px;
		display: inline-flex;
		align-items: center;
	}

	.footer-link:hover {
		color: var(--color-text-secondary);
	}

	@media (max-width: 640px) {
		.footer-inner {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--space-sm);
		}
	}
</style>
