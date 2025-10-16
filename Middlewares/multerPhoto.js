import multer from "multer";
import path from "path";

const file_path = path.resolve("upload/photo");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, file_path);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}-${Date.now()}.png`);
    }
});
const uploadPhoto = multer({storage});

export default uploadPhoto;