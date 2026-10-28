const board = document.querySelector(".bottom");
const startBtn = document.querySelector(".start-btn");
const startAgain = document.querySelector("#start-again");
const menu = document.querySelector("#main-menu");
const model = document.querySelector(".model");
const modelContent = document.querySelector(".model-content");
const cellSize = 40;
const rows = Math.floor(board.clientHeight / cellSize);
const cols = Math.floor(board.clientWidth / cellSize);
const blocks = [];
let food = null;
let head = null;
let snake = [
  {
    x: 1,
    y: 2,
  },
  {
    x: 1,
    y: 3,
  },
];

function hideModal() {
  model.style.display = "none";
}

food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const div = document.createElement("div");
    div.textContent = `${row}-${col}`;
    div.classList.add("box");
    board.append(div);

    blocks[`${row}-${col}`] = div;
  }
}

blocks[`${food.x}-${food.y}`].classList.add("food");
function rendor() {
  let head = null;
  snake.forEach((seg) => {
    blocks[`${seg.x}-${seg.y}`].classList.add("fill");
    window.addEventListener("keydown",(elem)=>{
        
    })
  });
}
startBtn.addEventListener("click", hideModal);
startAgain.addEventListener("click", hideModal);
menu.addEventListener("click", hideModal);

setTimeout(() => {
  rendor();
}, 600);
