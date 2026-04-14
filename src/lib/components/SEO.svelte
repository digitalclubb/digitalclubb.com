<script lang="ts">
	import { siteConfig } from '$lib/config';

	interface Props {
		title?: string;
		description?: string;
		path?: string;
		type?: 'website' | 'article';
		publishedTime?: string;
		image?: string;
	}

	let { title, description, path = '', type = 'website', publishedTime, image }: Props = $props();

	const pageTitle = $derived(title ? `${title} – ${siteConfig.title}` : siteConfig.title);
	const pageDescription = $derived(description ?? siteConfig.description);
	const canonicalUrl = $derived(`${siteConfig.url}${path}`);
	const ogImage = $derived(image ? `${siteConfig.url}${image}` : `${siteConfig.url}/og-image.png`);
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
	<meta property="og:image" content={ogImage} />
	{#if publishedTime}
		<meta property="article:published_time" content={publishedTime} />
		<meta property="article:author" content={siteConfig.author.name} />
	{/if}

	<!-- Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>
