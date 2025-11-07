import path from "path";
import { spawn } from "child_process";
import fs from "fs";
import { convertToWav } from "../Middlewares/convertToWav.js";
import { createUser } from "../models/sql.js";
import { generateToTxt } from "../Middlewares/fileConverter.js";

export const uploadController = async (req, res) => {
  const audio = req.file;
  const inputPath = path.resolve(audio.path);
  const wavFile = `${audio.filename}.wav`;
  const wavPath = path.resolve("upload", wavFile);
  const ffmpegPath = "C:/ffmpeg/ffmpeg-7.1.1-essentials_build/bin/ffmpeg.exe";
  const {Id, username} = req.body;

  if(!req.file) return res.status(500).json({success: false, message: "No file Uploaded"});
  
  try {
    
    await convertToWav(inputPath, wavPath, ffmpegPath);
    const py = spawn("python", ["transcriber.py", wavPath]);
    let result = "";

    py.stdout.on("data", (data) => {
      result += data.toString();
    });

    py.stderr.on("data", (err) => {
      console.error("Python error:", err.toString());
    });

    py.on("close", async () => {
      const txtFilePath = await generateToTxt(audio.filename, result.trim());
      const insert_audio = {
        UID: Id,
        wav_file: wavFile,
        result_text: result.trim(),
        txt_file_path: txtFilePath
      }
      const insert_result = await createUser("tbl_audio", insert_audio);
      fs.unlinkSync(inputPath);
      return res.status(201).json({success: true, Id: insert_result.insertId});
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({Error: `Error: ${error}`});
  }
};

