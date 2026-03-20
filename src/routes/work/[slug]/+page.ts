import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { WorkMeta } from '$lib/utils/content';
import type { Component } from 'svelte';

type MdModule = {
	default: Component;
	metadata: Omit<WorkMeta, 'slug'>;
};

export const load: PageLoad = async ({ params }) => {
	const modules = import.meta.glob<MdModule>('$content/work/*.md', { eager: true });

	let resolved: MdModule | undefined;
	for (const [key, mod] of Object.entries(modules)) {
		if (key.endsWith(`/${params.slug}.md`)) {
			resolved = mod;
			break;
		}
	}

	if (!resolved) {
		error(404, 'Case study not found');
	}

	return {
		content: resolved.default,
		meta: {
			...resolved.metadata,
			slug: params.slug
		}
	};
};
