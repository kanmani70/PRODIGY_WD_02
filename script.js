
let startTime;
let updatedTime;
let difference;
let tInterval;
let savedTime = 0;
let isRunning = false;
let isPaused = false;

const display = document.getElementById('display');
const lapsContainer = document.getElementById('laps');

// Get audio elements
const clickSound = document.getElementById('click-sound');
const lapSound = document.getElementById('lap-sound');
const resetSound = document.getElementById('reset-sound');

// Button click handlers
document.getElementById('start').onclick = () => {
    startTimer();
    playSound(clickSound);
};
document.getElementById('stop').onclick = () => {
    stopTimer();
    playSound(clickSound);
};
document.getElementById('pause').onclick = () => {
    pauseTimer();
    playSound(clickSound);
};
document.getElementById('resume').onclick = () => {
    resumeTimer();
    playSound(clickSound);
};
document.getElementById('lap').onclick = () => {
    recordLap();
    playSound(lapSound);
};
document.getElementById('reset').onclick = () => {
    resetTimer();
    playSound(resetSound);
};

function startTimer() {
    if (!isRunning) {
        startTime = Date.now();
        tInterval = setInterval(updateDisplay, 10); // Update every 10 milliseconds
        isRunning = true;
        isPaused = false;
    }
}

function updateDisplay() {
    if (isPaused) return;

    updatedTime = Date.now();
    difference = updatedTime - startTime + savedTime;
    
    let hours = Math.floor(difference / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10); // Get milliseconds

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds; // Two digits for milliseconds

    display.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function stopTimer() {
    clearInterval(tInterval);
    savedTime = 0;
    isRunning = false;
    isPaused = false;
}

function pauseTimer() {
    if (isRunning && !isPaused) {
        clearInterval(tInterval);
        savedTime += Date.now() - startTime;
        isPaused = true;
    }
}

function resumeTimer() {
    if (isPaused) {
        startTime = Date.now();
        tInterval = setInterval(updateDisplay, 10);
        isPaused = false;
        isRunning = true;
    }
}

function recordLap() {
    if (isRunning) {
        let lapTime = document.createElement('div');
        lapTime.className = 'lap';
        lapTime.textContent = display.textContent;
        lapsContainer.appendChild(lapTime);
    }
}

function resetTimer() {
    clearInterval(tInterval);
    display.textContent = "00:00:00.00";
    savedTime = 0;
    isRunning = false;
    isPaused = false;
    lapsContainer.innerHTML = ""; // Clear lap times
}

// Function to play sound
function playSound(sound) {
    sound.currentTime = 0; // Reset sound to start
    sound.play();
}
