<!-- System diagram: Implera agent pipeline -->
<figure class="diagram" role="img" aria-label="Implera pipeline diagram showing the flow from developer idea through planner, engineer and validation agents, ending with a GitHub pull request for human review.">
	<svg viewBox="0 0 720 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="diagram-svg">
		<!-- Developer input -->
		<rect x="16" y="72" width="100" height="56" rx="4" stroke="var(--color-text)" stroke-width="1.5" />
		<text x="66" y="96" text-anchor="middle" fill="var(--color-text)" font-size="12" font-weight="600" font-family="var(--font-sans)">Developer</text>
		<text x="66" y="114" text-anchor="middle" fill="var(--color-text-tertiary)" font-size="10" font-family="var(--font-sans)">Describes change</text>

		<!-- Arrow -->
		<line x1="116" y1="100" x2="156" y2="100" stroke="var(--color-border-strong)" stroke-width="1" marker-end="url(#impl-arrow)" />

		<!-- Planner -->
		<rect x="156" y="72" width="100" height="56" rx="4" stroke="var(--color-border-strong)" stroke-width="1.5" fill="var(--color-bg-subtle)" />
		<text x="206" y="96" text-anchor="middle" fill="var(--color-text-secondary)" font-size="12" font-family="var(--font-sans)">Planner</text>
		<text x="206" y="114" text-anchor="middle" fill="var(--color-text-tertiary)" font-size="10" font-family="var(--font-sans)">Scopes tasks</text>

		<!-- Arrow -->
		<line x1="256" y1="100" x2="296" y2="100" stroke="var(--color-border-strong)" stroke-width="1" marker-end="url(#impl-arrow)" />

		<!-- Engineer -->
		<rect x="296" y="72" width="100" height="56" rx="4" stroke="var(--color-border-strong)" stroke-width="1.5" fill="var(--color-bg-subtle)" />
		<text x="346" y="96" text-anchor="middle" fill="var(--color-text-secondary)" font-size="12" font-family="var(--font-sans)">Engineer</text>
		<text x="346" y="114" text-anchor="middle" fill="var(--color-text-tertiary)" font-size="10" font-family="var(--font-sans)">Implements</text>

		<!-- Arrow -->
		<line x1="396" y1="100" x2="436" y2="100" stroke="var(--color-border-strong)" stroke-width="1" marker-end="url(#impl-arrow)" />

		<!-- Validation -->
		<rect x="436" y="72" width="100" height="56" rx="4" stroke="var(--color-border-strong)" stroke-width="1.5" fill="var(--color-bg-subtle)" />
		<text x="486" y="96" text-anchor="middle" fill="var(--color-text-secondary)" font-size="12" font-family="var(--font-sans)">Validation</text>
		<text x="486" y="114" text-anchor="middle" fill="var(--color-text-tertiary)" font-size="10" font-family="var(--font-sans)">Runs tests</text>

		<!-- Arrow -->
		<line x1="536" y1="100" x2="576" y2="100" stroke="var(--color-border-strong)" stroke-width="1" marker-end="url(#impl-arrow)" />

		<!-- PR output -->
		<rect x="576" y="72" width="128" height="56" rx="4" stroke="var(--color-text)" stroke-width="1.5" />
		<text x="640" y="96" text-anchor="middle" fill="var(--color-text)" font-size="12" font-weight="600" font-family="var(--font-sans)">Pull request</text>
		<text x="640" y="114" text-anchor="middle" fill="var(--color-text-tertiary)" font-size="10" font-family="var(--font-sans)">Human review</text>

		<!-- Ephemeral env label -->
		<rect x="156" y="24" width="380" height="28" rx="3" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="4 3" />
		<text x="346" y="42" text-anchor="middle" fill="var(--color-text-tertiary)" font-size="10" font-family="var(--font-sans)">Isolated ephemeral environment</text>

		<!-- Feedback arrow -->
		<path d="M640 128 L640 172 L66 172 L66 128" stroke="var(--color-border-strong)" stroke-width="1" fill="none" stroke-dasharray="4 3" marker-end="url(#impl-arrow)" />
		<text x="353" y="168" text-anchor="middle" fill="var(--color-text-tertiary)" font-size="10" font-family="var(--font-sans)">Review feedback</text>

		<defs>
			<marker id="impl-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
				<polygon points="0 0, 8 3, 0 6" fill="var(--color-border-strong)" />
			</marker>
		</defs>
	</svg>
</figure>

<style>
	.diagram {
		margin-block: var(--space-lg);
		padding: var(--space-md);
		border: 1px solid var(--color-border);
		border-radius: 6px;
		background: var(--color-surface);
		overflow-x: auto;
	}

	.diagram-svg {
		display: block;
		inline-size: 100%;
		max-inline-size: 720px;
		block-size: auto;
	}
</style>
