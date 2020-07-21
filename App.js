// globals

const ROWS = 9;
let openedCells = 0;
let gameOver = false;

const message = document.getElementById("win");

let board = [
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
];

// startGame, resetGame, makeMove, placeBombs

const placeBombs = () => {
  let bombsToBePlaced = 10;
  while (bombsToBePlaced > 0) {
    let row = Math.floor(Math.random() * ROWS);
    let col = Math.floor(Math.random() * ROWS);

    if (board[row][col] === "bomb") continue;
    board[row][col] = "bomb";
    bombsToBePlaced -= 1;
  }
};

const makeMove = (clickedElement, row, col) => {
  if (gameOver) return;

  // user clicks a bomb
  if (board[row][col] === "bomb") {
    // blast all bombs
    const cells = document.querySelectorAll("td");
    // iterate through board
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < ROWS; c++) {
        if (board[r][c] === "bomb") {
          let flatIndex = r * ROWS + c;
          cells[flatIndex].classList.add("red");
          cells[flatIndex].innerHTML = "💣";
        }
      }
    }
  } else {
    // check adajacent 8 cells
    let bombCount = 0;
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        let newRow = row + x;
        let newCol = col + y;
        if (board[newRow] && board[newRow][newCol] === "bomb") bombCount += 1;
      }
    }
    /*
		  (row + x, col + y)
		  x: -1, 0, 1
		  y: -1, 0, 1

		  (row + 1, col)
		  (row, col + 1)
		  (row - 1, col)
		  (row, col - 1)
		  (row - 1, col - 1)
		  (row + 1, col + 1)
		  (row - 1, col + 1)
		  (row + 1, col - 1)
		*/

    board[row][col] = "opened";
    clickedElement.classList.add("green");
    clickedElement.innerHTML = bombCount;
    openedCells += 1;
  }

  // gameover conditions
  if (board[row][col] === "bomb" || openedCells === 71) {
    gameOver = true;
    message.innerHTML = `<strong>Score: ${openedCells}</strong>`;
    message.classList.remove("hidden");
  }
};

const resetGame = () => {
  // reset globals
  board = new Array(ROWS);
  for (let i = 0; i < ROWS; i++) board[i] = new Array(ROWS).fill(null);

  openedCells = 0;
  gameOver = false;
  message.classList.add("hidden");

  // reset our tds
  const cells = document.querySelectorAll("td");
  cells.forEach((cell) => {
    cell.innerHTML = "&nbsp;";
    cell.classList.remove("red");
    cell.classList.remove("green");
  });

  startGame();
};

const startGame = () => {
  placeBombs();
};

startGame();
