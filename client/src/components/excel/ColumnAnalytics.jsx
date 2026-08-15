import { useContext, useState } from "react";
import {
  Calculator,
  Hash,
  TrendingUp,
  TrendingDown,
  BarChart3,
} from "lucide-react";

import { ExcelContext } from "../../context/ExcelContext";

function ColumnAnalytics() {
  const { excelData } = useContext(ExcelContext);

  const numericColumns =
    excelData.length > 0
      ? Object.keys(excelData[0]).filter((key) =>
          excelData.some(
            (row) =>
              row[key] !== "" &&
              row[key] !== null &&
              !isNaN(Number(row[key]))
          )
        )
      : [];

  const [selectedColumn, setSelectedColumn] = useState("");

  if (excelData.length === 0) {
    return null;
  }

  let values = [];

  if (selectedColumn) {
    values = excelData
      .map((row) => Number(row[selectedColumn]))
      .filter((value) => !isNaN(value));
  }

  const total = values.reduce(
    (sum, value) => sum + value,
    0
  );

  const average =
    values.length > 0
      ? (total / values.length).toFixed(2)
      : "0";

  const maximum =
    values.length > 0
      ? Math.max(...values)
      : 0;

  const minimum =
    values.length > 0
      ? Math.min(...values)
      : 0;

  const stats = [
    {
      label: "Total",
      value: total,
      icon: Calculator,
      color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    },
    {
      label: "Average",
      value: average,
      icon: BarChart3,
      color: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    },
    {
      label: "Maximum",
      value: maximum,
      icon: TrendingUp,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: "Minimum",
      value: minimum,
      icon: TrendingDown,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      label: "Count",
      value: values.length,
      icon: Hash,
      color: "text-pink-400 bg-pink-500/10 border-pink-500/20",
    },
  ];

  return (
    <section className="rounded-2xl border border-zinc-800 bg-[#151518] p-5 shadow-lg shadow-black/10">

      <div className="mb-5">
        <h2 className="text-base font-semibold text-white">
          Column Analytics
        </h2>

        <p className="mt-1 text-xs text-zinc-500">
          Select a numeric column to view statistics.
        </p>
      </div>

      <select
        value={selectedColumn}
        onChange={(e) =>
          setSelectedColumn(e.target.value)
        }
        className="h-11 w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-3 text-sm text-zinc-300 outline-none transition-all duration-200 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/10"
      >
        <option value="" className="bg-zinc-900">
          Select Numeric Column
        </option>

        {numericColumns.map((column) => (
          <option
            key={column}
            value={column}
            className="bg-zinc-900"
          >
            {column}
          </option>
        ))}
      </select>

      {selectedColumn && (
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-all duration-200 hover:border-zinc-700"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs text-zinc-500">
                    {stat.label}
                  </p>

                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg border ${stat.color}`}
                  >
                    <Icon size={15} />
                  </div>
                </div>

                <p className="mt-3 text-xl font-semibold text-white">
                  {stat.value}
                </p>
              </div>
            );
          })}

        </div>
      )}
    </section>
  );
}

export default ColumnAnalytics;