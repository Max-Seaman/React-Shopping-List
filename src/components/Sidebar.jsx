import Range from "./sidebar-components/Range";
import FilterCheckbox from "./sidebar-components/FilterCheckbox";
import StockCheckbox from "./sidebar-components/StockCheckbox";

export function Sidebar(
  { 
    // Props with default values for if they are not passed in
    filters = { categoryFilter: [], inStock: false }, updateFilters = () => {}, 
    priceRange = [0, 1000], setPriceRange = () => {},
  }
) {
  const MIN = 0;
  const MAX = 1000;
  const step = 1;

  function handleRangeChange(values) {
    const [low, high] = values;
    setPriceRange([low, high]);
  }

  return (
    <div className="flex flex-col sm:w-[200px] shrink-0 p-4 mt-2 rounded-lg w-full bg-green-100 self-start shadow-lg">
      <div className="flex flex-col">
        <h3 className="font-semibold mb-2">
          Price Range
        </h3>

        <Range
          min={MIN}
          max={MAX}
          step={step}
          value={priceRange}
          onChange={handleRangeChange}
        />
      </div>

      <div className="w-full flex flex-col gap-2 mt-4 items-center">
        <h2>Categories</h2>
        <div className="w-3/4 sm:w-full flex sm:flex-col gap-2 justify-center flex-wrap">
          <FilterCheckbox 
            label="Books"
            filters={filters} 
            updateFilters={updateFilters}
          />
          <FilterCheckbox 
            label="Electronics"
            filters={filters} 
            updateFilters={updateFilters}
          />
          <FilterCheckbox 
            label="Clothing"
            filters={filters} 
            updateFilters={updateFilters}
          />
          <FilterCheckbox 
            label="Home"
            filters={filters} 
            updateFilters={updateFilters}
          />
          <FilterCheckbox 
            label="Toys"
            filters={filters} 
            updateFilters={updateFilters}
          />
        </div>
        <div className="sm:w-full mt-6">
          <StockCheckbox 
            label="In Stock" 
            filters={filters} 
            updateFilters={updateFilters} 
          />
        </div>
        
        <button
          type="button"
          className="bg-red-200 hover:bg-red-300 p-3 rounded-lg mt-6 sm:w-full"
          onClick={() => {
            // Reset the price range slider
            setPriceRange([MIN, MAX]);

            // Reset category filters to empty array 
            updateFilters('categoryFilter', []);

            // Reset inStock filter to false
            updateFilters('inStock', false);
          }}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
