import React from "react";

export default function StockCheckbox(
  { 
    // Props with default values for if they are not passed in
    label, 
    filters = {}, updateFilters = () => {} 
  }
) {
  // Create a safe ID by converting label to lowercase and replacing spaces with hyphens
  const safeId = String(label).toLowerCase().replace(/\s+/g, "-");

  // Get current inStock value from filters
  const inStock = filters.inStock;

  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    // store boolean in filters.inStock
    updateFilters("inStock", checked);
  };

  return (
    <label htmlFor={safeId} className="w-full flex items-center bg-blue-200 hover:bg-blue-300 p-2 rounded-lg cursor-pointer">
      <input
        id={safeId}
        type="checkbox"
        value={label}
        checked={inStock}
        className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
        onChange={handleCheckboxChange}
      />
      <span className="w-full text-center pl-2">{label}</span>
    </label>
  );
}