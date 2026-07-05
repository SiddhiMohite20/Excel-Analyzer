import xlsx from "xlsx";
import Upload from "../models/Upload.js";

export const uploadExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const workbook = xlsx.readFile(req.file.path);

    const sheetName = workbook.SheetNames[0];

    const sheet = workbook.Sheets[sheetName];

    const data = xlsx.utils.sheet_to_json(sheet);

    const upload = await Upload.create({
  fileName: req.file.originalname,
  totalRows: data.length,
  totalColumns: Object.keys(data[0]).length,
  totalSheets: workbook.SheetNames.length,
});

    res.json({
      success: true,
      fileName: req.file.originalname,
      totalRows: data.length,
      data,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};