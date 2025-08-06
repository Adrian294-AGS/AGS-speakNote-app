import path from "path";
import { spawn } from "child_process";
import fs from "fs";
import { convertToWav } from "../Middlewares/convertToWav.js";
import { createUser, selectAudio, selectUser } from "../models/sql.js";

export const uploadController = async (req, res) => {
  const audio = req.file;
  const inputPath = path.resolve(audio.path);
  const wavFile = `${audio.originalname}.wav`;
  const wavPath = path.resolve("upload", wavFile);
  const ffmpegPath = "C:/ffmpeg/ffmpeg-7.1.1-essentials_build/bin/ffmpeg.exe";
  const {Id, displayName} = req.body;

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
      const insert_audio = {
        user_Id: Id,
        wav_file: wavFile,
        result_text: result.trim(),
        display_name: displayName
      }
      const insert_result = await createUser("tblaudio", insert_audio);
      const select_results = await selectAudio(insert_result.insertId);
      const select_user_result = await selectUser(displayName);
      if(!select_results  || !select_user_result) return res.render("Home", {msg: "something went wrong!!!!", profile: select_user_result});
      fs.unlinkSync(inputPath);
      return res.render("Home", { profile: select_user_result, transcriptions: select_results});
    });
  } catch (error) {
    console.log(error);
  }
};

