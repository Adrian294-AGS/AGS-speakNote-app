import ffmpeg from "fluent-ffmpeg";


export const convertToWav = (mp3File, wavFile, ffmpegPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg.setFfmpegPath(ffmpegPath);
    ffmpeg(mp3File)
      .audioChannels(1) // Mono
      .audioFrequency(16000) // 16kHz
      .audioCodec("pcm_s16le")
      .format("wav") // Output format
      .on("end", () => resolve())
      .on("error", reject)
      .save(wavFile);
  });
};
