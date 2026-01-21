import multer from "multer";
import path from "path";


const uploadPath = path.resolve("upload");

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