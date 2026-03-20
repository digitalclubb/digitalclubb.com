import { describe, it, expect } from 'vitest';
import { formatDate, isoDate } from '$lib/utils/date';

describe('formatDate', () => {
	it('formats a date string in en-GB format', () => {
		const result = formatDate('2025-09-15');
		expect(result).toBe('15 September 2025');
	});

	it('handles different date formats', () => {
		const result = formatDate('2024-01-01');
		expect(result).toBe('1 January 2024');
	});
});

describe('isoDate', () => {
	it('returns an ISO date string', () => {
		const result = isoDate('2025-09-15');
		expect(result).toContain('2025-09-15');
		expect(result).toContain('T');
	});
});
