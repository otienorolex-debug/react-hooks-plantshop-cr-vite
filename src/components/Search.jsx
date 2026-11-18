function Search({ value, onSearch }) {
  return (
    <label className="search-field">
      <span className="search-icon" aria-hidden="true">⌕</span>
      <span className="visually-hidden">Search plants by name</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onSearch(event.target.value)}
        placeholder="Type a name to search..."
      />
      {value && (
        <button
          className="clear-search"
          type="button"
          onClick={() => onSearch('')}
          aria-label="Clear search"
        >
          Clear
        </button>
      )}
    </label>
  )
}

export default Search
