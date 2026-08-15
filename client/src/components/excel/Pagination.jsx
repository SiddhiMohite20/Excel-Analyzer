import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  const pages = Math.max(totalPages, 1);

  return (
    <div className="flex items-center justify-center gap-3">

      <button
        onClick={() =>
          setCurrentPage(Math.max(1, currentPage - 1))
        }
        disabled={currentPage === 1}
        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-zinc-800 bg-[#151518] px-3 text-xs font-medium text-zinc-400 transition-all duration-200 hover:border-violet-500/30 hover:text-violet-300 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={15} />
        Previous
      </button>

      <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-xs font-medium text-zinc-300">
        Page {currentPage} of {pages}
      </div>

      <button
        onClick={() =>
          setCurrentPage(
            Math.min(pages, currentPage + 1)
          )
        }
        disabled={
          currentPage === totalPages ||
          totalPages === 0
        }
        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-violet-500/20 bg-violet-500/10 px-3 text-xs font-medium text-violet-300 transition-all duration-200 hover:border-violet-500/40 hover:bg-violet-500/20 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
        <ChevronRight size={15} />
      </button>

    </div>
  );
}

export default Pagination;