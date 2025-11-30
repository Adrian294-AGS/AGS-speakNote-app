import fs from "fs/promises";
import path from "path";
import { mkdirSync, existsSync } from "fs";

export const photoMove = async(fileUrl) => {
    try {
       // Folder path
        const uploadDir = path.resolve("upload/photo");

        // Create folder if it doesn't exist
        if (!existsSync(uploadDir)) {
            mkdirSync(uploadDir, { recursive: true });
        }

        // Fetch the image from URL
        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error("Failed to download file");

        // Get extension from URL (default to png)
        let ext = path.extname(fileUrl).split("?")[0];
        if (!ext) ext = ".png";

        // Generate safe filename
        const fileName = `${Date.now()}${ext}`;
        const filePath = path.join(uploadDir, fileName);

        // Read binary
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Save file
        await fs.writeFile(filePath, buffer);

        return fileName;
    } catch (error) {
        console.log(error);
    }
}