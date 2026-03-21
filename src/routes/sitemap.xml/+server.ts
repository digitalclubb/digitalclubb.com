import { siteConfig } from '$lib/config';
import { getWorkEntries, getWritingEntries } from '$lib/utils/content';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const work = await getWorkEntries();
	const writing = await getWritingEntries();

	const staticPages = ['', '/work', '/writing', '/about'];

	const urls = [
		...staticPages.map((path) => ({
			loc: `${siteConfig.url}${path}`,
			priority: path === '' ? '1.0' : '0.8'
		})),
		...work.map((entry) => ({
			loc: `${siteConfig.url}/work/${entry.slug}`,
			priority: '0.7'
		})),
		...writing.map((entry) => ({
			loc: `${siteConfig.url}/writing/${entry.slug}`,
			priority: '0.7',
			lastmod: entry.date
		}))
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	${urls
		.map(
			(url) => `<url>
		<loc>${url.loc}</loc>
		<priority>${url.priority}</priority>
		${'lastmod' in url ? `<lastmod>${url.lastmod}</lastmod>` : ''}
	</url>`
		)
		.join('\n\t')}
</urlset>`;

	return new Response(sitemap.trim(), {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'max-age=3600'
		}
	});
};
