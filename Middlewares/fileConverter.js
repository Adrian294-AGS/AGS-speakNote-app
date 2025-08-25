import {writeFileSync} from "fs";
import path from "path";

export const generateToTxt = async (audioName, content) => {
    const file = `${audioName}.pdf`;
    const file_path = path.join("upload", file);

    try {
        writeFileSync(file_path, content);
        return file_path;
    } catch (error) {
        console.log(error);
    }
};