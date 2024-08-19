import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
    >
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        style={{ padding: "8px", flex: 1, marginRight: "8px" }}
      />
      <button onClick={handleSearch} style={{ padding: "8px" }}>
        Search
      </button>
    </div>
  );
};

export default Search;
