import { useContext, useState } from "react";
import { ExcelContext } from "../../context/ExcelContext";

function ColumnAnalytics() {
  const { excelData } = useContext(ExcelContext);

  const numericColumns =
    excelData.length > 0
      ? Object.keys(excelData[0]).filter(
          (key) => !isNaN(excelData[0][key])
        )
      : [];

  const [selectedColumn, setSelectedColumn] = useState("");

  if (excelData.length === 0) return null;

  let values = [];

  if (selectedColumn) {
    values = excelData
      .map((row) => Number(row[selectedColumn]))
      .filter((value) => !isNaN(value));
  }

  const total = values.reduce((a, b) => a + b, 0);
  const average =
    values.length > 0
      ? (total / values.length).toFixed(2)
      : 0;

  const maximum =
    values.length > 0
      ? Math.max(...values)
      : 0;

  const minimum =
    values.length > 0
      ? Math.min(...values)
      : 0;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Column Analytics
      </h2>

      <select
        value={selectedColumn}
        onChange={(e) => setSelectedColumn(e.target.value)}
        className="border p-3 rounded-lg w-full mb-6"
      >
        <option value="">
          Select Numeric Column
        </option>

        {numericColumns.map((column) => (
          <option
            key={column}
            value={column}
          >
            {column}
          </option>
        ))}
      </select>

      {selectedColumn && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

          <div className="bg-blue-50 p-4 rounded-xl">
            <h3>Total</h3>
            <p className="text-2xl font-bold">{total}</p>
          </div>

          <div className="bg-green-50 p-4 rounded-xl">
            <h3>Average</h3>
            <p className="text-2xl font-bold">{average}</p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-xl">
            <h3>Maximum</h3>
            <p className="text-2xl font-bold">{maximum}</p>
          </div>

          <div className="bg-red-50 p-4 rounded-xl">
            <h3>Minimum</h3>
            <p className="text-2xl font-bold">{minimum}</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-xl">
            <h3>Count</h3>
            <p className="text-2xl font-bold">
              {values.length}
            </p>
          </div>

        </div>
      )}

    </div>
  );
}

export default ColumnAnalytics;