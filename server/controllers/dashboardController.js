import Upload from "../models/Upload.js";

export const getDashboardStats = async (req, res) => {
  try {
    const uploads = await Upload.find().sort({ createdAt: -1 });

    const totalUploads = uploads.length;

    const totalRows = uploads.reduce(
      (sum, item) => sum + item.totalRows,
      0
    );

    const totalColumns = uploads.reduce(
      (sum, item) => sum + item.totalColumns,
      0
    );

    const lastUpload =
      uploads.length > 0 ? uploads[0].fileName : "No File";

    res.json({
  success: true,
  totalUploads,
  totalRows,
  totalColumns,
  lastUpload,

  chartData: uploads.map((item) => ({
  fileName: item.fileName,
  totalRows: item.totalRows,
  totalColumns: item.totalColumns,
})),
});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};