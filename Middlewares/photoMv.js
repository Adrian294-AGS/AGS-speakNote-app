import fs from "fs";
import path from "path";
import fetch from "node-fetch";

export const photoMove = async(filePath) => {
    const uploadDir = path.resolve("upload/photo");
    try {
        const res = await fetch(filePath);
        const buffer = await res.arrayBuffer();

        const fileName = `${Date.now()}-${filePath}.png`;
        const filePath = path.join(uploadDir, fileName);

        fs.writeFileSync(filePath, Buffer.from(buffer));
        return fileName;
    } catch (error) {
        console.log(error);
    }
}