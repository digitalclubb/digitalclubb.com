import { getWritingEntries } from '$lib/utils/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const writing = await getWritingEntries();
	return { writing };
};
