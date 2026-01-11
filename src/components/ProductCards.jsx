import useProductFilters from "./hooks/useProductFilters";
import useProductSorting  from "./hooks/useProductSorting";
import placeholderImage from "../assets/images/stock.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";

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

  // Pagination state
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0); // Current page index
  useEffect(() => setCurrentPage(0), [searchQuery, sort, priceRange, JSON.stringify(filters), sorted.length]); // Reset to first page on filter/sort change
  const pageCount = Math.ceil(sorted.length / itemsPerPage); // Total number of pages
  const startOffset = currentPage * itemsPerPage; // Calculate starting index
  const currentItems = sorted.slice(startOffset, startOffset + itemsPerPage); // Get items for current page


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
        {currentItems.map((product) => (
        <div
          key={product.id}
          className="flex flex-col justify-between flex-shrink-0 bg-blue-200 hover:bg-blue-300 cursor-pointer p-4 rounded-lg shadow-lg gap-4"
        >
          <div className="rounded-lg overflow-hidden h-48">
            <img
              src={product.imageUrl ? product.imageUrl : placeholderImage}
              alt={`image of ${product.name}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-between w-full gap-3">
            <h3 className="uppercase text-md font-bold tracking-widest">{product.name}</h3>
            <p>${product.price}</p>
            <p className="flex items-center justify-center">
              {Array.from({ length: product.rating }).map((_value, index) => (
                <FontAwesomeIcon key={index} icon={faStar} className="w-4 h-4 text-yellow-400" aria-hidden="true" />
              ))}
            </p>
            <p>Category: {product.category}</p>
            <p className={` font-bold ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </p>
          </div>
        </div>
        ))}
        {pageCount > 1 && (
          <div className="col-span-full w-full flex justify-center my-7">
            <ReactPaginate
              pageCount={pageCount}
              onPageChange={({ selected }) => setCurrentPage(selected)}
              forcePage={currentPage}
              previousLabel={<FontAwesomeIcon icon={faArrowLeft} />}
              nextLabel={<FontAwesomeIcon icon={faArrowRight} />}
              containerClassName="flex gap-2"
              pageClassName="px-3 py-1 rounded-md bg-blue-200 shadow-sm cursor-pointer hover:bg-blue-400"
              activeClassName="bg-blue-300 cursor-pointer"
              previousClassName="px-3 py-1 cursor-pointer"
              nextClassName="px-3 py-1 cursor-pointer"
            />
          </div>
        )}
      </>
    );
  }
}
