var assert = require("assert");
//var board = [[0, 2, 2, 2], [0, 2, 0, 2], [0, 0, 0, 0], [0, 0, 0, 0]];

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
      newCol[i] *= 2;
      newCol[i + 1] = 0;
      if (newCol[i + 2]) {
        newCol[i + 1] = newCol[i + 2];
        newCol.pop();
        if (newCol[i + 1] === newCol[i + 2]) {
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

//change(board);
it("Test case 1", () => {
  let board = [[0, 2, 0, 2], [0, 2, 0, 2], [0, 0, 2, 0], [0, 0, 0, 0]];
  let trueRes = [[4, 0, 0, 0], [4, 0, 0, 0], [2, 0, 0, 0], [0, 0, 0, 0]];
  assert.deepEqual(change(board, Direction.LEFT), trueRes);
});

it("Test case 2", () => {
  let board = [[0, 2, 2, 2], [0, 2, 0, 2], [2, 0, 4, 2], [0, 0, 0, 4]];
  let trueRes = [[4,2,0,0], [4, 0, 0, 0], [2, 4, 2, 0], [4, 0, 0, 0]];
  assert.deepEqual(change(board, Direction.LEFT), trueRes);
});

it("Test case 3", () => {
  let board = [[0, 2, 4, 2], [8, 2, 2, 2], [2, 4, 4, 2], [0, 0, 0, 4]];
  let trueRes = [[2, 4, 2, 0], [8, 4, 2, 0], [2, 8, 2, 0], [4, 0, 0, 0]];
  assert.deepEqual(change(board, Direction.LEFT), trueRes);
});
it("Test case 4", () => {
  let board = [[0, 0, 2, 4], [0, 2, 2, 2], [0, 0, 4, 2], [4, 0, 2, 0]];
  let trueRes = [[0, 0, 2, 4], [0, 0, 2, 4], [0, 0, 4, 2], [0, 0, 4, 2]];
  assert.deepEqual(change(board, Direction.RIGHT), trueRes);
});

it("Test case 5", () => {
  let board = [[0, 0, 0, 2], [0, 0, 0, 0], [0, 0, 0, 4], [0, 0, 0, 2]];
  let trueRes = [[0, 0, 0, 2], [0, 0, 0, 0], [0, 0, 0, 4], [0, 0, 0, 2]];
  assert.deepEqual(change(board, Direction.RIGHT), trueRes);
});

it("Test case 5", () => {
  let board = [[4, 0, 0, 0], [2, 0, 0, 0], [4, 0, 0, 0], [4, 0, 0, 0]];
  let trueRes = [[0, 0, 0, 4], [0, 0, 0, 2], [0, 0, 0, 4], [0, 0, 0, 4]];
  assert.deepEqual(change(board, Direction.RIGHT), trueRes);
});
