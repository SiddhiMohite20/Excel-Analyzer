import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

function ExcelTable({ filteredData, handleSort }) {
  if (filteredData.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-[#151518] px-6 py-12 text-center">
        <p className="text-sm text-zinc-500">
          No matching records found.
        </p>
      </div>
    );
  }

  const columns = Object.keys(filteredData[0]);

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#151518] shadow-lg shadow-black/10">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-white">
            Excel Data
          </h2>

          <p className="mt-1 text-xs text-zinc-500">
            {filteredData.length} records on this page
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] border-collapse">

          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/60">

              {columns.map((key) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="cursor-pointer whitespace-nowrap px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-zinc-500 transition-colors duration-200 hover:bg-violet-500/5 hover:text-violet-400"
                >
                  <div className="flex items-center gap-2">
                    <span>{key}</span>
                    <ArrowUpDown size={13} />
                  </div>
                </th>
              ))}

            </tr>
          </thead>

          <tbody>
            {filteredData.map((row, index) => (
              <tr
                key={index}
                className="border-b border-zinc-800/80 last:border-b-0 transition-colors duration-200 hover:bg-violet-500/[0.03]"
              >

                {columns.map((column, i) => (
                  <td
                    key={i}
                    className="max-w-[240px] whitespace-nowrap px-4 py-3 text-sm text-zinc-300"
                  >
                    {row[column]?.toString() || "—"}
                  </td>
                ))}

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Small footer */}
      <div className="border-t border-zinc-800 px-5 py-3">
        <p className="text-[11px] text-zinc-600">
          Click a column header to sort
        </p>
      </div>

    </div>
  );
}

export default ExcelTable;