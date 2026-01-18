import { convertToWav } from "../services/convertToWav.js";
import path from "path";
import fs from "fs";
import { spawn } from "child_process";


export const record = async (req, res) => {
    const audio = req.file;
    const { Id } = req.user;
    const inputPath = path.resolve(audio.path);
    const audioName = `${audio.originalName}.wav`;
    const audioPath = path.resolve("upload/record", audioName);
    const ffmpegPath = "C:/ffmpeg/ffmpeg-7.1.1-essentials_build/bin/ffmpeg.exe";

    if(!audio){return res.status(500).json({success: false, message: "No Audio Uploaded"})};

    try {
        await convertToWav(inputPath, audioPath, ffmpegPath);
        const py = spawn("python", ["./services/transcriber.py", audioPath]);
        let result = " ";

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message:"Server Error"});
    }


}