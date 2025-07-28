import React, { useState } from "react"; // Import useState for local input state
import styles from "./Search.module.css";
import { ReactComponent as SearchIcon } from "../../assets/search-icon.svg";
// Removed: useAutocomplete, styled, truncate, useNavigate, Tooltip
// Removed: @mui/base, @mui/system, @mui/material imports

function Search({ placeholder, searchData }) {
  // We'll manage input value locally for now
  const [inputValue, setInputValue] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Search submitted:", inputValue);
    // In a real app, you'd perform a search based on inputValue here
    // For now, we'll just log it.
    // The navigation logic for /album/:slug is removed as it depends on autocomplete selection
  };

  return (
    <div style={{ position: "relative" }}>
      <form className={styles.wrapper} onSubmit={onSubmit}>
        <div>
          <input
            name="album"
            className={styles.search}
            placeholder={placeholder}
            required
            value={inputValue} // Bind value to state
            onChange={(e) => setInputValue(e.target.value)} // Update state on change
          />
        </div>
        <div>
          <button className={styles.searchButton} type="submit">
            <SearchIcon />
          </button>
        </div>
      </form>
      {/* Autocomplete dropdown removed for simplification */}
    </div>
  );
}

export default Search;
