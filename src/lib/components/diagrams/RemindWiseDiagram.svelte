<!-- System diagram: RemindWise data flow -->
<figure class="diagram" role="img" aria-label="RemindWise system diagram showing how household members add records via natural language or manual entry, which are stored in a shared household database. The reminder engine checks due dates and sends notifications.">
	<svg viewBox="0 0 720 280" fill="none" xmlns="http://www.w3.org/2000/svg" class="diagram-svg">
		<!-- Member A -->
		<rect x="16" y="40" width="120" height="48" rx="4" stroke="var(--color-border-strong)" stroke-width="1.5" />
		<text x="76" y="68" text-anchor="middle" fill="var(--color-text)" font-size="12" font-family="var(--font-sans)">Member A</text>

		<!-- Member B -->
		<rect x="16" y="120" width="120" height="48" rx="4" stroke="var(--color-border-strong)" stroke-width="1.5" />
		<text x="76" y="148" text-anchor="middle" fill="var(--color-text)" font-size="12" font-family="var(--font-sans)">Member B</text>

		<!-- Input layer -->
		<rect x="200" y="28" width="140" height="40" rx="4" stroke="var(--color-border-strong)" stroke-width="1.5" fill="var(--color-bg-subtle)" />
		<text x="270" y="52" text-anchor="middle" fill="var(--color-text-secondary)" font-size="11" font-family="var(--font-sans)">Manual entry</text>

		<rect x="200" y="84" width="140" height="40" rx="4" stroke="var(--color-border-strong)" stroke-width="1.5" fill="var(--color-bg-subtle)" />
		<text x="270" y="108" text-anchor="middle" fill="var(--color-text-secondary)" font-size="11" font-family="var(--font-sans)">AI capture (NLP)</text>

		<!-- Arrows from members to inputs -->
		<line x1="136" y1="56" x2="200" y2="48" stroke="var(--color-border-strong)" stroke-width="1" />
		<line x1="136" y1="68" x2="200" y2="104" stroke="var(--color-border-strong)" stroke-width="1" />
		<line x1="136" y1="136" x2="200" y2="48" stroke="var(--color-border-strong)" stroke-width="1" />
		<line x1="136" y1="148" x2="200" y2="104" stroke="var(--color-border-strong)" stroke-width="1" />

		<!-- Central store -->
		<rect x="404" y="56" width="160" height="56" rx="4" stroke="var(--color-text)" stroke-width="1.5" />
		<text x="484" y="80" text-anchor="middle" fill="var(--color-text)" font-size="12" font-weight="600" font-family="var(--font-sans)">Household records</text>
		<text x="484" y="98" text-anchor="middle" fill="var(--color-text-tertiary)" font-size="10" font-family="var(--font-sans)">Categories, dates, docs</text>

		<!-- Arrows from inputs to store -->
		<line x1="340" y1="48" x2="404" y2="76" stroke="var(--color-border-strong)" stroke-width="1" marker-end="url(#arrowhead)" />
		<line x1="340" y1="104" x2="404" y2="90" stroke="var(--color-border-strong)" stroke-width="1" marker-end="url(#arrowhead)" />

		<!-- Reminder engine -->
		<rect x="404" y="152" width="160" height="48" rx="4" stroke="var(--color-border-strong)" stroke-width="1.5" fill="var(--color-bg-subtle)" />
		<text x="484" y="180" text-anchor="middle" fill="var(--color-text-secondary)" font-size="11" font-family="var(--font-sans)">Reminder engine</text>

		<!-- Arrow from store to engine -->
		<line x1="484" y1="112" x2="484" y2="152" stroke="var(--color-border-strong)" stroke-width="1" marker-end="url(#arrowhead)" />

		<!-- Dashboard -->
		<rect x="620" y="40" width="84" height="40" rx="4" stroke="var(--color-border-strong)" stroke-width="1.5" />
		<text x="662" y="64" text-anchor="middle" fill="var(--color-text-secondary)" font-size="11" font-family="var(--font-sans)">Dashboard</text>

		<!-- Notifications -->
		<rect x="620" y="152" width="84" height="40" rx="4" stroke="var(--color-border-strong)" stroke-width="1.5" />
		<text x="662" y="176" text-anchor="middle" fill="var(--color-text-secondary)" font-size="11" font-family="var(--font-sans)">Reminders</text>

		<!-- Arrows out -->
		<line x1="564" y1="76" x2="620" y2="60" stroke="var(--color-border-strong)" stroke-width="1" marker-end="url(#arrowhead)" />
		<line x1="564" y1="176" x2="620" y2="172" stroke="var(--color-border-strong)" stroke-width="1" marker-end="url(#arrowhead)" />

		<!-- Arrowhead marker -->
		<defs>
			<marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
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
