import express from "express";
import upload from "../Middlewares/multer.js";
import { uploadController } from "../controller/fileController.js";

const subRouter = express.Router();

subRouter.post("/transcriptions", upload.single("audioFiles"), uploadController);

export default subRouter;