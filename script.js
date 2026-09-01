console.log("JS file chal gayi hai!");
let audioPlayer = new Audio();
let hasAudio = false;

const button = document.getElementById("translateButton");
const loadingText = document.getElementById("loadingText"); // Loader element

button.addEventListener("click", async function () {
    const text = document.getElementById("inputText").value;
    const source = document.getElementById("sourceLanguage").value;
    const target = document.getElementById("targetLanguage").value;

    if (text.trim() === "") {
        alert("Please enter some text.");
        return;
    }

    // 1. Translate shuru hote hi loader dikhao
    if (loadingText) {
        loadingText.style.display = "block";
    }

    try {
        const response = await fetch("/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: text,
                source: source,
                target: target
            })
        });

        const data = await response.json();

        // Translation text ko box mein dikhana
        document.getElementById("translationText").value = data.translation;

        // Audio set karna
        if (data.audio) {
            audioPlayer.src = "data:audio/mp3;base64," + data.audio;
            hasAudio = true;
        } else {
            hasAudio = false;
        }

    } catch (error) {
        console.error(error);
        alert("Translation failed.");
    } finally {
        // 2. Kaam khatam hone par loader ko wapas chhupa do
        if (loadingText) {
            loadingText.style.display = "none";
        }
    }
});

const copyButton = document.getElementById("copyButton");

copyButton.addEventListener("click", function() {
    const translation = document.getElementById("translationText").value;
    navigator.clipboard.writeText(translation);
    alert("Translation copied!");
});

const speakButton = document.getElementById("speakButton");

speakButton.addEventListener("click", function () {
    const translation = document.getElementById("translationText").value;

    if (translation.trim() === "") {
        alert("Please translate something first.");
        return;
    }

    if (hasAudio) {
        audioPlayer.currentTime = 0; 
        audioPlayer.play();
        console.log("Playing audio from Python gTTS!");
    } else {
        alert("Audio load nahi hui, please dobara translate par click karein.");
    }
});

// Swap Button Logic
const swapButton = document.getElementById("swapButton");

swapButton.addEventListener("click", function () {
    const sourceLang = document.getElementById("sourceLanguage");
    const targetLang = document.getElementById("targetLanguage");
    const inputText = document.getElementById("inputText");
    const translationText = document.getElementById("translationText");

    // Languages aapas mein badalna
    const tempLang = sourceLang.value;
    sourceLang.value = targetLang.value;
    targetLang.value = tempLang;

    // Textboxes ka text bhi aapas mein badalna
    const tempText = inputText.value;
    inputText.value = translationText.value;
    translationText.value = tempText;
});

// Dark Mode Toggle Logic
const darkModeToggle = document.getElementById("darkModeToggle");

darkModeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    // Button ka text aur icon badalna
    if (document.body.classList.contains("dark-mode")) {
        darkModeToggle.textContent = "☀️ Light Mode";
        darkModeToggle.style.background = "#f0f0f0";
        darkModeToggle.style.color = "#000";
    } else {
        darkModeToggle.textContent = "🌙 Dark Mode";
        darkModeToggle.style.background = "#333";
        darkModeToggle.style.color = "#fff";
    }
});