import path from "path";
import { spawn } from "child_process";
import fs from "fs";
import { convertToWav } from "../Middlewares/convertToWav.js";


export const uploadController = async (req, res) => {
  const audio = req.file;
  const inputPath = path.resolve(audio.path);
  const wavFile = `${audio.originalname}.wav`;
  const wavPath = path.resolve("upload", wavFile);
  const ffmpegPath = "C:/ffmpeg/ffmpeg-7.1.1-essentials_build/bin/ffmpeg.exe";

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

    py.on("close", () => {
      fs.unlinkSync(inputPath);
      return res.render("testing", { result: result.trim() });
    });
  } catch (error) {
    console.log(error);
  }
};

