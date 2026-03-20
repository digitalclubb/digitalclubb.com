import { error } from '@sveltejs/kit';
import { readingTime } from '$lib/utils/reading-time';
import type { PageLoad } from './$types';
import type { WritingMeta } from '$lib/utils/content';
import type { Component } from 'svelte';

type MdModule = {
	default: Component;
	metadata: Omit<WritingMeta, 'slug'>;
};

export const load: PageLoad = async ({ params }) => {
	const modules = import.meta.glob<MdModule>('$content/writing/*.md', { eager: true });
	const rawModules = import.meta.glob('$content/writing/*.md', {
		eager: true,
		query: '?raw',
		import: 'default'
	});

	let resolved: MdModule | undefined;
	let rawContent = '';

	for (const [key, mod] of Object.entries(modules)) {
		if (key.endsWith(`/${params.slug}.md`)) {
			resolved = mod;
			for (const [rawKey, rawMod] of Object.entries(rawModules)) {
				if (rawKey.endsWith(`/${params.slug}.md`)) {
					rawContent = rawMod as string;
					break;
				}
			}
			break;
		}
	}

	if (!resolved) {
		error(404, 'Article not found');
	}

	return {
		content: resolved.default,
		meta: {
			...resolved.metadata,
			slug: params.slug
		},
		readingTime: readingTime(rawContent || '')
	};
};
