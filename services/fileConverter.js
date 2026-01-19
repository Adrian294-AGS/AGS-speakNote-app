import {writeFileSync, createWriteStream, readFileSync} from "fs";
import path from "path";
import PDFDocument from "pdfkit";

const generateToPdf = async (txtPath, pdfPath) => {
    const doc = new PDFDocument();
    const writeStream = createWriteStream(pdfPath);
    doc.pipe(writeStream);
    const content = readFileSync(txtPath, "utf-8");
    doc.font("Times-Roman").fontSize(12).text(content, {
        width: 410,
        align: "justify"
    });

    doc.end();
    writeStream.on("finish", () => {
        console.log(`PDF created: ${pdfPath}`);
    });
};

export const generateToTxt = async (audioName, content) => {
    const file = audioName ==  "undefined.wav" ? `Record-${Date.now()}.pdf` : `${audioName}.pdf`;
    const file_path = path.join("upload/PDF", file);

    try {
        writeFileSync(file_path, content);
        generateToPdf(file_path, file_path);
        return file;
    } catch (error) {
        console.log(error);
    }
};