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
  const labelClass = `flex items-center justify-center p-2 rounded-lg cursor-pointer transition-colors duration-150 sm:w-full hover:bg-blue-600 hover:text-white ${isChecked ? 'bg-blue-500' : 'bg-blue-300 text-gray-800'}`;
  
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
    <label htmlFor={safeId} className={labelClass}>
      <input
        id={safeId}
        type="checkbox"
        value={label}
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="sr-only"
      />
      <span className="w-full text-center">{label}</span>
    </label>
  );
}