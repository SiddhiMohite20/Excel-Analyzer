function ExcelTable({ filteredData, handleSort }) {
  if (filteredData.length === 0) {
    return (
      <div className="text-center text-gray-500 py-6">
        No matching records found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">

      <h2 className="text-2xl font-bold mb-4">
        Excel Data
      </h2>

      <table className="w-full border border-gray-300">

        <thead className="bg-gray-100 sticky top-0">
          <tr>
            {Object.keys(filteredData[0]).map((key) => (
              <th
                key={key}
                onClick={() => handleSort(key)}
                className="border px-4 py-2 text-left cursor-pointer hover:bg-blue-100"
              >
                {key} ↕
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, i) => (
                <td
                  key={i}
                  className="border px-4 py-2"
                >
                  {value?.toString()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default ExcelTable;