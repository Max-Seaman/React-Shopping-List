import { ProductCards } from './ProductCards';
import { Sidebar } from './Sidebar';

export function Main(
  { 
    // Props with default values for if they are not passed in
    searchQuery = "", 
    sort = "",
    priceRange = [0, 1000], setPriceRange = () => {},
    filters = { categoryFilter: [], inStock: false }, updateFilters = () => {},
    products = [], 
    loading = false
  }
) {
  return (
    <div className="flex flex-col sm:flex-row w-full container mx-auto justify-center text-center gap-8 sm:gap-6 p-4">
      {/* Sidebar */}
      <Sidebar 
        filters={filters} updateFilters={updateFilters} 
        priceRange={priceRange} setPriceRange={setPriceRange} 
      />

      {/* Main content area */}
      <div className="flex-1">
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 mx-auto" />
              <p className="mt-4 text-gray-700">Loading products…</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 mt-2 mb-6 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
            <ProductCards 
              products={products}
              searchQuery={searchQuery} 
              sort={sort} 
              priceRange={priceRange} 
              filters={filters} 
            />
          </div>
        )}
      </div>
    </div>
  );
}
