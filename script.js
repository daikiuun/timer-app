// script.js

let seconds = 0;
let interval;
let isPaused = false;
const audio = document.getElementById("audio");

// 音声ファイルアップロード処理
const soundInput = document.getElementById("soundFile");
soundInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    audio.src = url;
    localStorage.setItem("customSoundURL", url);
  }
});

// タイマー表示更新
function updateDisplay() {
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  document.getElementById("time").textContent = `${mins}:${secs}`;
}

// スタート処理
function startTimer() {
  if (!isPaused) {
    const minutes = parseInt(document.getElementById("minutes").value);
    seconds = minutes * 60;
  }
  clearInterval(interval);
  interval = setInterval(() => {
    if (!isPaused) {
      seconds--;
      updateDisplay();
      if (seconds <= 0) {
        clearInterval(interval);
        isPaused = false;
        if (audio.src) audio.play();
        else alert("時間です！");
      }
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(interval);
  isPaused = true;
}

function resetTimer() {
  clearInterval(interval);
  isPaused = false;
  seconds = 0;
  updateDisplay();
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("darkMode", isDark ? "on" : "off");
}

// 初期化（読み込み時）
window.addEventListener("DOMContentLoaded", () => {
  const savedURL = localStorage.getItem("customSoundURL");
  if (savedURL) audio.src = savedURL;

  if (localStorage.getItem("darkMode") === "on") {
    document.body.classList.add("dark");
  }
});
