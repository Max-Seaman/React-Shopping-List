import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import { Sidebar } from './Sidebar';

test('Reset Filters button calls expected update functions', () => {
    const updateFilters = vi.fn();
    const setPriceRange = vi.fn();
    const setSort = vi.fn();

    // Provide non-default values so Reset has something to clear
    const filters = { categoryFilter: ['Books'], inStock: true };
    const priceRange = [10, 530];

    render(
        <Sidebar
            filters={filters}
            updateFilters={updateFilters}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            setSort={setSort}
        />
    );

    const resetButton = screen.getByText(/reset filters/i);
    expect(resetButton).toBeInTheDocument();

    fireEvent.click(resetButton);

    // Reset should set price range back to [MIN, MAX]
    expect(setPriceRange).toHaveBeenCalledTimes(1);
    expect(setPriceRange).toHaveBeenCalledWith([0, 1000]);

    // Reset should clear category filters and set inStock to false
    expect(updateFilters).toHaveBeenCalledWith('categoryFilter', []);
    expect(updateFilters).toHaveBeenCalledWith('inStock', false);

    // Reset should clear sort
    expect(setSort).toHaveBeenCalledWith('');
});

test('Clicking a category checkbox calls updateFilters with the new category array', () => {
    const updateFilters = vi.fn();
    const filters = { categoryFilter: [] };

    render(
        <Sidebar
            filters={filters}
            updateFilters={updateFilters}
            priceRange={[0, 1000]}
            setPriceRange={() => {}}
            setSort={() => {}}
        />
    );

    const booksCheckbox = screen.getByLabelText(/books/i);
    expect(booksCheckbox).toBeInTheDocument();
    expect(booksCheckbox).not.toBeChecked();

    fireEvent.click(booksCheckbox);

    // Expect the component to call updateFilters adding the label
    expect(updateFilters).toHaveBeenCalledTimes(1);
    expect(updateFilters).toHaveBeenCalledWith('categoryFilter', ['Books']);
});
