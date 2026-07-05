import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

      console.log(response.data);

setUploads(response.data);
    } catch (error) {
      console.log(error);
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
    console.log(error);
  }
};

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Upload History
        </h1>

        <div className="bg-white rounded-xl shadow-md overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>
                <th className="px-5 py-3 text-left">File Name</th>
                <th className="px-5 py-3 text-left">Rows</th>
                <th className="px-5 py-3 text-left">Columns</th>
                <th className="px-5 py-3 text-left">Sheets</th>
                <th className="px-5 py-3 text-left">Uploaded At</th>
<th className="px-5 py-3 text-center">Action</th>
              </tr>

            </thead>

            <tbody>
  {uploads.length === 0 ? (
    <tr>
      <td
        colSpan="6"
        className="text-center py-8 text-gray-500"
      >
        No upload history found.
      </td>
    </tr>
  ) : (
    uploads.map((item) => (
      <tr
        key={item._id}
        className="border-b hover:bg-gray-50"
      >
        <td className="px-5 py-3">{item.fileName}</td>

        <td className="px-5 py-3">{item.totalRows}</td>

        <td className="px-5 py-3">{item.totalColumns}</td>

        <td className="px-5 py-3">{item.totalSheets}</td>

        <td className="px-5 py-3">
          {new Date(item.createdAt).toLocaleString()}
        </td>

       <td className="px-5 py-3 flex justify-center gap-2">

<button
  onClick={() => navigate(`/file/${item._id}`)}
  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
>
  View
</button>

<button
onClick={() => handleDelete(item._id)}
className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
>
Delete
</button>

</td>
      </tr>
    ))
  )}
</tbody>

          </table>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default History;