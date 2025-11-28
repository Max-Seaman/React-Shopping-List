import { describe, test, expect } from 'vitest';
import { useProductSorting } from './useProductSorting';

const LIST = [
	{ id: 1, name: 'Banana', price: 2.99, rating: 4.2 },
	{ id: 2, name: 'Apple', price: 10.99, rating: 4.8 },
	{ id: 3, name: 'Carrot', price: 1.99, rating: 3.9 },
];

describe('useProductSorting', () => {
	test('sorts by name ascending', () => {
		const result = useProductSorting(LIST, 'nameAsc');
		expect(result.map((product) => product.id)).toEqual([2, 1, 3]); // Apple, Banana, Carrot
	});

    test('sorts by name descending', () => {
		const result = useProductSorting(LIST, 'nameDesc');
		expect(result.map((product) => product.id)).toEqual([3, 1, 2]); // Carrot, Banana, Apple
	});

    test('sorts by price ascending (priceLow)', () => {
		const result = useProductSorting(LIST, 'priceLow');
		expect(result.map((product) => product.id)).toEqual([3, 1, 2]); // 1.99, 2.99, 10.99
	});

	test('sorts by price descending (priceHigh)', () => {
		const result = useProductSorting(LIST, 'priceHigh');
		expect(result.map((product) => product.id)).toEqual([2, 1, 3]); // 10.99, 2.99, 1.99
	});

	test('sorts by rating ascending (ratingLow)', () => {
		const result = useProductSorting(LIST, 'ratingLow');
		expect(result.map((product) => product.id)).toEqual([3, 1, 2]); // 3.9, 4.2, 4.8
	});

    test('sorts by rating descending (ratingHigh)', () => {
		const result = useProductSorting(LIST, 'ratingHigh');
		expect(result.map((product) => product.id)).toEqual([2, 1, 3]); // 4.8, 4.2, 3.9
	});

    test('returns original list if sort is unrecognized', () => {
		const result = useProductSorting(LIST, '');
		expect(result).toEqual(LIST); // Original order
	});
});