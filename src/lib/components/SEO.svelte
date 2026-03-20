<script lang="ts">
	import { siteConfig } from '$lib/config';

	interface Props {
		title?: string;
		description?: string;
		path?: string;
		type?: 'website' | 'article';
		publishedTime?: string;
	}

	let { title, description, path = '', type = 'website', publishedTime }: Props = $props();

	const pageTitle = $derived(title ? `${title} – ${siteConfig.title}` : siteConfig.title);
	const pageDescription = $derived(description ?? siteConfig.description);
	const canonicalUrl = $derived(`${siteConfig.url}${path}`);
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph -->
	<meta property="og:type" content={type} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:site_name" content={siteConfig.title} />
	{#if publishedTime}
		<meta property="article:published_time" content={publishedTime} />
		<meta property="article:author" content={siteConfig.author.name} />
	{/if}

	<!-- Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
</svelte:head>
