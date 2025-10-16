import fs from "fs";
import path from "path";
import fetch from "node-fetch";

export const photoMove = async(filePath) => {
    const file = path.resolve("upload/photo");
    try {
        const res = await fetch(filePath);
        const buffer = await res.arrayBuffer();

        fs.writeFileSync(file, Buffer.from(buffer));
    } catch (error) {
        console.log(error);
    }
}