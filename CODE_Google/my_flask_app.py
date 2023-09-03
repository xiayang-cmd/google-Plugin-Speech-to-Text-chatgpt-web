from flask import Flask, jsonify
from flask_cors import CORS

import threading
import pyaudio
import wave
import os
import openai


# 定义一个函数来读取文件内容
def read_from_file(filename):
    with open(filename, 'r', encoding='utf-8') as file:
        content = file.read()
    return content



app = Flask(__name__)
CORS(app)

# 录音相关的全局变量
is_recording = False
frames = []
audio = pyaudio.PyAudio()
stream = None

FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 44100
CHUNK = 1024
OUTPUT_FILENAME = "output.wav"

def record_audio():
    global is_recording, frames, stream,audio
    audio = pyaudio.PyAudio()
    stream = audio.open(format=FORMAT, channels=CHANNELS,
                        rate=RATE, input=True,
                        frames_per_buffer=CHUNK)

    while is_recording:
        data = stream.read(CHUNK)
        frames.append(data)


@app.route('/start', methods=['GET'])
def start_recording():
    global is_recording, frames, stream
    if not is_recording:
        is_recording = True
        threading.Thread(target=record_audio).start()
        return jsonify(message="Recording started"), 200
    else:
        return jsonify(message="Recording is already in progress"), 400

@app.route('/stop', methods=['GET'])
def stop_recording():
    global is_recording, frames, stream
    if is_recording:
        is_recording = False

        stream.stop_stream()
        stream.close()
        audio.terminate()

        with wave.open(OUTPUT_FILENAME, 'wb') as wf:
            wf.setnchannels(CHANNELS)
            wf.setsampwidth(audio.get_sample_size(FORMAT))
            wf.setframerate(RATE)
            wf.writeframes(b''.join(frames))

        print(f"File saved as {os.path.abspath(OUTPUT_FILENAME)}")
        frames = []  # 清空frames在这里，确保保存完音频后再清空
        stream = None
        
        api_key_content = read_from_file('api_key.txt')
        openai.api_key = api_key_content
        audio_file = open("output.wav", "rb")
        transcript = openai.Audio.transcribe("whisper-1", audio_file)
        print(transcript.text)

        messages = [
            {"role": "system", "content": "以下是我从语音转换而来的文本，可能存在语法错误、错别字、缺少标点、以及不连贯之处。请帮我修正并提高它的质量"},
            {"role": "user", "content": transcript.text},

        ]
        # 生成响应对话
        response = openai.ChatCompletion.create(model="gpt-3.5-turbo",
                                                messages=messages,
                                                max_tokens=150,)

        token_count = response["usage"]["total_tokens"]
        print("Token count: " + str(token_count))
        print(response['choices'][0]['message']['content'])

        response_content = response['choices'][0]['message']['content']

        return jsonify(message="Recording stopped", response=response_content), 200
    else:
        return jsonify(message="No recording in progress"), 400

if __name__ == '__main__':
    app.run(port=5000)
