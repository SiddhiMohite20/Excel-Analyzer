import { useEffect, useState } from "react";
import axios from "axios";

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

      // Show only latest 5 uploads
      setUploads(response.data.slice(0, 5));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Recent Uploads
      </h2>

      <table className="w-full">

        <thead>
          <tr className="border-b text-left">
            <th className="py-3">File Name</th>
            <th>Rows</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {uploads.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="text-center py-6 text-gray-500"
              >
                No uploads found
              </td>
            </tr>
          ) : (
            uploads.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-50"
              >
                <td className="py-4">
                  {item.fileName}
                </td>

                <td>{item.totalRows}</td>

                <td>
                  {new Date(
                    item.createdAt
                  ).toLocaleDateString()}
                </td>

                <td>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Success
                  </span>
                </td>
              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}

export default RecentUploads;