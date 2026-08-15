import { Search, X } from "lucide-react";

function SearchBar({ search, setSearch }) {
  return (
    <div className="relative">

      <Search
        size={17}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600"
      />

      <input
        type="text"
        placeholder="Search in your data..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="h-11 w-full rounded-xl border border-zinc-800 bg-zinc-900/70 pl-10 pr-10 text-sm text-zinc-200 outline-none transition-all duration-200 placeholder:text-zinc-600 focus:border-violet-500/50 focus:bg-zinc-900 focus:ring-2 focus:ring-violet-500/10"
      />

      {search && (
        <button
          type="button"
          onClick={() => setSearch("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-zinc-600 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
        >
          <X size={15} />
        </button>
      )}

    </div>
  );
}

export default SearchBar;