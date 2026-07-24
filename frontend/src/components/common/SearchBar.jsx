import { FaSearch, FaTimes } from "react-icons/fa";

const SearchBar = ({
  value = "",
  onChange,
  placeholder = "Search...",
  disabled = false,
}) => {
  return (
    <div className="kr-search-bar">
      <FaSearch className="kr-search-icon" />

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(event) =>
          onChange?.(event.target.value)
        }
      />

      {value && !disabled && (
        <button
          type="button"
          className="kr-search-clear"
          aria-label="Clear search"
          onClick={() => onChange?.("")}
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
};

export default SearchBar;