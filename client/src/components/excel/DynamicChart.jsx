import { useContext, useMemo, useState } from "react";
import { BarChart3 } from "lucide-react";

import { ExcelContext } from "../../context/ExcelContext";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

function DynamicChart() {
  const { excelData } = useContext(ExcelContext);

  // -----------------------------------------
  // Get columns
  // -----------------------------------------
  const columns =
    excelData.length > 0
      ? Object.keys(excelData[0])
      : [];

  // -----------------------------------------
  // Find numeric columns
  // -----------------------------------------
  const numericColumns =
    excelData.length > 0
      ? columns.filter((column) =>
          excelData.some(
            (row) =>
              row[column] !== "" &&
              row[column] !== null &&
              row[column] !== undefined &&
              !isNaN(Number(row[column]))
          )
        )
      : [];

  // -----------------------------------------
  // Default X Axis
  // Prefer non-numeric column
  // -----------------------------------------
  const defaultXAxis =
    columns.find(
      (column) => !numericColumns.includes(column)
    ) ||
    columns[0] ||
    "";

  // -----------------------------------------
  // Default Y Axis
  // -----------------------------------------
  const defaultYAxis =
    numericColumns[0] ||
    columns[1] ||
    columns[0] ||
    "";

  // -----------------------------------------
  // States
  // -----------------------------------------
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [chartType, setChartType] = useState("bar");

  // -----------------------------------------
  // Active values
  // -----------------------------------------
  const activeXAxis = xAxis || defaultXAxis;
  const activeYAxis = yAxis || defaultYAxis;

  // -----------------------------------------
  // Prepare chart data
  // -----------------------------------------
  const chartData = useMemo(() => {
    if (
      !excelData.length ||
      !activeXAxis ||
      !activeYAxis
    ) {
      return [];
    }

    const groupedData = {};

    excelData.forEach((row) => {
      const key =
        row[activeXAxis] !== undefined &&
        row[activeXAxis] !== null &&
        row[activeXAxis] !== ""
          ? String(row[activeXAxis])
          : "Unknown";

      const numericValue = Number(row[activeYAxis]);

      const value = isNaN(numericValue)
        ? 0
        : numericValue;

      if (!groupedData[key]) {
        groupedData[key] = 0;
      }

      groupedData[key] += value;
    });

    return Object.entries(groupedData)
      .slice(0, 15)
      .map(([key, value]) => ({
        category: key,
        value: value,
      }));
  }, [
    excelData,
    activeXAxis,
    activeYAxis,
  ]);

  // -----------------------------------------
  // Pie chart colors
  // -----------------------------------------
  const COLORS = [
    "#8b5cf6",
    "#6366f1",
    "#a855f7",
    "#7c3aed",
    "#c084fc",
    "#818cf8",
    "#6d28d9",
    "#9333ea",
    "#4f46e5",
    "#a78bfa",
  ];

  // -----------------------------------------
  // No Excel data
  // -----------------------------------------
  if (excelData.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-zinc-800 bg-[#151518] p-5 shadow-lg shadow-black/10">

      {/* =========================================
          HEADER
      ========================================= */}
      <div className="mb-5 flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-400">
          <BarChart3 size={18} />
        </div>

        <div>
          <h2 className="text-base font-semibold text-white">
            Dynamic Chart
          </h2>

          <p className="mt-1 text-xs text-zinc-500">
            Visualize your spreadsheet data.
          </p>
        </div>

      </div>


      {/* =========================================
          AXIS CONTROLS
      ========================================= */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

        {/* X AXIS */}
        <div>

          <label className="mb-2 block text-xs font-medium text-zinc-500">
            X Axis
          </label>

          <select
            value={activeXAxis}
            onChange={(e) =>
              setXAxis(e.target.value)
            }
            className="h-10 w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-3 text-sm text-zinc-300 outline-none transition focus:border-violet-500/50"
          >

            {columns.map((column) => (
              <option
                key={column}
                value={column}
                className="bg-zinc-900"
              >
                {column}
              </option>
            ))}

          </select>

        </div>


        {/* Y AXIS */}
        <div>

          <label className="mb-2 block text-xs font-medium text-zinc-500">
            Y Axis
          </label>

          <select
            value={activeYAxis}
            onChange={(e) =>
              setYAxis(e.target.value)
            }
            className="h-10 w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-3 text-sm text-zinc-300 outline-none transition focus:border-violet-500/50"
          >

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

        </div>

      </div>


      {/* =========================================
          CHART TYPE BUTTONS
      ========================================= */}
      <div className="mt-4 flex flex-wrap gap-2">

        {/* BAR */}
        <button
          type="button"
          onClick={() =>
            setChartType("bar")
          }
          className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-all duration-200 ${
            chartType === "bar"
              ? "bg-violet-600 text-white shadow-lg shadow-violet-950/20"
              : "border border-zinc-800 bg-zinc-900 text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Bar
        </button>


        {/* PIE */}
        <button
          type="button"
          onClick={() =>
            setChartType("pie")
          }
          className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-all duration-200 ${
            chartType === "pie"
              ? "bg-violet-600 text-white shadow-lg shadow-violet-950/20"
              : "border border-zinc-800 bg-zinc-900 text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Pie
        </button>


        {/* LINE */}
        <button
          type="button"
          onClick={() =>
            setChartType("line")
          }
          className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-all duration-200 ${
            chartType === "line"
              ? "bg-violet-600 text-white shadow-lg shadow-violet-950/20"
              : "border border-zinc-800 bg-zinc-900 text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Line
        </button>

      </div>


      {/* =========================================
          CHART AREA
          
          IMPORTANT:
          h-[300px] gives ResponsiveContainer
          an actual height.
      ========================================= */}
      <div className="mt-6 h-[300px] w-full">

        {chartData.length === 0 ? (

          <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-zinc-800">

            <p className="text-sm text-zinc-600">
              Select a valid X and Y axis.
            </p>

          </div>

        ) : (

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            {/* =====================================
                BAR CHART
            ===================================== */}
            {chartType === "bar" && (

              <BarChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 20,
                  left: 0,
                  bottom: 20,
                }}
              >

                <CartesianGrid
                  stroke="#27272a"
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="category"
                  tick={{
                    fill: "#71717a",
                    fontSize: 10,
                  }}
                  tickLine={false}
                  axisLine={{
                    stroke: "#3f3f46",
                  }}
                  interval={0}
                  angle={
                    chartData.length > 6
                      ? -25
                      : 0
                  }
                  textAnchor={
                    chartData.length > 6
                      ? "end"
                      : "middle"
                  }
                />

                <YAxis
                  tick={{
                    fill: "#71717a",
                    fontSize: 10,
                  }}
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip
                  cursor={{
                    fill: "#27272a",
                  }}
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "1px solid #3f3f46",
                    borderRadius: "10px",
                    color: "#ffffff",
                    fontSize: "12px",
                  }}
                  labelStyle={{
                    color: "#ffffff",
                  }}
                />

                <Bar
                  dataKey="value"
                  name={activeYAxis}
                  fill="#8b5cf6"
                  radius={[
                    6,
                    6,
                    0,
                    0,
                  ]}
                  barSize={30}
                />

              </BarChart>

            )}


            {/* =====================================
                PIE CHART
            ===================================== */}
            {chartType === "pie" && (

              <PieChart>

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "1px solid #3f3f46",
                    borderRadius: "10px",
                    color: "#ffffff",
                    fontSize: "12px",
                  }}
                />

                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="category"
                  cx="50%"
                  cy="45%"
                  outerRadius={95}
                  innerRadius={45}
                  paddingAngle={3}
                >

                  {chartData.map(
                    (entry, index) => (

                      <Cell
                        key={`cell-${index}`}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />

                    )
                  )}

                </Pie>

                <Legend
                  verticalAlign="bottom"
                  height={35}
                  wrapperStyle={{
                    fontSize: "10px",
                    color: "#a1a1aa",
                  }}
                />

              </PieChart>

            )}


            {/* =====================================
                LINE CHART
            ===================================== */}
            {chartType === "line" && (

              <LineChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 20,
                  left: 0,
                  bottom: 20,
                }}
              >

                <CartesianGrid
                  stroke="#27272a"
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="category"
                  tick={{
                    fill: "#71717a",
                    fontSize: 10,
                  }}
                  tickLine={false}
                  axisLine={{
                    stroke: "#3f3f46",
                  }}
                  interval={0}
                  angle={
                    chartData.length > 6
                      ? -25
                      : 0
                  }
                  textAnchor={
                    chartData.length > 6
                      ? "end"
                      : "middle"
                  }
                />

                <YAxis
                  tick={{
                    fill: "#71717a",
                    fontSize: 10,
                  }}
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "1px solid #3f3f46",
                    borderRadius: "10px",
                    color: "#ffffff",
                    fontSize: "12px",
                  }}
                  labelStyle={{
                    color: "#ffffff",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="value"
                  name={activeYAxis}
                  stroke="#8b5cf6"
                  strokeWidth={2.5}
                  dot={{
                    r: 4,
                    fill: "#8b5cf6",
                    strokeWidth: 0,
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />

              </LineChart>

            )}

          </ResponsiveContainer>

        )}

      </div>

    </section>
  );
}

export default DynamicChart;