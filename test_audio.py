from gtts import gTTS

# 1. Text jo hum bulwana chahte hain
text = "Hello, your audio feature is working perfectly!"

# 2. gTTS ko use karke audio banayenge (English ke liye 'en')
tts = gTTS(text=text, lang='en')

# 3. Audio file ko save karenge
tts.save("test.mp3")

print("Audio file 'test.mp3' successfully ban gayi hai! Folder check karo.")