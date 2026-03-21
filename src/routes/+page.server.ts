import { getWorkEntries, getWritingEntries } from '$lib/utils/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const work = await getWorkEntries();
	const writing = await getWritingEntries();

	return {
		work: work.slice(0, 4),
		writing: writing.slice(0, 3)
	};
};
