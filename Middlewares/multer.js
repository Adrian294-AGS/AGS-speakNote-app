import multer, { MulterError } from "multer";
import path from "path";
import fs from "fs";

const file_path = path.resolve("upload");

if (!fs.existsSync(file_path)) {
    fs.mkdirSync(file_path, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, file_path);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}-${Date.now()}`);
    }
})

const upload = multer({storage});

export default upload;