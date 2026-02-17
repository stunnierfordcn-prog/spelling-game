const targetWord = "MATUTULOG";
let guessed = Array(targetWord.length).fill("_");
let lives = 5;

const wordDisplay = document.getElementById("wordDisplay");
const keyboard = document.getElementById("keyboard");
const videoContainer = document.getElementById("videoContainer");
const video = document.getElementById("video");

/* ===== UPDATE DISPLAY ===== */
function updateDisplay() {
  wordDisplay.textContent = guessed.join(" ");
}

/* ===== CHECK WIN ===== */
function checkWin() {
  if (!guessed.includes("_")) {
    setTimeout(() => {
      document.querySelector(".wrapper-center").style.display = "none";
      videoContainer.style.display = "flex";
      video.play();
    }, 500);
  }
}

/* ===== GAME OVER ===== */
function gameOver() {
  alert("Game Over! The word was: " + targetWord);
  location.reload();
}

/* ===== HANDLE KEY ===== */
function handleKey(letter, button) {
  button.disabled = true;
  button.classList.add("clicked");

  let found = false;

  for (let i = 0; i < targetWord.length; i++) {
    if (targetWord[i] === letter && guessed[i] === "_") {
      guessed[i] = letter;
      found = true;
    }
  }

  if (!found) {
    lives--;
    if (lives <= 0) {
      gameOver();
      return;
    }
  }

  updateDisplay();
  checkWin();
}

/* ===== KEYBOARD LAYOUT ===== */
const rows = [
  "ABCDEFGHIJ".split(""),
  "KLMNOPQRST".split(""),
  "UVWXYZ".split("")
];

rows.forEach(row => {
  const rowDiv = document.createElement("div");
  rowDiv.className = "row";

  row.forEach(letter => {
    const btn = document.createElement("button");
    btn.textContent = letter;
    btn.className = "key";

    btn.onclick = () => handleKey(letter, btn);

    rowDiv.appendChild(btn);
  });

  keyboard.appendChild(rowDiv);
});

updateDisplay();