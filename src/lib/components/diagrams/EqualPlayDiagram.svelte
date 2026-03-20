<!-- Concept diagram: Equal Play rotation and disruption flow -->
<figure class="diagram" role="img" aria-label="Equal Play system diagram showing the flow from squad setup through rotation generation to live game management, with disruption handling for late arrivals and injuries that triggers recalculation, and a fairness summary tracking playing time across the session.">
	<svg viewBox="0 0 720 260" fill="none" xmlns="http://www.w3.org/2000/svg" class="diagram-svg">
		<!-- Squad setup -->
		<rect x="16" y="48" width="120" height="56" rx="4" stroke="var(--color-border-strong)" stroke-width="1.5" />
		<text x="76" y="72" text-anchor="middle" fill="var(--color-text)" font-size="12" font-weight="600" font-family="var(--font-sans)">Squad</text>
		<text x="76" y="90" text-anchor="middle" fill="var(--color-text-tertiary)" font-size="10" font-family="var(--font-sans)">Players + positions</text>

		<!-- Arrow -->
		<line x1="136" y1="76" x2="176" y2="76" stroke="var(--color-border-strong)" stroke-width="1" marker-end="url(#ep-arrow)" />

		<!-- Generate -->
		<rect x="176" y="48" width="120" height="56" rx="4" stroke="var(--color-border-strong)" stroke-width="1.5" fill="var(--color-bg-subtle)" />
		<text x="236" y="72" text-anchor="middle" fill="var(--color-text-secondary)" font-size="12" font-family="var(--font-sans)">Generate</text>
		<text x="236" y="90" text-anchor="middle" fill="var(--color-text-tertiary)" font-size="10" font-family="var(--font-sans)">Fair rotations</text>

		<!-- Arrow -->
		<line x1="296" y1="76" x2="336" y2="76" stroke="var(--color-border-strong)" stroke-width="1" marker-end="url(#ep-arrow)" />

		<!-- Live game -->
		<rect x="336" y="48" width="140" height="56" rx="4" stroke="var(--color-text)" stroke-width="1.5" />
		<text x="406" y="72" text-anchor="middle" fill="var(--color-text)" font-size="12" font-weight="600" font-family="var(--font-sans)">Live game</text>
		<text x="406" y="90" text-anchor="middle" fill="var(--color-text-tertiary)" font-size="10" font-family="var(--font-sans)">Step through subs</text>

		<!-- Arrow to fairness -->
		<line x1="476" y1="76" x2="540" y2="76" stroke="var(--color-border-strong)" stroke-width="1" marker-end="url(#ep-arrow)" />

		<!-- Fairness summary -->
		<rect x="540" y="36" width="164" height="80" rx="4" stroke="var(--color-border-strong)" stroke-width="1.5" />
		<text x="622" y="58" text-anchor="middle" fill="var(--color-text)" font-size="12" font-weight="600" font-family="var(--font-sans)">Fairness summary</text>

		<!-- Mini progress bars -->
		<text x="556" y="78" fill="var(--color-text-tertiary)" font-size="10" font-family="var(--font-sans)">Player 1</text>
		<rect x="616" y="72" width="72" height="5" rx="2.5" fill="var(--color-border)" />
		<rect x="616" y="72" width="68" height="5" rx="2.5" fill="var(--color-text-secondary)" />

		<text x="556" y="94" fill="var(--color-text-tertiary)" font-size="10" font-family="var(--font-sans)">Player 2</text>
		<rect x="616" y="88" width="72" height="5" rx="2.5" fill="var(--color-border)" />
		<rect x="616" y="88" width="64" height="5" rx="2.5" fill="var(--color-text-secondary)" />

		<text x="556" y="110" fill="var(--color-text-tertiary)" font-size="10" font-family="var(--font-sans)">Player 3</text>
		<rect x="616" y="104" width="72" height="5" rx="2.5" fill="var(--color-border)" />
		<rect x="616" y="104" width="70" height="5" rx="2.5" fill="var(--color-text-secondary)" />

		<!-- Disruption box -->
		<rect x="336" y="152" width="140" height="72" rx="4" stroke="var(--color-border-strong)" stroke-width="1.5" stroke-dasharray="4 3" />
		<text x="406" y="176" text-anchor="middle" fill="var(--color-text-secondary)" font-size="11" font-family="var(--font-sans)">Disruptions</text>
		<text x="406" y="194" text-anchor="middle" fill="var(--color-text-tertiary)" font-size="10" font-family="var(--font-sans)">Late arrival</text>
		<text x="406" y="210" text-anchor="middle" fill="var(--color-text-tertiary)" font-size="10" font-family="var(--font-sans)">Injury</text>

		<!-- Arrow from disruption back to generate -->
		<path d="M336 188 L236 188 L236 104" stroke="var(--color-border-strong)" stroke-width="1" fill="none" marker-end="url(#ep-arrow)" />
		<text x="280" y="184" text-anchor="middle" fill="var(--color-text-tertiary)" font-size="10" font-family="var(--font-sans)">Recalculate</text>

		<!-- Arrow from live game to disruption -->
		<line x1="406" y1="104" x2="406" y2="152" stroke="var(--color-border-strong)" stroke-width="1" marker-end="url(#ep-arrow)" />

		<defs>
			<marker id="ep-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
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
