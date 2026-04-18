export interface WorkMeta {
	title: string;
	company: string;
	role: string;
	period: string;
	summary: string;
	slug: string;
	order: number;
	published: boolean;
	url?: string;
}

export interface WritingMeta {
	title: string;
	date: string;
	summary: string;
	slug: string;
	published: boolean;
	tags?: string[];
	readingTime: string;
}

type MdModule = {
	default: unknown;
	metadata: Record<string, unknown>;
};

export async function getWorkEntries(): Promise<WorkMeta[]> {
	const modules = import.meta.glob<MdModule>('$content/work/*.md', { eager: true });
	const entries: WorkMeta[] = [];

	for (const [path, module] of Object.entries(modules)) {
		const slug = path.split('/').pop()?.replace('.md', '') ?? '';
		const meta = module.metadata as Omit<WorkMeta, 'slug'>;

		if (meta.published !== false) {
			entries.push({ ...meta, slug });
		}
	}

	return entries.sort((a, b) => a.order - b.order);
}

export async function getWritingEntries(): Promise<WritingMeta[]> {
	const modules = import.meta.glob<MdModule>('$content/writing/*.md', { eager: true });
	const rawModules = import.meta.glob('$content/writing/*.md', {
		eager: true,
		query: '?raw',
		import: 'default'
	});
	const { readingTime } = await import('./reading-time');
	const entries: WritingMeta[] = [];

	for (const [path, module] of Object.entries(modules)) {
		const slug = path.split('/').pop()?.replace('.md', '') ?? '';
		const meta = module.metadata as Omit<WritingMeta, 'slug' | 'readingTime'>;
		const raw = (rawModules[path] as string | undefined) ?? '';

		if (meta.published !== false) {
			entries.push({ ...meta, slug, readingTime: readingTime(raw) });
		}
	}

	return entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
