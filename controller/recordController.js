import { convertToWav } from "../services/convertToWav.js";
import path from "path";
import fs from "fs";
import { spawn } from "child_process";
import { generateToTxt } from "../services/fileConverter.js";
import { createUser } from "../models/sql.js";

export const record = async (req, res) => {
  const audio = req.file;
  const Id = req.user;
  const inputPath = path.resolve(audio.path);
  const audioName = `${audio.originalName}.wav`;
  const audioPath = path.resolve("upload/record", audioName);
  const ffmpegPath = "C:/ffmpeg/ffmpeg-7.1.1-essentials_build/bin/ffmpeg.exe";

  if (!audio) {
    return res
      .status(500)
      .json({ success: false, message: "No Audio Uploaded" });
  }

  try {
    await convertToWav(inputPath, audioPath, ffmpegPath);
    const py = spawn("python", ["./services/transcriber.py", audioPath]);
    let result = " ";

    py.stdout.on("data", (data) => {
      result += data.toString();
    });

    py.stderr.on("data", (err) => {
      console.log("python error: " + err.toString());
    });

    py.on("close", async () => {
      let filePath = await generateToTxt(audioName, result.trim());
      const newAudio = {
        UID: Id,
        wav_file: audioName,
        result_text: result.trim(),
        txt_file_path: filePath
      };
      const insertResult = await createUser("tbl_audio", newAudio);
      fs.unlinkSync(inputPath);
      return res.status(201).json({success: true, Id: insertResult.insertId});
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
