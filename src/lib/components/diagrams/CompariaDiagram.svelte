<!-- Concept diagram: Comparia three-step decision flow -->
<figure class="diagram" role="img" aria-label="Comparia decision flow showing three steps: describe your decision, set priorities by importance level, then receive a scored comparison with transparent reasoning.">
	<svg viewBox="0 0 720 220" fill="none" xmlns="http://www.w3.org/2000/svg" class="diagram-svg">
		<!-- Step 1 -->
		<rect x="16" y="32" width="200" height="80" rx="4" stroke="var(--color-border-strong)" stroke-width="1.5" />
		<text x="36" y="56" fill="var(--color-text-tertiary)" font-size="10" font-weight="600" font-family="var(--font-sans)">STEP 1</text>
		<text x="36" y="76" fill="var(--color-text)" font-size="12" font-weight="600" font-family="var(--font-sans)">Describe your decision</text>
		<text x="36" y="96" fill="var(--color-text-tertiary)" font-size="11" font-family="var(--font-sans)">"Best TV under £1,500"</text>

		<!-- Arrow 1 -->
		<line x1="216" y1="72" x2="260" y2="72" stroke="var(--color-border-strong)" stroke-width="1" marker-end="url(#comp-arrow)" />

		<!-- Step 2 -->
		<rect x="260" y="32" width="200" height="80" rx="4" stroke="var(--color-border-strong)" stroke-width="1.5" />
		<text x="280" y="56" fill="var(--color-text-tertiary)" font-size="10" font-weight="600" font-family="var(--font-sans)">STEP 2</text>
		<text x="280" y="76" fill="var(--color-text)" font-size="12" font-weight="600" font-family="var(--font-sans)">Set priorities</text>

		<!-- Priority indicators -->
		<rect x="280" y="86" width="8" height="8" rx="2" fill="var(--color-text)" />
		<text x="294" y="94" fill="var(--color-text-secondary)" font-size="10" font-family="var(--font-sans)">Very important</text>
		<rect x="380" y="86" width="8" height="8" rx="2" fill="var(--color-text-secondary)" />
		<text x="394" y="94" fill="var(--color-text-secondary)" font-size="10" font-family="var(--font-sans)">Important</text>

		<!-- Arrow 2 -->
		<line x1="460" y1="72" x2="504" y2="72" stroke="var(--color-border-strong)" stroke-width="1" marker-end="url(#comp-arrow)" />

		<!-- Step 3 -->
		<rect x="504" y="32" width="200" height="80" rx="4" stroke="var(--color-text)" stroke-width="1.5" />
		<text x="524" y="56" fill="var(--color-text-tertiary)" font-size="10" font-weight="600" font-family="var(--font-sans)">STEP 3</text>
		<text x="524" y="76" fill="var(--color-text)" font-size="12" font-weight="600" font-family="var(--font-sans)">Scored comparison</text>
		<text x="524" y="96" fill="var(--color-text-tertiary)" font-size="11" font-family="var(--font-sans)">Transparent reasoning</text>

		<!-- Example output: mini comparison table -->
		<rect x="40" y="144" width="640" height="56" rx="4" stroke="var(--color-border)" stroke-width="1" fill="var(--color-bg-subtle)" />
		<text x="60" y="168" fill="var(--color-text-secondary)" font-size="11" font-family="var(--font-sans)">Option A</text>
		<rect x="160" y="160" width="80" height="6" rx="3" fill="var(--color-border-strong)" />
		<rect x="160" y="160" width="68" height="6" rx="3" fill="var(--color-text-secondary)" />
		<text x="250" y="168" fill="var(--color-text-tertiary)" font-size="10" font-family="var(--font-sans)">8.5</text>

		<text x="300" y="168" fill="var(--color-text-secondary)" font-size="11" font-family="var(--font-sans)">Option B</text>
		<rect x="400" y="160" width="80" height="6" rx="3" fill="var(--color-border-strong)" />
		<rect x="400" y="160" width="76" height="6" rx="3" fill="var(--color-text)" />
		<text x="490" y="168" fill="var(--color-text-tertiary)" font-size="10" font-family="var(--font-sans)">9.2</text>

		<text x="540" y="168" fill="var(--color-text-secondary)" font-size="11" font-family="var(--font-sans)">Option C</text>
		<rect x="640" y="160" width="28" height="6" rx="3" fill="var(--color-border-strong)" />
		<rect x="640" y="160" width="20" height="6" rx="3" fill="var(--color-text-secondary)" />
		<text x="678" y="168" fill="var(--color-text-tertiary)" font-size="10" font-family="var(--font-sans)">7.1</text>

		<text x="360" y="192" text-anchor="middle" fill="var(--color-text-tertiary)" font-size="10" font-family="var(--font-sans)">Weighted scores with per-criteria breakdown</text>

		<defs>
			<marker id="comp-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
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
