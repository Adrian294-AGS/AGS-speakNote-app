import express from "express";
import upload from "../Middlewares/multer.js";
import { uploadController } from "../controller/fileController.js";
import { jwt_authenticate } from "../Middlewares/jsonwebAuthenticate.js";

const subRouter = express.Router();

subRouter.post("/transcriptions", upload.single("file"), jwt_authenticate, uploadController);

export default subRouter;