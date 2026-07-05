import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ExportButtons({ data }) {

  const exportPDF = () => {

    const doc = new jsPDF();

    const columns = Object.keys(data[0]);

    const rows = data.map((row) =>
      columns.map((col) => row[col])
    );

    autoTable(doc, {
      head: [columns],
      body: rows,
    });

    doc.save("ExcelAnalytics.pdf");
  };

  const exportExcel = () => {

    const worksheet =
      XLSX.utils.json_to_sheet(data);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Data"
    );

    const excelBuffer =
      XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

    const blob = new Blob(
      [excelBuffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }
    );

    saveAs(blob, "ExcelAnalytics.xlsx");
  };

  return (

    <div className="flex gap-4 my-6">

      <button
        onClick={exportPDF}
        className="bg-red-600 text-white px-6 py-3 rounded-lg"
      >
        Export PDF
      </button>

      <button
        onClick={exportExcel}
        className="bg-green-600 text-white px-6 py-3 rounded-lg"
      >
        Export Excel
      </button>

    </div>

  );
}

export default ExportButtons;