const WORDS_PER_MINUTE = 230;

export function readingTime(content: string): string {
	const words = content.trim().split(/\s+/).length;
	const minutes = Math.ceil(words / WORDS_PER_MINUTE);
	return `${minutes} min read`;
}
