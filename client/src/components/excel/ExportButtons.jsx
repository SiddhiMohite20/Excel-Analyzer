import { FileDown, FileSpreadsheet } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ExportButtons({ data }) {

  const exportPDF = () => {
    if (!data || data.length === 0) return;

    const doc = new jsPDF("l", "mm", "a4");

    const columns = Object.keys(data[0]);

    const rows = data.map((row) =>
      columns.map((column) => row[column])
    );

    autoTable(doc, {
      head: [columns],
      body: rows,
      styles: {
        fontSize: 8,
      },
      headStyles: {
        fillColor: [91, 33, 182],
      },
    });

    doc.save("ExcelAnalytics.pdf");
  };

  const exportExcel = () => {
    if (!data || data.length === 0) return;

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Data"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob(
      [excelBuffer],
      {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }
    );

    saveAs(blob, "ExcelAnalytics.xlsx");
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5">

      <button
        onClick={exportPDF}
        className="inline-flex h-10 items-center gap-2 rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 text-sm font-medium text-violet-300 transition-all duration-200 hover:border-violet-500/40 hover:bg-violet-500/20"
      >
        <FileDown size={16} />
        Export PDF
      </button>

      <button
        onClick={exportExcel}
        className="inline-flex h-10 items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 text-sm font-medium text-emerald-300 transition-all duration-200 hover:border-emerald-500/40 hover:bg-emerald-500/20"
      >
        <FileSpreadsheet size={16} />
        Export Excel
      </button>

    </div>
  );
}

export default ExportButtons;