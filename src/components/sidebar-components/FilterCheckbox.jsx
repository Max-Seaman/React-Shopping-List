import React from "react";

export default function FilterCheckbox(
  { 
    label, 
    filters, updateFilters 
  }
) {
  const safeId = String(label).toLowerCase().replace(/\s+/g, "-");

  const categoryFilter = filters.categoryFilter;

  const isChecked = categoryFilter.indexOf(label) !== -1;
  
  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;

    let next;
    if (checked) {
      // add if missing
      if (categoryFilter.indexOf(label) === -1) {
        next = categoryFilter.concat([label]);
      } else {
        next = categoryFilter.slice();
      }
    } else {
      // remove
      next = categoryFilter.filter(function (item) { return item !== label; });
    }

    updateFilters("categoryFilter", next);
  };

  return (
    <label htmlFor={safeId} className="flex items-center bg-blue-200 hover:bg-blue-300 p-2 rounded-lg cursor-pointer">
      <input
        id={safeId}
        type="checkbox"
        value={label}
        checked={isChecked}
        className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
        onChange={handleCheckboxChange}
      />
      <span className="w-full text-center pl-2">{label}</span>
    </label>
  );
}