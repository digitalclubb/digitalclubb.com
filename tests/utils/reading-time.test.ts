import { describe, it, expect } from 'vitest';
import { readingTime } from '$lib/utils/reading-time';

describe('readingTime', () => {
	it('returns 1 min read for short content', () => {
		const content = 'This is a short article with only a few words.';
		expect(readingTime(content)).toBe('1 min read');
	});

	it('calculates correctly for longer content', () => {
		// 460 words = 2 min at 230 wpm
		const words = Array(460).fill('word').join(' ');
		expect(readingTime(words)).toBe('2 min read');
	});

	it('rounds up partial minutes', () => {
		// 250 words = just over 1 min at 230 wpm, should round to 2
		const words = Array(250).fill('word').join(' ');
		expect(readingTime(words)).toBe('2 min read');
	});

	it('handles empty content', () => {
		expect(readingTime('')).toBe('1 min read');
	});
});
