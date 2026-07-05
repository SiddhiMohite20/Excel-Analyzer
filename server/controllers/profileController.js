import Upload from "../models/Upload.js";

export const getProfile = async (req, res) => {
  try {
    const totalUploads = await Upload.countDocuments();

    const totalRows = await Upload.aggregate([
      {
        $group: {
          _id: null,
          rows: { $sum: "$totalRows" },
        },
      },
    ]);

    res.json({
      success: true,
      profile: {
        name: "Siddhi Mohite",
        email: "siddhimohite@example.com",
        role: "Excel Analytics Admin",
        totalUploads,
        totalRows:
          totalRows.length > 0 ? totalRows[0].rows : 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};