import ffmpeg from "fluent-ffmpeg";

export const convertToWav = (mp3File, wavFile, ffmpegPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg.setFfmpegPath(ffmpegPath);
    ffmpeg(mp3File)
      .audioChannels(1) 
      .audioFrequency(16000) 
      .audioCodec("pcm_s16le")
      .format("wav")
      .on("end", () => resolve())
      .on("error", reject)
      .save(wavFile);
  });
};
