const board = document.querySelector(".bottom");
const startBtn = document.querySelector(".start-btn");
const startAgain = document.querySelector("#start-again");
const menu = document.querySelector("#main-menu");
const model = document.querySelector(".model");
const modelContent = document.querySelector(".model-content");
const modelScore = document.querySelector("#score-value");
const score = document.querySelector("#scoreValue");
const highScore = document.querySelector("#highScoreValue");
const timer = document.querySelector("#Timer");
let highScoreValue = localStorage.getItem("highScore")
  ? parseInt(localStorage.getItem("highScore"), 10)
  : 0;
const cellSize = 40;
let rows = Math.floor(board.clientHeight / cellSize);
let cols = Math.floor(board.clientWidth / cellSize);
let blocks = [];
const allowedKeys = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"];
let intervalId = undefined;
let timeIntervalId = undefined;
let isGameRunning = false;
let scorevalue = 0;
let direction = "ArrowDown";
let min = 0;
let sec = 0;
let food = null;
let snake = null;
highScore.textContent = highScoreValue;
window.addEventListener("keydown", (e) => {
  if (allowedKeys.includes(e.key) && isGameRunning) {
    if (
      (direction == "ArrowRight" && e.key != "ArrowLeft") ||
      (direction == "ArrowLeft" && e.key != "ArrowRight") ||
      (direction == "ArrowUp" && e.key != "ArrowDown") ||
      (direction == "ArrowDown" && e.key != "ArrowUp")
    )
      direction = e.key;
  }
});

window.addEventListener("resize", (e) => {
  if (isGameRunning) blocks[`${food.x}-${food.y}`].classList.remove("food");
  rows = Math.floor(board.clientHeight / cellSize);
  cols = Math.floor(board.clientWidth / cellSize);
  board.innerHTML = "";
  blocks = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const div = document.createElement("div");
      div.classList.add("box");
      board.append(div);
      blocks[`${row}-${col}`] = div;
    }
  }
  if (isGameRunning) loadFood();
});

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const div = document.createElement("div");
    div.classList.add("box");
    board.append(div);
    blocks[`${row}-${col}`] = div;
  }
}

function loadFood() {
  do {
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
  } while (snake.some((seg) => seg.x == food.x && seg.y == food.y));

  blocks[`${food.x}-${food.y}`].classList.add("food");
}

function startGame() {
  if (isGameRunning === true) return;
  isGameRunning = true;
  snake = [
    {
      x: 0,
      y: 0,
    },
    {
      x: 1,
      y: 0,
    },
  ];
  model.style.display = "none";
  scorevalue = 0;
  score.textContent = 0;

  intervalId = setInterval(() => {
    rendor();
  }, 400);

  loadFood();

  timeIntervalId = setInterval(() => {
    if (sec > 59) {
      sec = 0;
      min++;
    } else {
      sec++;
    }

    timer.textContent = `${min}-${sec}`;
  }, 1000);
}

function hideModal() {
  model.style.display = "none";
  scorevalue = 0;
  score.textContent = 0;
}

function gameOver() {
  clearInterval(intervalId);
  clearInterval(timeIntervalId);
  snake.forEach((seg) => {
    blocks[`${seg.x}-${seg.y}`].classList.remove("fill");
  });
  blocks[`${food.x}-${food.y}`].classList.remove("food");
  model.style.display = "flex";
  modelScore.textContent = scorevalue;
  scorevalue = 0;
  direction = "ArrowDown";
  isGameRunning = false;
  min = 0;
  sec = 0;
  timer.textContent = `${min}-${sec}`;
}

function rendor() {
  let head = null;

  snake.forEach((seg) => {
    blocks[`${seg.x}-${seg.y}`].classList.remove("fill");
  });

  if (direction == "ArrowRight") head = { x: snake[0].x, y: snake[0].y + 1 };
  else if (direction == "ArrowLeft")
    head = { x: snake[0].x, y: snake[0].y - 1 };
  else if (direction == "ArrowUp") head = { x: snake[0].x - 1, y: snake[0].y };
  else if (direction == "ArrowDown")
    head = { x: snake[0].x + 1, y: snake[0].y };

  if (head.x < 0 || head.y < 0) {
    if (head.x < 0) head.x = rows - 1;
    else head.y = cols - 1;
  } else if (head.x >= rows || head.y >= cols) {
    if (head.x >= rows) head.x = 0;
    if (head.y >= cols) head.y = 0;
  }

  if (head.x == food.x && head.y == food.y) {
    scorevalue++;
    score.textContent = scorevalue;
    if (highScoreValue < scorevalue) {
      highScoreValue = scorevalue;
      highScore.textContent = highScoreValue;
      localStorage.setItem("highScore", highScoreValue);
    }
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    snake.unshift(head);
    if (snake.length == rows * cols) {
      gameOver();
      return;
    }
    loadFood();
  } else {
    snake.pop();
    snake.unshift(head);
  }

  snake.forEach((seg) => {
    blocks[`${seg.x}-${seg.y}`].classList.add("fill");
  });

  if (snake.slice(1).some((seg) => seg.x == head.x && seg.y == head.y)) {
    gameOver();
  }
}

startBtn.addEventListener("click", startGame);
startAgain.addEventListener("click", startGame);
menu.addEventListener("click", hideModal);
