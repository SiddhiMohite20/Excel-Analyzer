import { useEffect, useState } from "react";
import axios from "axios";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

function ChartsSection() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/dashboard"
      );

      const data = response.data.chartData.map((item, index) => ({
        fileName: `${index + 1}`,
        totalRows: item.totalRows,
        totalColumns: item.totalColumns,
      }));

      setChartData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const COLORS = [
    "#8b5cf6",
    "#6366f1",
    "#a855f7",
    "#7c3aed",
    "#c084fc",
    "#818cf8",
  ];

  return (
    <div className="space-y-5">

      {/* Top Charts */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

        {/* Bar Chart */}
        <div className="rounded-2xl border border-zinc-800 bg-[#151518] p-4 shadow-lg shadow-black/10 md:p-5">

          <div className="mb-4">
            <h2 className="text-base font-semibold text-white">
              Rows in Uploaded Files
            </h2>

            <p className="mt-1 text-xs text-zinc-500">
              Total rows across your uploaded files
            </p>
          </div>

          <div className="h-[230px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 10,
                  left: -15,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  stroke="#27272a"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="fileName"
                  tick={{
                    fill: "#71717a",
                    fontSize: 10,
                  }}
                  axisLine={{
                    stroke: "#3f3f46",
                  }}
                  tickLine={false}
                />

                <YAxis
                  tick={{
                    fill: "#71717a",
                    fontSize: 10,
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "1px solid #3f3f46",
                    borderRadius: "10px",
                    color: "#ffffff",
                    fontSize: "12px",
                  }}
                />

                <Legend
                  wrapperStyle={{
                    fontSize: "11px",
                    color: "#a1a1aa",
                  }}
                />

                <Bar
                  dataKey="totalRows"
                  name="Total Rows"
                  fill="#8b5cf6"
                  radius={[5, 5, 0, 0]}
                  barSize={42}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* Line Chart */}
        <div className="rounded-2xl border border-zinc-800 bg-[#151518] p-4 shadow-lg shadow-black/10 md:p-5">

          <div className="mb-4">
            <h2 className="text-base font-semibold text-white">
              Columns Comparison
            </h2>

            <p className="mt-1 text-xs text-zinc-500">
              Number of columns in each uploaded file
            </p>
          </div>

          <div className="h-[230px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 10,
                  left: -15,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  stroke="#27272a"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="fileName"
                  tick={{
                    fill: "#71717a",
                    fontSize: 10,
                  }}
                  axisLine={{
                    stroke: "#3f3f46",
                  }}
                  tickLine={false}
                />

                <YAxis
                  tick={{
                    fill: "#71717a",
                    fontSize: 10,
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "1px solid #3f3f46",
                    borderRadius: "10px",
                    color: "#ffffff",
                    fontSize: "12px",
                  }}
                />

                <Legend
                  wrapperStyle={{
                    fontSize: "11px",
                    color: "#a1a1aa",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="totalColumns"
                  name="Total Columns"
                  stroke="#a78bfa"
                  strokeWidth={2.5}
                  dot={{
                    r: 3,
                    fill: "#a78bfa",
                  }}
                  activeDot={{
                    r: 5,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>

      </div>

      {/* Pie Chart */}
      <div className="rounded-2xl border border-zinc-800 bg-[#151518] p-4 shadow-lg shadow-black/10 md:p-5">

        <div className="mb-4">
          <h2 className="text-base font-semibold text-white">
            Upload Distribution
          </h2>

          <p className="mt-1 text-xs text-zinc-500">
            Distribution of rows across uploaded files
          </p>
        </div>

        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>

              <Pie
                data={chartData}
                dataKey="totalRows"
                nameKey="fileName"
                cx="50%"
                cy="50%"
                outerRadius={82}
                innerRadius={45}
                paddingAngle={3}
                label={false}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid #3f3f46",
                  borderRadius: "10px",
                  color: "#ffffff",
                  fontSize: "12px",
                }}
              />

              <Legend
                verticalAlign="bottom"
                height={24}
                wrapperStyle={{
                  fontSize: "11px",
                  color: "#a1a1aa",
                }}
              />

            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
}

export default ChartsSection;