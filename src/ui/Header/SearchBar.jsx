import React from "react";
import "./searchBar.css";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <span className="search-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85zm-5.242 1.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.5" /* Adjust this to make it thicker */
          />
        </svg>
      </span>
      <input type="text" placeholder="What do you want to learn?" />
    </div>
  );
};

export default SearchBar;
