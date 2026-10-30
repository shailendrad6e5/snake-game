const board = document.querySelector(".bottom");
const startBtn = document.querySelector(".start-btn");
const startAgain = document.querySelector("#start-again");
const menu = document.querySelector("#main-menu");
const model = document.querySelector(".model");
const modelContent = document.querySelector(".model-content");
const modelScore = document.querySelector("#score-value");
const score = document.querySelector("#scoreValue");
const highScore = document.querySelector("#highScoreValue");
let highScoreValue = 0;
const cellSize = 40;
const rows = Math.floor(board.clientHeight / cellSize);
const cols = Math.floor(board.clientWidth / cellSize);
const blocks = [];
const allowedKeys = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"];
let foodx, foody;
let intervalId = undefined;
let checkGameOver = false;
let scorevalue = 0;
let direction = "ArrowDown";
let food = null;
let snake = null;

window.addEventListener("keydown", (e) => {
  if (allowedKeys.includes(e.key)) {
    if (
      (direction == "ArrowRight" && e.key != "ArrowLeft") ||
      (direction == "ArrowLeft" && e.key != "ArrowRight") ||
      (direction == "ArrowUp" && e.key != "ArrowDown") ||
      (direction == "ArrowDown" && e.key != "ArrowUp")
    )
      direction = e.key;
  }
});

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const div = document.createElement("div");
    // div.textContent = `${row}-${col}`;
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
    blocks[`${food.x}-${food.y}`].classList.add("food");
    foodx = food.x;
    foody = food.y;
  } while (snake.some((seg) => seg.x == food.x && seg.y == food.y));
}

function startGame() {
  snake = [
    {
      x: 1,
      y: 5,
    },
    {
      x: 1,
      y: 4,
    },
  ];
  model.style.display = "none";
  scorevalue = 0;
  score.textContent = 0;

  loadFood();
  intervalId = setInterval(() => {
    rendor();
  }, 400);
}

function hideModal() {
  model.style.display = "none";
  scorevalue = 0;
  score.textContent = 0;
}

function gameOver() {
  clearInterval(intervalId);
  snake.forEach((seg) => {
    blocks[`${seg.x}-${seg.y}`].classList.remove("fill");
    modelScore.textContent = scorevalue;
  });
  scorevalue = 0;
  blocks[`${foodx}-${foody}`].classList.remove("food");
  model.style.display = "flex";
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
    if (highScoreValue <= scorevalue) {
      highScoreValue = scorevalue;
      highScore.textContent = highScoreValue;
    }
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    snake.unshift(head);
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
