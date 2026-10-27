const board = document.querySelector(".bottom");
const cellSize = 40;
const row = Math.floor(board.clientHeight / cellSize);
const column = Math.floor(board.clientWidth / cellSize);
for(let i = 0; i < row*column; i++) {
    const div = document.createElement("div");
    div.classList.add("box");
    board.append(div);
}

