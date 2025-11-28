export function useProductFilters(products, { searchQuery, priceRange, filters }) { 
  const query = String(searchQuery || "").trim().toLowerCase();
  const list = query
    ? products.filter((product) => product.name.toLowerCase().includes(query)) // Filter by search query
    : products; // No search query, use full list

  // Filter by price range
  const priceFiltered = list.filter((product) => {
    const price = Number(product.price) || 0; // Ensure price is a number
    return price >= Number(priceRange[0]) && price <= Number(priceRange[1]); // Within range specified
  });

  // Apply category filters if any selected
  const categoryFiltered = (() => {
    const categories = filters.categoryFilter || []; // Get selected categories
    if (!categories.length) return priceFiltered; // No categories selected, return all
    return priceFiltered.filter((product) => categories.includes(product.category)); // Filter by selected categories 
  })();

  // Apply in-stock filter if requested
  const inStockFiltered = (() => {
    const onlyInStock = filters.inStock;
    if (!onlyInStock) return categoryFiltered;
    return categoryFiltered.filter((product) => product.inStock);
  })();

  return inStockFiltered;
}

export default useProductFilters;
