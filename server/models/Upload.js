import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },

    totalRows: {
      type: Number,
      required: true,
    },

    totalColumns: {
      type: Number,
      required: true,
    },

    totalSheets: {
      type: Number,
      required: true,
    },

    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Upload", uploadSchema);