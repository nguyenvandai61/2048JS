var data = [];
var pos;
var score = 0;
var scoreDOM = document.getElementById("score");
var restartBtn = document.getElementById("restart-btn");
var gameoverDOM = document.getElementById("gameover");
var isPlaying = true;

restartBtn.addEventListener("click", restartGame);
gameoverDOM.style.display = "none";

initData();
do {
  pos = getRandomPos();
} while (data[pos.x][pos.y] !== 0);
data[pos.x][pos.y] = getRandom();
getTable();


document.getElementById("main").append(getTable());
document.addEventListener("keydown", function(event) {
  if (isPlaying) {
    if (event.keyCode == 37) {
      data = change(data, Direction.LEFT);
      showTable();
      console.log("left");
    } else if (event.keyCode == 40) {
      data = change(data, Direction.DOWN);
      showTable();
      console.log("down");
    } else if (event.keyCode == 38) {
      data = change(data, Direction.UP);
      console.log("up");
      showTable();
    } else if (event.keyCode == 39) {
      data = change(data, Direction.RIGHT);
      showTable();
      console.log("right");
    }
    scoreDOM.innerHTML = score;
    do {
      pos = getRandomPos();
    } while (data[pos.x][pos.y] !== 0);

    data[pos.x][pos.y] = getRandom();
  }
});

document.addEventListener("keyup", function(event) {
  showTable();
  if (checkLose()) {
    isPlaying = false;
    gameoverDOM.style.display = "block";
  }
});

function checkLose() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (data[i][j] === 0) {
        return false;
      }
    }
  }
  return true;
}

function initData() {
  for (let i = 0; i < 4; i++) {
    data.push([0, 0, 0, 0]);
  }
}

function getTable() {
  let tableDOM = document.createElement("tbody");

  for (let i = 0; i < 4; i++) {
    let rowDOM = document.createElement("tr");
    rowDOM.setAttribute("key", i);
    for (let j = 0; j < 4; j++) {
      let colDOM = document.createElement("td");
      colDOM.setAttribute("key", j);
      colDOM.innerText = "";
      rowDOM.appendChild(colDOM);
    }
    tableDOM.appendChild(rowDOM);
  }
  return tableDOM;
}

function showTable() {
  var t = document.getElementsByTagName("tbody")[0];

  var d = t.getElementsByTagName("tr");
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      d[i].getElementsByTagName("td")[j].innerText =
        data[i][j] === 0 ? "" : data[i][j];
      d[i].getElementsByTagName("td")[j].style.background = pickColor(
        data[i][j]
      );
    }
  }
}
function pickColor(value) {
  switch (value) {
    case 0:
      return "#ccbfb3";
    case 2:
      return "#f0e6dc";
    case 4:
      return "#ede0c8";
    case 8:
      return "#f2b179";
    case 16:
      return "#f59563";
    case 32:
      return "#f67c5f";
    case 64:
      return "#dd5633";
    case 128:
    case 256:
    case 512:
      return "e7c03d";
    case 1024:
    case 2048:
      return "#dd5633";
    case 4096:
    case 8192:
      return "#3d3a33";
  }
}
function getRandom() {
  return 2;
}

function getRandomPos() {
  let x, y;
  x = Math.floor(Math.random() * 4);
  y = Math.floor(Math.random() * 4);
  return { x, y };
}

var Direction = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3
};

const cleanZero = col => {
  let newCol = [];
  for (let i = 0; i < 4; i++) {
    if (col[i] !== 0) {
      newCol.push(col[i]);
    }
  }
  return newCol;
};

const rotateBoardLeft = board => {
  let newBoard = [];
  for (let i = 0; i < 4; i++) {
    let newRow = [];
    for (let j = 0; j < 4; j++) {
      newRow.push(board[3 - j][i]);
    }
    newBoard.push(newRow);
  }
  return newBoard;
};

const rotateBoardRight = board => {
  let newBoard = [];
  for (let i = 0; i < 4; i++) {
    let newRow = [];
    for (let j = 0; j < 4; j++) {
      newRow.push(board[j][3 - i]);
    }
    newBoard.push(newRow);
  }
  return newBoard;
};

const changeCol = col => {
  // Press UP-ARROW

  let newCol = cleanZero(col);
  for (let i = 0; i < newCol.length; i++) {
    if (newCol[i] != 0 && newCol[i] == newCol[i + 1]) {
      // Plus score:
      score += newCol[i] * 2;
      newCol[i] *= 2;
      newCol[i + 1] = 0;
      if (newCol[i + 2]) {
        newCol[i + 1] = newCol[i + 2];
        newCol.pop();
        if (newCol[i + 1] === newCol[i + 2]) {
          score += newCol[i + 1] * 2;
          newCol[i + 1] *= 2;
          newCol.pop();
        }
      }
      i++;
    }
  }

  while (newCol.length != 4) {
    newCol.push(0);
  }
  return newCol;
};

const change = (board, direction) => {
  let newBoard = [];
  switch (direction) {
    case Direction.LEFT:
      for (let i = 0; i < 4; i++) {
        newBoard.push(changeCol(board[i]));
      }
      break;
    case Direction.DOWN:
      board = rotateBoardLeft(board);
      for (let i = 0; i < 4; i++) {
        newBoard.push(changeCol(board[i]));
      }
      newBoard = rotateBoardRight(newBoard);
      break;
    case Direction.UP:
      board = rotateBoardRight(board);
      for (let i = 0; i < 4; i++) {
        newBoard.push(changeCol(board[i]));
      }
      newBoard = rotateBoardLeft(newBoard);

      break;
    case Direction.RIGHT:
      board = rotateBoardRight(board);
      board = rotateBoardRight(board);
      for (let i = 0; i < 4; i++) {
        newBoard.push(changeCol(board[i]));
      }
      newBoard = rotateBoardLeft(newBoard);
      newBoard = rotateBoardLeft(newBoard);
    default:
  }
  return newBoard;
};

function restartGame() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      data[i][j] = 0;
    }
  }
  score = 0;
  gameoverDOM.style.display = "none";
  showTable();
  isPlaying = true;
}
