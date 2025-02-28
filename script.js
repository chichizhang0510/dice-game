"use strict";

function refreshGame() {
  document.querySelector(".player--0 .score").textContent = 0;
  document.querySelector(".player--1 .score").textContent = 0;
  document.querySelector(".player--0 .current-score").textContent = 0;
  document.querySelector(".player--1 .current-score").textContent = 0;
  document.querySelector(".player--0").classList.add("player--active");
  document.querySelector(".player--1").classList.remove("player--active");
  document.querySelector(".player--0 .name").textContent = "Player 1";
  document.querySelector(".player--1 .name").textContent = "Player 2";
  document.querySelector(".dice").src = `dice-${1}.png`;

  enableButtons();
}

function disableButtons() {
  document.querySelector(".btn--roll").disabled = true;
  document.querySelector(".btn--hold").disabled = true;
}

function enableButtons() {
  document.querySelector(".btn--roll").disabled = false;
  document.querySelector(".btn--hold").disabled = false;
}

function switchPlayer() {
  document.querySelector(".player--active .current-score").textContent = 0;
  document.querySelector(".player--0").classList.toggle("player--active");
  document.querySelector(".player--1").classList.toggle("player--active");
}

let refreshBtn = document.querySelector(".btn--new");
refreshBtn.addEventListener("click", refreshGame);

function runRoll() {
  let randomNumber = Math.floor(Math.random() * 6 + 1);
  document.querySelector(".dice").src = `dice-${randomNumber}.png`;

  if (randomNumber == 1) {
    switchPlayer();
  } else {
    let currentScore = Number(
      document.querySelector(".player--active .current-score").textContent
    );
    currentScore += randomNumber;
    document.querySelector(".player--active .current-score").textContent =
      currentScore;
  }
}

let rollBtn = document.querySelector(".btn--roll");
rollBtn.addEventListener("click", runRoll);

let holdBtn = document.querySelector(".btn--hold");
holdBtn.addEventListener("click", function () {
  let currentScore = Number(
    document.querySelector(".player--active .current-score").textContent
  );
  let score = Number(
    document.querySelector(".player--active .score").textContent
  );
  let totalScore = currentScore + score;
  document.querySelector(".player--active .score").textContent = totalScore;
  document.querySelector(".player--active .current-score").textContent = 0;

  if (totalScore >= 100) {
    document.querySelector(".player--active .name").textContent += " 🏆";
    disableButtons();
  }
});
