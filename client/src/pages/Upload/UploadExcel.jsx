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
        top: 550,
        behavior: "smooth",
      });

    } catch (error) {
      console.error(error);
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
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Upload Excel File
        </h1>

        <FileUploader
          file={file}
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
          loading={loading}
        />

        {excelData.length > 0 && (
          <>
            <SearchBar
              search={search}
              setSearch={(value) => {
                setSearch(value);
                setCurrentPage(1);
              }}
            />

            <ExportButtons
              data={filteredData}
            />

            <ExcelTable
              filteredData={currentRows}
              handleSort={handleSort}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />

            <DynamicChart />
            

<ColumnAnalytics />
          </>
        )}

      </div>
    </DashboardLayout>
  );
}

export default UploadExcel;