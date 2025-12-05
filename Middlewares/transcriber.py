import sys
import json
from vosk import Model, KaldiRecognizer
import wave

model = Model("C:/Users/LENOVO/Documents/myFirstProject/model")
wf = wave.open(sys.argv[1], "rb")

if wf.getnchannels() != 1 or wf.getsampwidth() != 2 or wf.getframerate() != 16000:
    print("Audio must be WAV: Mono, 16-bit, 16kHz", file=sys.stderr)
    exit(1)

rec = KaldiRecognizer(model, wf.getframerate())
rec.SetWords(True)

final_result = ""

while True:
    data = wf.readframes(4000)
    if len(data) == 0:
        break
    if rec.AcceptWaveform(data):
        result = json.loads(rec.Result())
        final_result += result.get("text", "") + " "

final = json.loads(rec.FinalResult())
final_result += final.get("text", "")

print(final_result.strip())
