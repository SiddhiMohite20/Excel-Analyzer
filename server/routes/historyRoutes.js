import express from "express";
import {
  getHistory,
  deleteUpload,
   getUploadById,
} from "../controllers/historyController.js";

const router = express.Router();

router.get("/", getHistory);

router.get("/:id", getUploadById);

router.delete("/:id", deleteUpload);



export default router;