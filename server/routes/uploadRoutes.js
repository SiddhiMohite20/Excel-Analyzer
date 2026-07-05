import express from "express";
import upload from "../middleware/upload.js";
import { uploadExcel } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/", upload.single("excelFile"), uploadExcel);

export default router;