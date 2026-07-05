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
    "#2563eb",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
  ];

  return (
    <div className="space-y-8 mt-8">

      {/* Bar Chart */}

      <div className="bg-white rounded-2xl shadow-md p-6">

        <h2 className="text-2xl font-bold mb-6">
          Rows in Uploaded Files
        </h2>

        <div className="h-80">

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fileName" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Bar
                dataKey="totalRows"
                fill="#2563eb"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* Line Chart */}

      <div className="bg-white rounded-2xl shadow-md p-6">

        <h2 className="text-2xl font-bold mb-6">
          Columns Comparison
        </h2>

        <div className="h-80">

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fileName" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Line
                type="monotone"
                dataKey="totalColumns"
                stroke="#10b981"
                strokeWidth={3}
              />

            </LineChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* Pie Chart */}

      <div className="bg-white rounded-2xl shadow-md p-6">

        <h2 className="text-2xl font-bold mb-6">
          Upload Distribution
        </h2>

        <div className="h-64">

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={chartData}
                dataKey="totalRows"
                nameKey="fileName"
                outerRadius={110}
                label
              >

                {chartData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}

export default ChartsSection;