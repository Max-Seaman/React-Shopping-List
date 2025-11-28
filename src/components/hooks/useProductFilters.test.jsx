import { describe, test, expect } from 'vitest';
import { useProductFilters } from './useProductFilters';

const LIST = [
	{ id: 1, name: 'Apple', price: 10.99, category: 'Food', inStock: true },
	{ id: 2, name: 'Banana', price: 2.99, category: 'Food', inStock: false },
	{ id: 3, name: 'Book', price: 15.99, category: 'Books', inStock: true },
];

describe('useProductFilters', () => {
	test('filters by searchQuery (case-insensitive, partial)', () => {
		const result = useProductFilters(LIST, { searchQuery: 'ap' });
		expect(result.map((product) => product.id)).toEqual([1]); // Only Apple matches 'ap'
	});

	test('filters by priceRange', () => {
		const result = useProductFilters(LIST, { priceRange: [0, 10] });
		expect(result.map((product) => product.id)).toEqual([2]); // Only Banana is within price range 0-10
	});

	test('filters by categoryFilter', () => {
		const result = useProductFilters(LIST, { filters: { categoryFilter: ['Books'] } });
		expect(result.map((product) => product.id)).toEqual([3]); // Only Book is in 'Books' category
	});

	test('filters by inStock', () => {
		const result = useProductFilters(LIST, { filters: { inStock: true } });
		expect(result.map((product) => product.id)).toEqual([1, 3]); // Apple and Book are in stock
	});

    test('applies multiple filters together', () => {
		const result = useProductFilters(LIST, { searchQuery: 'a', priceRange: [0, 10], filters: { categoryFilter: ['Food'], inStock: true } });
		expect(result.map((product) => product.id)).toEqual([1]); // Only Apple matches all criteria
	});

    test('returns all products if no filters applied', () => {
        const result = useProductFilters(LIST, {});
        expect(result).toEqual(LIST); // All products returned
    });
});