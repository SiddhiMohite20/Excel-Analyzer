function SearchBar({ search, setSearch }) {
  return (
    <div className="mt-8 mb-4">
      <input
        type="text"
        placeholder="🔍 Search data..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default SearchBar;