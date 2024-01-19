// src/components/SearchBar.js
import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="mt-4">
      <input type="text" placeholder="Search..." className="border p-2 rounded w-64" />
    </div>
  );
};

export default SearchBar;
