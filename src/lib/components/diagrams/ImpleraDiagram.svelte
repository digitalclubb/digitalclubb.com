<!-- System diagram: Implera two-layer quality analysis pipeline -->
<figure class="diagram" role="img" aria-label="Implera quality analysis pipeline: a GitHub repository connects via read-only access, a deterministic layer runs 21 static checks, then 7 AI domain reviewers score security, testing, architecture, performance, dependencies, accessibility and documentation, producing a single quality score from 0 to 100.">
	<svg viewBox="0 0 720 228" fill="none" xmlns="http://www.w3.org/2000/svg" class="diagram-svg">
		<!-- Two-layer analysis label -->
		<rect x="150" y="14" width="320" height="26" rx="3" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="4 3" />
		<text x="310" y="31" text-anchor="middle" fill="var(--color-text-tertiary)" font-size="10" font-family="var(--font-sans)">Two-layer analysis</text>

		<!-- GitHub Repo -->
		<rect x="16" y="56" width="108" height="52" rx="4" stroke="var(--color-text)" stroke-width="1.5" />
		<text x="70" y="78" text-anchor="middle" fill="var(--color-text)" font-size="12" font-weight="600" font-family="var(--font-sans)">GitHub Repo</text>
		<text x="70" y="96" text-anchor="middle" fill="var(--color-text-tertiary)" font-size="10" font-family="var(--font-sans)">read-only</text>

		<!-- Arrow -->
		<line x1="124" y1="82" x2="160" y2="82" stroke="var(--color-border-strong)" stroke-width="1" marker-end="url(#impl-arrow)" />

		<!-- Deterministic Layer -->
		<rect x="160" y="56" width="140" height="52" rx="4" stroke="var(--color-border-strong)" stroke-width="1.5" fill="var(--color-bg-subtle)" />
		<text x="230" y="78" text-anchor="middle" fill="var(--color-text-secondary)" font-size="12" font-family="var(--font-sans)">Deterministic Layer</text>
		<text x="230" y="96" text-anchor="middle" fill="var(--color-text-tertiary)" font-size="10" font-family="var(--font-sans)">21 analysis steps</text>

		<!-- Arrow -->
		<line x1="300" y1="82" x2="336" y2="82" stroke="var(--color-border-strong)" stroke-width="1" marker-end="url(#impl-arrow)" />

		<!-- AI Reviewers -->
		<rect x="336" y="56" width="130" height="52" rx="4" stroke="var(--color-border-strong)" stroke-width="1.5" fill="var(--color-bg-subtle)" />
		<text x="401" y="78" text-anchor="middle" fill="var(--color-text-secondary)" font-size="12" font-family="var(--font-sans)">AI Reviewers</text>
		<text x="401" y="96" text-anchor="middle" fill="var(--color-text-tertiary)" font-size="10" font-family="var(--font-sans)">7 domain specialists</text>

		<!-- Arrow -->
		<line x1="466" y1="82" x2="502" y2="82" stroke="var(--color-border-strong)" stroke-width="1" marker-end="url(#impl-arrow)" />

		<!-- Quality Score -->
		<rect x="502" y="56" width="140" height="52" rx="4" stroke="var(--color-text)" stroke-width="1.5" />
		<text x="572" y="78" text-anchor="middle" fill="var(--color-text)" font-size="12" font-weight="600" font-family="var(--font-sans)">Quality Score</text>
		<text x="572" y="96" text-anchor="middle" fill="var(--color-text-tertiary)" font-size="10" font-family="var(--font-sans)">0–100, tracks over time</text>

		<!-- Connector to domains -->
		<text x="360" y="134" text-anchor="middle" fill="var(--color-text-tertiary)" font-size="10" font-family="var(--font-sans)">Seven quality domains</text>

		<!-- Domain boxes -->
		<rect x="31" y="148" width="88" height="34" rx="3" stroke="var(--color-border)" stroke-width="1" fill="var(--color-bg-subtle)" />
		<text x="75" y="163" text-anchor="middle" fill="var(--color-text-secondary)" font-size="10" font-weight="500" font-family="var(--font-sans)">Security</text>
		<text x="75" y="176" text-anchor="middle" fill="var(--color-text-tertiary)" font-size="9" font-family="var(--font-sans)">20%</text>

		<rect x="126" y="148" width="88" height="34" rx="3" stroke="var(--color-border)" stroke-width="1" fill="var(--color-bg-subtle)" />
		<text x="170" y="163" text-anchor="middle" fill="var(--color-text-secondary)" font-size="10" font-weight="500" font-family="var(--font-sans)">Testing</text>
		<text x="170" y="176" text-anchor="middle" fill="var(--color-text-tertiary)" font-size="9" font-family="var(--font-sans)">20%</text>

		<rect x="221" y="148" width="88" height="34" rx="3" stroke="var(--color-border)" stroke-width="1" fill="var(--color-bg-subtle)" />
		<text x="265" y="163" text-anchor="middle" fill="var(--color-text-secondary)" font-size="10" font-weight="500" font-family="var(--font-sans)">Architecture</text>
		<text x="265" y="176" text-anchor="middle" fill="var(--color-text-tertiary)" font-size="9" font-family="var(--font-sans)">20%</text>

		<rect x="316" y="148" width="88" height="34" rx="3" stroke="var(--color-border)" stroke-width="1" fill="var(--color-bg-subtle)" />
		<text x="360" y="163" text-anchor="middle" fill="var(--color-text-secondary)" font-size="10" font-weight="500" font-family="var(--font-sans)">Performance</text>
		<text x="360" y="176" text-anchor="middle" fill="var(--color-text-tertiary)" font-size="9" font-family="var(--font-sans)">10%</text>

		<rect x="411" y="148" width="88" height="34" rx="3" stroke="var(--color-border)" stroke-width="1" fill="var(--color-bg-subtle)" />
		<text x="455" y="163" text-anchor="middle" fill="var(--color-text-secondary)" font-size="10" font-weight="500" font-family="var(--font-sans)">Dependencies</text>
		<text x="455" y="176" text-anchor="middle" fill="var(--color-text-tertiary)" font-size="9" font-family="var(--font-sans)">10%</text>

		<rect x="506" y="148" width="88" height="34" rx="3" stroke="var(--color-border)" stroke-width="1" fill="var(--color-bg-subtle)" />
		<text x="550" y="163" text-anchor="middle" fill="var(--color-text-secondary)" font-size="10" font-weight="500" font-family="var(--font-sans)">Accessibility</text>
		<text x="550" y="176" text-anchor="middle" fill="var(--color-text-tertiary)" font-size="9" font-family="var(--font-sans)">10%</text>

		<rect x="601" y="148" width="88" height="34" rx="3" stroke="var(--color-border)" stroke-width="1" fill="var(--color-bg-subtle)" />
		<text x="645" y="163" text-anchor="middle" fill="var(--color-text-secondary)" font-size="10" font-weight="500" font-family="var(--font-sans)">Docs</text>
		<text x="645" y="176" text-anchor="middle" fill="var(--color-text-tertiary)" font-size="9" font-family="var(--font-sans)">10%</text>

		<!-- PR quality gates annotation -->
		<path d="M572 108 L572 210 L360 210" stroke="var(--color-border-strong)" stroke-width="1" fill="none" stroke-dasharray="4 3" marker-end="url(#impl-arrow)" />
		<text x="480" y="222" text-anchor="middle" fill="var(--color-text-tertiary)" font-size="10" font-family="var(--font-sans)">PR quality gates</text>

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
