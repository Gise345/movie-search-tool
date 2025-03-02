import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-100">
      <div className="input-group input-group-lg shadow-sm">
        <span className="input-group-text bg-white border-end-0">
          <FaSearch className="text-muted" />
        </span>
        <input
          type="text"
          className="form-control border-start-0"
          placeholder="Enter movie title (e.g., Inception, Avengers, Star Wars)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search movies"
        />
        <button
          type="submit"
          className="btn btn-primary px-4"
          disabled={isLoading}
        >
          {isLoading ? (
            <span>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Searching...
            </span>
          ) : (
            'Search'
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;