import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import DashboardLayout from "../../layouts/DashboardLayout";
import { ExcelContext } from "../../context/ExcelContext";

import FileUploader from "../../components/excel/FileUploader";
import SearchBar from "../../components/excel/SearchBar";
import ExcelTable from "../../components/excel/ExcelTable";
import Pagination from "../../components/excel/Pagination";
import DynamicChart from "../../components/excel/DynamicChart";
import ExportButtons from "../../components/excel/ExportButtons";
import ColumnAnalytics from "../../components/excel/ColumnAnalytics";

function UploadExcel() {
  const [file, setFile] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(false);

  const rowsPerPage = 10;

  const { excelData, setExcelData, setFileName } =
    useContext(ExcelContext);

  // Select File
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Upload Excel File
  const handleUpload = async () => {
    if (!file) {
      toast.warning("Please select an Excel file.");
      return;
    }

    const formData = new FormData();
    formData.append("excelFile", file);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );

      setExcelData(response.data.data);
      setFileName(response.data.fileName);

      // Reset UI
      setSearch("");
      setCurrentPage(1);
      setFile(null);

      toast.success("File uploaded successfully!");

      // Scroll to table
      window.scrollTo({
        top: 500,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  // Search + Sort
  const filteredData = excelData
    .filter((row) =>
      Object.values(row).some((value) =>
        value
          ?.toString()
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (!sortColumn) return 0;

      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      if (!isNaN(valueA) && !isNaN(valueB)) {
        return sortOrder === "asc"
          ? Number(valueA) - Number(valueB)
          : Number(valueB) - Number(valueA);
      }

      return sortOrder === "asc"
        ? valueA.toString().localeCompare(valueB.toString())
        : valueB.toString().localeCompare(valueA.toString());
    });

  // Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentRows = filteredData.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  const totalPages = Math.ceil(
    filteredData.length / rowsPerPage
  );

  // Sorting
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(
        sortOrder === "asc" ? "desc" : "asc"
      );
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }

    setCurrentPage(1);
  };

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-7xl space-y-6">

        {/* Page Header */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">
            Data Management
          </p>

          <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Upload Excel File
          </h1>

          <p className="max-w-2xl text-sm text-zinc-500">
            Upload your spreadsheet to search, analyze, visualize,
            and export your data.
          </p>
        </div>

        {/* Upload Section */}
        <section className="rounded-2xl border border-zinc-800 bg-[#151518] p-4 shadow-lg shadow-black/10 md:p-5">
          <FileUploader
            file={file}
            handleFileChange={handleFileChange}
            handleUpload={handleUpload}
            loading={loading}
          />
        </section>

        {/* Data Section */}
        {excelData.length > 0 && (
          <div className="space-y-5">

            {/* Search + Export */}
            <section className="rounded-2xl border border-zinc-800 bg-[#151518] p-4 md:p-5">

              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div className="w-full lg:max-w-xl">
                  <SearchBar
                    search={search}
                    setSearch={(value) => {
                      setSearch(value);
                      setCurrentPage(1);
                    }}
                  />
                </div>

                <div className="shrink-0">
                  <ExportButtons data={filteredData} />
                </div>

              </div>
            </section>

            {/* Excel Table */}
            <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#151518] shadow-lg shadow-black/10">
              <ExcelTable
                filteredData={currentRows}
                handleSort={handleSort}
              />
            </section>

            {/* Pagination */}
            <div className="flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </div>

            {/* Analytics */}
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

              <section className="rounded-2xl border border-zinc-800 bg-[#151518] p-5 shadow-lg shadow-black/10">
                <ColumnAnalytics />
              </section>

              <section className="rounded-2xl border border-zinc-800 bg-[#151518] p-5 shadow-lg shadow-black/10">
                <DynamicChart />
              </section>

            </div>

          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

export default UploadExcel;