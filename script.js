"use strict";

//Selecting Modal Elements
const rulesBtn = document.querySelector(".rules-btn");
const closeIcon = document.querySelector(".close-icon");
const rulesModal = document.querySelector(".rules-modal");
const overlay = document.querySelector(".overlay");

//Selecting Game Elements
const icons = document.querySelectorAll(".icon");
const player0 = document.querySelector(".player-0");
const player1 = document.querySelector(".player-1");
const player0Img = document.querySelector(".player-0-img");
const player1Img = document.querySelector(".player-1-img");

//Steps
const firstStep = document.querySelector(".first-step");
const secondStep = document.querySelector(".second-step");

//Result
const gameResultEl = document.querySelector(".game-result");
const scoreEl = document.querySelector(".score");
const againBtn = document.querySelector(".again-btn");

//Game Level Elements
const levelBtn = document.querySelectorAll(".level-btn");
const originalGame = document.querySelector(".original");
const bonusGame = document.querySelector(".bonus");
const logo = document.querySelector(".logo");
const rules = document.querySelector(".rules");

const gameNumberEl = document.querySelector(".game-number");
const houseScoreEl = document.querySelector(".house-score");

const winnerName = document.querySelector(".winner-name");

// Game Stats
let houseScore, yourScore, gameNumber;

let yourChoice, houseChoice;
let activePlayer = 0;
let playing = true;
let winningCouples;
const originalWinningCouples = ["01", "12", "20"];
const bonusWinningCouples = [
  "01",
  "12",
  "23",
  "34",
  "40",
  "20",
  "14",
  "03",
  "42",
  "31",
];
const classNames = [
  "icon-scissors",
  "icon-paper",
  "icon-rock",
  "icon-lizard",
  "icon-spock",
];
let result = "";
let activeGame = 3;

const clearChoice = function (player) {
  for (let i = 0; i < classNames.length; i++) {
    document.querySelector(`.player-${player}`).classList.remove(classNames[i]);
  }
  document.querySelector(`.player-${activePlayer}`).classList.remove("bigger");
  document.querySelector(`.player-${player}-img`).src = "";
  document.querySelector(`.player-${player}-img`).alt = "";
};

//Init game
const init = function () {
  houseScore = 0;
  yourScore = 0;
  gameNumber = 0;
  playing = true;
  activePlayer = 0;

  player0.classList.remove("winner");
  player1.classList.remove("winner");

  clearChoice(0);
  clearChoice(1);
};

init();

//Adds src, alt and corresponding className to the activePl yer's choice
const activePlayerChoice = function (className, src, alt) {
  document.querySelector(`.player-${activePlayer}`).classList.add(className);
  document.querySelector(`.player-${activePlayer}`).classList.add("bigger");
  document.querySelector(`.player-${activePlayer}-img`).src = src;
  document.querySelector(`.player-${activePlayer}-img`).alt = alt;
};

const iconPicker = function (userChoice) {
  switch (userChoice) {
    case 0: {
      activePlayerChoice(
        "icon-scissors",
        "./images/icon-scissors.svg",
        "Scissors"
      );
      break;
    }
    case 1: {
      activePlayerChoice("icon-paper", "./images/icon-paper.svg", "Paper");
      break;
    }
    case 2: {
      activePlayerChoice("icon-rock", "./images/icon-rock.svg", "Rock");
      break;
    }
    case 3: {
      activePlayerChoice("icon-lizard", "./images/icon-lizard.svg", "Lizard");
      break;
    }
    case 4: {
      activePlayerChoice("icon-spock", "./images/icon-spock.svg", "Spock");
      break;
    }
    default:
      break;
  }
};

const levelSettings = function (level = 3) {
  if (Number(level) === 3) {
    rules.src = "./images/image-rules.svg";
    logo.src = "./images/logo.svg";
    logo.alt = "Rock Paper Scissors Logo";
    winningCouples = originalWinningCouples;
  } else if (Number(level) === 5) {
    rules.src = "./images/image-rules-bonus.svg";
    logo.src = "./images/logo-bonus.svg";
    logo.alt = "Rock Paper Scissors Lizard Spock Logo";
    winningCouples = bonusWinningCouples;
  }
  activeGame = Number(level);
};

levelSettings();

for (let i = 0; i < icons.length; i++) {
  icons[i].addEventListener("click", function () {
    gameNumber++;
    gameNumberEl.textContent = gameNumber;

    if (activeGame === 3 || activeGame === 5) {
      originalGame.classList.add("hidden");
      bonusGame.classList.add("hidden");
      secondStep.classList.remove("hidden");
    }

    if (playing) {
      if (activePlayer === 0) {
        yourChoice = Number(icons[i].value);
        result += yourChoice;
        iconPicker(yourChoice);
        activePlayer = 1;
      }

      if (activePlayer === 1) {
        player1.classList.remove("empty-icon");
        player1.classList.add("icon");
        player1.classList.add("bigger");

        houseChoice = Math.round(Math.random() * 2);
        result += houseChoice;
        iconPicker(houseChoice);
      }

      if (result[0] !== result[1]) {
        if (winningCouples.includes(result)) {
          gameResultEl.textContent = "You Win";
          player0.classList.add("winner");
          yourScore++;
          scoreEl.textContent = yourScore;
        } else {
          gameResultEl.textContent = "You Lose";
          player1.classList.add("winner");
          houseScore++;
          houseScoreEl.textContent = houseScore;
          yourScore--;
          scoreEl.textContent = yourScore;
        }
      } else {
        gameResultEl.textContent = "Equality";
      }

      playing = false;
    }
  });
}

againBtn.addEventListener("click", function () {
  result = "";
  activePlayer = 0;
  playing = true;
  secondStep.classList.add("hidden");

  if (activeGame === 3) {
    originalGame.classList.remove("hidden");
    bonusGame.classList.add("hidden");
  } else if (activeGame === 5) {
    bonusGame.classList.remove("hidden");
    originalGame.classList.add("hidden");
  }

  player0.classList.remove("winner");
  player1.classList.remove("winner");

  clearChoice(0);
  clearChoice(1);
});

for (let i = 0; i < levelBtn.length; i++) {
  levelBtn[i].addEventListener("click", function () {
    secondStep.classList.add("hidden");
    if (
      Number(levelBtn[i].value) === 3 &&
      originalGame.classList.contains("hidden")
    ) {
      originalGame.classList.remove("hidden");
      bonusGame.classList.add("hidden");
    } else if (
      Number(levelBtn[i].value) === 5 &&
      bonusGame.classList.contains("hidden")
    ) {
      originalGame.classList.add("hidden");
      bonusGame.classList.remove("hidden");
    }

    init();

    gameNumberEl.textContent = gameNumber;
    scoreEl.textContent = yourScore;
    houseScoreEl.textContent = houseScore;

    levelSettings(levelBtn[i].value);
  });
}

// Rules Modal Display

const openModal = function () {
  rulesModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  rulesModal.classList.add("hidden");
  overlay.classList.add("hidden");
};

rulesBtn.addEventListener("click", function () {
  openModal();
});

closeIcon.addEventListener("click", function () {
  closeModal();
});

overlay.addEventListener("click", function () {
  closeModal();
});
