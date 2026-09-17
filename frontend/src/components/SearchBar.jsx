import React from 'react';

function SearchBar({ search, setSearch, category, setCategory, categories = [], sort, setSort }) {
  return (
    <div className="search-bar-container">
      <div className="search-input-group">
        <input
          type="text"
          placeholder="Search products by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="category-select-group">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="category-select"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="sort-select-group">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="category-select"
        >
          <option value="">Sort By: Default</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}

export default SearchBar;
