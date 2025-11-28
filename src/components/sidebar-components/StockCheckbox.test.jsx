import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import StockCheckbox from "./StockCheckbox";

test("StockCheckbox renders and toggles inStock via updateFilters", () => {
    const label = "In Stock";
    const filters = { inStock: false };
    const updateFilters = vi.fn();

    // render the component with the props shape it expects
    render(
        <StockCheckbox 
            label={label} 
            filters={filters} 
            updateFilters={updateFilters} 
        />
    );

    const checkbox = screen.getByLabelText(/in stock/i);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    // click -> should call updateFilters('inStock', true)
    fireEvent.click(checkbox);
    expect(updateFilters).toHaveBeenCalledTimes(1);
    expect(updateFilters).toHaveBeenCalledWith("inStock", true);
});
