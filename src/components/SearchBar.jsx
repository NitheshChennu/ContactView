import React from 'react';
import './SearchBar.css';

const SearchBar = ({ searchTerm, onSearch }) => (
  <div className="searchBar">
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
      placeholder="Search Contact"
    />
  </div>
);

export default SearchBar;
