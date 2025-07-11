let timer = null;
let totalSeconds = 0;
let paused = false;

const hourInput = document.getElementById("hours");
const minInput = document.getElementById("minutes");
const secInput = document.getElementById("seconds");

const startBtn = document.querySelector(".startBtn");
const resetBtn = document.querySelector(".resetBtn");

function updateInputs(seconds) {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  hourInput.value = hrs;
  minInput.value = mins;
  secInput.value = secs;
}

function getInputSeconds() {
  const hrs = parseInt(hourInput.value) || 0;
  const mins = parseInt(minInput.value) || 0;
  const secs = parseInt(secInput.value) || 0;
  return hrs * 3600 + mins * 60 + secs;
}

function startCountdown() {
  if (timer) return; 

  if (!paused) {
    totalSeconds = getInputSeconds();
    if (totalSeconds <= 0) return;
  }

  timer = setInterval(() => {
    totalSeconds--;
    updateInputs(totalSeconds);

    if (totalSeconds <= 0) {
      clearInterval(timer);
      timer = null;
      paused = false;
      updateInputs(0);
    }
  }, 1000);
  paused = false;
}

function pauseCountdown() {
  if (timer) {
    clearInterval(timer);
    timer = null;
    paused = true;
  }
}

function toggleStartPause() {
  if (paused || !timer) {
    startCountdown();
    startBtn.src = "./img/pause.png ";
  } else {
    pauseCountdown();
    startBtn.src = "./img/start-default.png";
  }
}

function resetCountdown() {
  clearInterval(timer);
  timer = null;
  paused = false;
  updateInputs(0);
  startBtn.src = "./img/start-default.png";
}

startBtn.addEventListener("click", toggleStartPause);
resetBtn.addEventListener("click", resetCountdown);
