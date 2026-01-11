import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export function Search({ value = "", onSearch }) {
  const [input, setInput] = useState(value);
  const [loading, setLoading] = useState(false);
  const timer = useRef(null);

  const handleReset = () => {
    // clear local input
    setInput("");
    // cancel pending debounce
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    // stop loading
    setLoading(false);
    // notify parent immediately
    if (onSearch) {
      onSearch("");
    }
  };

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
    <div className="relative w-full flex items-center gap-2">
      <input
        type="text"
        placeholder="Search..."
        value={input}
        onChange={handleChange}
        className="w-full py-2 px-3 rounded-lg focus:outline-none shadow-lg bg-[#edf5ff]"
      />

      {loading && (
        <div className="absolute right-24 top-1/2 -translate-y-1/2">
          <div className="w-7 h-7 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      <button
        type="button"
        aria-label="Reset"
        onClick={handleReset}
        className="px-3 py-2 bg-red-200 rounded-lg hover:bg-red-300 shadow-lg"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
}

export default Search;
