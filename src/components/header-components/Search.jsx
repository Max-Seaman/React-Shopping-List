import { useRef, useState } from "react";

export function Search({ value = "", onSearch }) {
  const [input, setInput] = useState(value);
  const [loading, setLoading] = useState(false);
  const timer = useRef(null);

  const handleChange = (e) => {
    const nextValue = e.target.value;
    setInput(nextValue);

    // Start Loading
    setLoading(true);

    // Cancel previous timer
    if (timer.current) {
      clearTimeout(timer.current);
    }

    // Start a new timer
    timer.current = setTimeout(() => {
      if (onSearch) {
        onSearch(nextValue);
      }
      // done loading so set loading to false
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search..."
        value={input}
        onChange={handleChange}
        className="w-full py-2 px-3 pr-10 rounded-lg focus:outline-none shadow-lg bg-white"
      />

      {loading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="w-7 h-7 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}

export default Search;
