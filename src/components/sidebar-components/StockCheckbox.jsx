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

  const labelClass = `w-full flex items-center justify-center p-2 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-blue-600 hover:text-white ${inStock ? 'bg-blue-500' : 'bg-blue-300 text-gray-800'}`;

  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    // store boolean in filters.inStock
    updateFilters("inStock", checked);
  };

  return (
    <label htmlFor={safeId} className={labelClass}>
      <input
        id={safeId}
        type="checkbox"
        value={label}
        checked={inStock}
        onChange={handleCheckboxChange}
        className="sr-only"
      />
      <span className="w-full text-center">{label}</span>
    </label>
  );
}