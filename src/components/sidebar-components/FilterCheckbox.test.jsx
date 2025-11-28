import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import Checkbox from "./Checkbox";

test("Checkbox renders and toggles category via updateFilters", () => {
    const label = "Books";
    const filters = { categoryFilter: [] };
    const updateFilters = vi.fn();

    // render the component with the props shape it expects
    render(
        <Checkbox 
            label={label} 
            filters={filters} 
            updateFilters={updateFilters} 
        />
    );

    // get the checkbox by its accessible label
    const checkbox = screen.getByLabelText(/books/i);
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    // click the checkbox -> should call updateFilters('categoryFilter', ['Books'])
    fireEvent.click(input);
    expect(updateFilters).toHaveBeenCalledTimes(1);
    expect(updateFilters).toHaveBeenCalledWith("categoryFilter", [label]);
});