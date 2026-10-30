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
let scorevalue = 0;
let direction = "ArrowDown";
let food = null;
let snake = [
  {
    x: 1,
    y: 3,
  },
  {
    x: 1,
    y: 2,
  },
];

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

function hideModal() {
  score.textContent = 0;
  model.style.display = "none";
  const intervalId = setInterval(() => {
    rendor();
  }, 400);
}

function loadFood() {
  do {
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
    blocks[`${food.x}-${food.y}`].classList.add("food");
  } while (snake.some((seg) => seg.x == food.x && seg.y == food.y));
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
}

startBtn.addEventListener("click", hideModal);
startAgain.addEventListener("click", hideModal);
menu.addEventListener("click", hideModal);
loadFood();
