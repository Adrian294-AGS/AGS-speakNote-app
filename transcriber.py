import sys
import json
from vosk import Model, KaldiRecognizer
import wave

# Load model (make sure the folder name matches)
model = Model("C:/Users/LENOVO/Documents/myFirstProject/model")

wf = wave.open(sys.argv[1], "rb")

if wf.getnchannels() != 1 or wf.getsampwidth() != 2 or wf.getframerate() != 16000:
    print("Audio file must be WAV format: Mono, 16-bit, 16kHz", file=sys.stderr)
    exit(1)

rec = KaldiRecognizer(model, wf.getframerate())
rec.SetWords(True)

final_result = ""

while True:
    data = wf.readframes(4000)
    if len(data) == 0:
        break
    if rec.AcceptWaveform(data):
        res = json.loads(rec.Result())
        final_result += res.get("text", "") + " "

res = json.loads(rec.FinalResult())
final_result += res.get("text", "")

print(final_result.strip())
