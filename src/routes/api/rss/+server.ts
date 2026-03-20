import { siteConfig } from '$lib/config';
import { getWritingEntries } from '$lib/utils/content';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const entries = await getWritingEntries();

	const items = entries
		.map(
			(entry) => `
		<item>
			<title>${escapeXml(entry.title)}</title>
			<link>${siteConfig.url}/writing/${entry.slug}</link>
			<guid isPermaLink="true">${siteConfig.url}/writing/${entry.slug}</guid>
			<description>${escapeXml(entry.summary)}</description>
			<pubDate>${new Date(entry.date).toUTCString()}</pubDate>
		</item>`
		)
		.join('');

	const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${escapeXml(siteConfig.title)}</title>
		<link>${siteConfig.url}</link>
		<description>${escapeXml(siteConfig.description)}</description>
		<language>en-gb</language>
		<atom:link href="${siteConfig.url}/api/rss" rel="self" type="application/rss+xml" />
		${items}
	</channel>
</rss>`;

	return new Response(feed.trim(), {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
			'Cache-Control': 'max-age=3600'
		}
	});
};

function escapeXml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}
