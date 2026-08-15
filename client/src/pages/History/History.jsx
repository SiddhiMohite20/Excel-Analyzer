import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  History as HistoryIcon,
  FileSpreadsheet,
  Eye,
  Trash2,
  Clock3,
} from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";

function History() {
  const [uploads, setUploads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/history"
      );

      setUploads(response.data);
    } catch (error) {
      console.log("History error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/history/${id}`
      );

      fetchHistory();

      alert("Upload deleted successfully!");
    } catch (error) {
      console.log("Delete error:", error);
      alert("Failed to delete upload.");
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-7xl space-y-5">

        {/* Page Header */}
        <section className="rounded-2xl border border-zinc-800 bg-[#151518] px-5 py-5 shadow-lg shadow-black/10 md:px-6 md:py-6">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-400">
              <HistoryIcon size={19} />
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-400">
                Activity
              </p>

              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                Upload History
              </h1>
            </div>
          </div>

          <p className="mt-3 text-sm text-zinc-500">
            View and manage your previously uploaded spreadsheet files.
          </p>

        </section>

        {/* History Table */}
        <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#151518] shadow-lg shadow-black/10">

          {/* Table Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4 md:px-6">
            <div>
              <h2 className="text-base font-semibold text-white">
                Uploaded Files
              </h2>

              <p className="mt-1 text-xs text-zinc-500">
                {uploads.length} file{uploads.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <div className="hidden items-center gap-2 text-xs text-zinc-500 sm:flex">
              <Clock3 size={14} />
              Latest uploads
            </div>
          </div>

          {/* Empty State */}
          {uploads.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-5 py-16 text-center">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 text-zinc-600">
                <FileSpreadsheet size={22} />
              </div>

              <h3 className="mt-4 text-sm font-medium text-zinc-300">
                No upload history
              </h3>

              <p className="mt-1 max-w-sm text-xs text-zinc-600">
                Upload an Excel or CSV file to see it appear here.
              </p>

            </div>
          ) : (
            /* Scrollable Table */
            <div className="overflow-x-auto">

              <table className="w-full min-w-[900px] border-collapse">

                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/60">

                    <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                      File Name
                    </th>

                    <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                      Rows
                    </th>

                    <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                      Columns
                    </th>

                    <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                      Sheets
                    </th>

                    <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                      Uploaded At
                    </th>

                    <th className="px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                      Action
                    </th>

                  </tr>
                </thead>

                <tbody>
                  {uploads.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b border-zinc-800/80 last:border-b-0 transition-colors duration-200 hover:bg-violet-500/[0.03]"
                    >

                      {/* File */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/10 text-violet-400">
                            <FileSpreadsheet size={17} />
                          </div>

                          <div className="min-w-0">
                            <p className="max-w-[240px] truncate text-sm font-medium text-zinc-200">
                              {item.fileName}
                            </p>

                            <p className="mt-0.5 text-[11px] text-zinc-600">
                              Spreadsheet
                            </p>
                          </div>

                        </div>
                      </td>

                      {/* Rows */}
                      <td className="px-5 py-4 text-sm font-medium text-zinc-300">
                        {item.totalRows}
                      </td>

                      {/* Columns */}
                      <td className="px-5 py-4 text-sm text-zinc-400">
                        {item.totalColumns}
                      </td>

                      {/* Sheets */}
                      <td className="px-5 py-4 text-sm text-zinc-400">
                        {item.totalSheets}
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4 text-sm text-zinc-500">
                        {new Date(item.createdAt).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">

                          <button
                            onClick={() =>
                              navigate(`/file/${item._id}`)
                            }
                            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-violet-500/20 bg-violet-500/10 px-3 text-xs font-medium text-violet-300 transition-all duration-200 hover:border-violet-500/40 hover:bg-violet-500/20"
                          >
                            <Eye size={14} />
                            View
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(item._id)
                            }
                            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-3 text-xs font-medium text-red-300 transition-all duration-200 hover:border-red-500/40 hover:bg-red-500/20"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          )}

        </section>

      </div>
    </DashboardLayout>
  );
}

export default History;