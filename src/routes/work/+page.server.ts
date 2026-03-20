import { getWorkEntries } from '$lib/utils/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const work = await getWorkEntries();
	return { work };
};
