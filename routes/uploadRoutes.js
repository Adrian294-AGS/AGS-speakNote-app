import express from "express";
import upload from "../Middlewares/multer.js";
import { uploadController } from "../controller/fileController.js";

const uploadRouter = express.Router();

uploadRouter.post("/transcriptions", upload.single("audioFiles"), uploadController);

export default uploadRouter;