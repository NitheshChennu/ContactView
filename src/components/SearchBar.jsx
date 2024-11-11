import React from 'react';
import './SearchBar.css';

// SearchBar component that renders an input field for search
const SearchBar = ({ searchTerm, onSearch }) => (
  <div className="searchBar">
    <input
      type="text"
      value={searchTerm}  // The value of the input is controlled by the parent component's searchTerm state
      onChange={(e) => onSearch(e.target.value)}  // When the input value changes, call onSearch to update the search term
      placeholder="Search Contact" 
    />
  </div>
);

export default SearchBar;
