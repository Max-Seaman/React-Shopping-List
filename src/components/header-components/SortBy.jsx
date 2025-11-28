import React from "react";

export default function SortBy({ value = "", onSortChange = () => {} }) {
  return (
    <select
      value={value}
      onChange={(e) => onSortChange(e.target.value)}
      aria-label="Sort products"
      className="w-full p-2 rounded-lg shadow-lg bg-white"
    >
      <option value="">Sort By ...</option>
      <option value="nameAsc">Sort Alphabetically: A → Z</option>
      <option value="nameDesc">Sort Alphabetically: Z → A</option>
      <option value="priceLow">Sort by Price: Low → High</option>
      <option value="priceHigh">Sort by Price: High → Low</option>
      <option value="ratingLow">Sort by Rating: Low → High</option>
      <option value="ratingHigh">Sort by Rating: High → Low</option>
    </select>
  );
}
