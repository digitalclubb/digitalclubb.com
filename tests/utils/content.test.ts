import { describe, it, expect } from 'vitest';
import { readingTime } from '$lib/utils/reading-time';

describe('content utilities', () => {
	it('readingTime returns a string with min read suffix', () => {
		const result = readingTime('word '.repeat(500));
		expect(result).toMatch(/^\d+ min read$/);
	});
});
