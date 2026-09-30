function SearchBar({
  city,
  setCity,
  handleSearch
}) {
  return (
    <form
      className="search-bar"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(event) =>
          setCity(event.target.value)
        }
      />

      <button type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;