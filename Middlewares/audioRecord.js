import multer from "multer";
import path from "path";
import { file } from "pdfkit";

const uploadPath = path.resolve("upload/record");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}-${Date.now()}`);
    }
})

const audioRecord = multer({storage});

export default audioRecord;