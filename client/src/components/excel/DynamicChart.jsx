import { useContext, useState } from "react";
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
} from "recharts";

function DynamicChart() {
  const { excelData } = useContext(ExcelContext);

  if (excelData.length === 0) {
    return null;
  }

  const columns = Object.keys(excelData[0]);

  const [xAxis, setXAxis] = useState(columns[0]);
  const [yAxis, setYAxis] = useState(columns[1]);
  const [chartType, setChartType] = useState("bar");

 const groupedData = {};

excelData.forEach((row) => {
  const key = row[xAxis];

  const value = isNaN(Number(row[yAxis]))
    ? 1
    : Number(row[yAxis]);

  if (!groupedData[key]) {
    groupedData[key] = 0;
  }

  groupedData[key] += value;
});

const chartData = Object.keys(groupedData).map((key) => ({
  [xAxis]: key,
  [yAxis]: groupedData[key],
}));

  const COLORS = [
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#f59e0b",
  "#9333ea",
  "#0891b2",
];

  return (
    <div className="bg-white mt-10 rounded-xl shadow-md p-6">

      <h2 className="text-2xl font-bold mb-6">
        Dynamic Chart
      </h2>

      <div className="flex gap-5 mb-8">

        <div>
          <label className="block mb-2 font-semibold">
            X Axis
          </label>

          <select
            value={xAxis}
            onChange={(e) => setXAxis(e.target.value)}
            className="border rounded-lg p-2"
          >
            {columns.map((col) => (
              <option key={col}>{col}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Y Axis
          </label>

          <select
            value={yAxis}
            onChange={(e) => setYAxis(e.target.value)}
            className="border rounded-lg p-2"
          >
            {columns.map((col) => (
              <option key={col}>{col}</option>
            ))}
          </select>
        </div>

      </div>

      <div className="flex gap-4 mb-8">

  <button
    onClick={() => setChartType("bar")}
    className={`px-5 py-2 rounded-lg ${
      chartType === "bar"
        ? "bg-blue-600 text-white"
        : "bg-gray-200"
    }`}
  >
    📊 Bar
  </button>

  <button
    onClick={() => setChartType("pie")}
    className={`px-5 py-2 rounded-lg ${
      chartType === "pie"
        ? "bg-green-600 text-white"
        : "bg-gray-200"
    }`}
  >
    🥧 Pie
  </button>

  <button
    onClick={() => setChartType("line")}
    className={`px-5 py-2 rounded-lg ${
      chartType === "line"
        ? "bg-purple-600 text-white"
        : "bg-gray-200"
    }`}
  >
    📈 Line
  </button>

</div>

      <ResponsiveContainer width="100%" height={400}>

  {chartType === "bar" && (

    <BarChart data={chartData}>

      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey={xAxis} />

      <YAxis />

      <Tooltip />

      <Bar
        dataKey={yAxis}
        fill="#2563eb"
      />

    </BarChart>

  )}

  {chartType === "pie" && (

    <PieChart>

      <Tooltip />
<Pie
  data={chartData}
  dataKey={yAxis}
  nameKey={xAxis}
  outerRadius={170}
>
        {chartData.map((entry, index) => (
          <Cell
            key={index}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>

    </PieChart>

  )}

  {chartType === "line" && (

    <LineChart data={chartData}>

      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey={xAxis} />

      <YAxis />

      <Tooltip />

      <Line
        type="monotone"
        dataKey={yAxis}
        stroke="#16a34a"
      />

    </LineChart>

  )}

</ResponsiveContainer>
    </div>
  );
}

export default DynamicChart;