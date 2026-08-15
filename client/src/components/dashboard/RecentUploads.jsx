import { useEffect, useState } from "react";
import axios from "axios";
import {
  FileSpreadsheet,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

function RecentUploads() {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    fetchRecentUploads();
  }, []);

  const fetchRecentUploads = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/history"
      );

      setUploads(response.data.slice(0, 5));
    } catch (error) {
      console.error("Recent uploads error:", error);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Recent Uploads
          </h2>

          <p className="mt-1 text-xs text-zinc-500">
            Your latest spreadsheet activity
          </p>
        </div>

        <a
          href="/history"
          className="inline-flex items-center gap-1 text-sm font-medium text-red-400 transition-colors duration-200 hover:text-red-300"
        >
          View all
          <ArrowUpRight size={15} />
        </a>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-zinc-800">
        <table className="w-full min-w-[650px]">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/70">

              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                File
              </th>

              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                Rows
              </th>

              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                Date
              </th>

              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                Status
              </th>

            </tr>
          </thead>

          <tbody>
            {uploads.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="px-4 py-10 text-center text-sm text-zinc-500"
                >
                  No uploads found
                </td>
              </tr>
            ) : (
              uploads.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-zinc-800 last:border-0 transition-colors duration-200 hover:bg-red-950/10"
                >

                  {/* File */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-900/30 bg-red-950/50 text-red-400">
                        <FileSpreadsheet size={18} />
                      </div>

                      <div className="min-w-0">
                        <p className="max-w-[260px] truncate text-sm font-medium text-zinc-200">
                          {item.fileName}
                        </p>

                        <p className="mt-0.5 text-[11px] text-zinc-600">
                          Spreadsheet
                        </p>
                      </div>

                    </div>
                  </td>

                  {/* Rows */}
                  <td className="px-4 py-4 text-sm font-medium text-zinc-300">
                    {item.totalRows}
                  </td>

                  {/* Date */}
                  <td className="px-4 py-4 text-sm text-zinc-500">
                    {new Date(item.createdAt).toLocaleDateString("en-GB")}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-red-900/30 bg-red-950/40 px-2.5 py-1 text-[11px] font-semibold text-red-400">
                      <CheckCircle2 size={13} />
                      Success
                    </span>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentUploads;