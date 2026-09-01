from flask import Flask, render_template, request, jsonify
from deep_translator import GoogleTranslator
from gtts import gTTS
import base64
from io import BytesIO

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/translate", methods=["POST"])
def translate():
    data = request.get_json()

    text = data.get("text", "")
    source = data.get("source", "en")
    target = data.get("target", "hi")

    try:
        # 1. Text ko translate karna
        translation = GoogleTranslator(
            source=source,
            target=target
        ).translate(text)

        # 2. Translated text ka audio banana
        tts = gTTS(text=translation, lang=target)
        
        # 3. Audio ko memory mein save karke Base64 mein convert karna (browser ke liye)
        fp = BytesIO()
        tts.write_to_fp(fp)
        fp.seek(0)
        audio_base64 = base64.b64encode(fp.read()).decode('utf-8')

        return jsonify({
            "translation": translation,
            "audio": audio_base64  # Ye line frontend par audio bhejegi
        })

    except Exception as e:
        return jsonify({
            "translation": "Translation error: " + str(e),
            "audio": None
        })

if __name__ == "__main__":
    app.run(debug=True)