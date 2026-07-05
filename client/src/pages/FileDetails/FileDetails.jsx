import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  FileSpreadsheet,
  Rows3,
  Columns3,
  Layers,
  CalendarDays,
} from "lucide-react";

function FileDetails() {
  const { id } = useParams();

  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchFile();
  }, []);

  const fetchFile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/history/${id}`
      );

      setFile(response.data.upload);
    } catch (error) {
      console.log(error);
    }
  };

  if (!file) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <h2 className="text-2xl font-semibold text-gray-600">
            Loading...
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <div className="flex items-center gap-4 mb-8">

            <div className="bg-blue-100 p-4 rounded-2xl">
              <FileSpreadsheet
                size={40}
                className="text-blue-600"
              />
            </div>

            <div>

              <h1 className="text-4xl font-bold text-slate-800">
                File Details
              </h1>

              <p className="text-gray-500 mt-1">
                Uploaded Excel file information
              </p>

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-slate-50 rounded-2xl p-5 flex items-center gap-4">

              <FileSpreadsheet className="text-blue-600" />

              <div>
                <p className="text-gray-500 text-sm">
                  File Name
                </p>

                <h3 className="font-semibold break-all">
                  {file.fileName}
                </h3>
              </div>

            </div>

            <div className="bg-slate-50 rounded-2xl p-5 flex items-center gap-4">

              <Rows3 className="text-green-600" />

              <div>
                <p className="text-gray-500 text-sm">
                  Total Rows
                </p>

                <h3 className="font-semibold">
                  {file.totalRows}
                </h3>
              </div>

            </div>

            <div className="bg-slate-50 rounded-2xl p-5 flex items-center gap-4">

              <Columns3 className="text-yellow-600" />

              <div>
                <p className="text-gray-500 text-sm">
                  Total Columns
                </p>

                <h3 className="font-semibold">
                  {file.totalColumns}
                </h3>
              </div>

            </div>

            <div className="bg-slate-50 rounded-2xl p-5 flex items-center gap-4">

              <Layers className="text-purple-600" />

              <div>
                <p className="text-gray-500 text-sm">
                  Total Sheets
                </p>

                <h3 className="font-semibold">
                  {file.totalSheets}
                </h3>
              </div>

            </div>

            <div className="bg-slate-50 rounded-2xl p-5 flex items-center gap-4 md:col-span-2">

              <CalendarDays className="text-red-500" />

              <div>
                <p className="text-gray-500 text-sm">
                  Uploaded At
                </p>

                <h3 className="font-semibold">
                  {new Date(file.createdAt).toLocaleString()}
                </h3>
              </div>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default FileDetails;