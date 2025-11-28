import useProductFilters from "./hooks/useProductFilters";
import useProductSorting  from "./hooks/useProductSorting";
import placeholderImage from "../assets/images/stock.jpg";

export function ProductCards(
  { 
    // Props with default values for if they are not passed in
    products = [], searchQuery = "", 
    sort = "", 
    priceRange = [0, 1000],
    filters = { categoryFilter: [] }
  }
) {
  // Run filters on the provided `products` array
  const inStockFiltered = useProductFilters(products, { searchQuery, priceRange, filters });

  // Apply sorting if specified
  const sorted = useProductSorting(inStockFiltered, sort);


  // Handle no results
  if (!sorted.length) {
    return (
      <div className="col-span-full flex items-center justify-center p-8">
        <div className="text-center">
          <h3 className="text-xl font-semibold">No results</h3>
          <p className="text-sm text-gray-600 mt-1">
            No products match your search{searchQuery ? ` "${searchQuery}"` : ""}.
            Try different keywords, clear the search or filters that may have been applied.
          </p>
        </div>
      </div>
    );
  }

  // Render product cards
  else {
    return (
      <>
        {sorted.map((product) => (
        <div
          key={product.id}
          className="flex flex-shrink-0 bg-gray-200 hover:bg-gray-300 cursor-pointer p-4 rounded-lg shadow-lg gap-4 h-56"
        >
          <div className="rounded-lg overflow-hidden w-72">
            <img
              src={product.imageUrl ? product.imageUrl : placeholderImage}
              alt={`image of ${product.name}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-between w-full gap-1">
            <h3 className="uppercase text-md font-bold tracking-widest">{product.name}</h3>
            <p className="text-sm">${product.price}</p>
            <p className="text-sm">{product.rating} / 5 stars</p>
            <p className="text-sm">Category: {product.category}</p>
            <p className={`text-sm font-bold ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </p>
          </div>
        </div>
        ))}
      </>
    );
  }
}
