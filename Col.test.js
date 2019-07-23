const assert = require("assert");
//var col = [[0, 2, 2, 2], [0, 2, 0, 2], [0, 0, 0, 0], [0, 0, 0, 0]];
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
const changeCol = (col) => {
  // Press UP-ARROW

  let newCol = cleanZero(col);
  for (let i = 0; i < newCol.length; i++) {
    if (newCol[i]!=0 && newCol[i] == newCol[i + 1]) {
        newCol[i]*=2;
        newCol[i+1] = 0;
        if (newCol[i+2]) {
            newCol[i+1] = newCol[i+2];
            newCol.pop();
            if (newCol[i+1] === newCol[i+2]) {
                newCol[i+1]*=2;
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
//changeColCol(col);
it("Test case 1", () => {
  let col = [0, 2, 0, 0];
  let trueRes = [2, 0, 0, 0];
  assert.deepEqual(changeColCol(col), trueRes);
});

it("Test case 2", () => {
  let col = [0, 2, 2, 0];
  let trueRes = [4, 0, 0, 0];
  assert.deepEqual(changeColCol(col), trueRes);
});

it("Test case 3", () => {
  let col = [0, 2, 4, 0];
  let trueRes = [2, 4, 0, 0];
  assert.deepEqual(changeColCol(col), trueRes);
});

it("Test case 4", () => {
  let col = [0, 2, 0, 4];
  let trueRes = [2, 4, 0, 0];

  assert.deepEqual(changeColCol(col), trueRes);
});

it("Test case 5", () => {
  let col = [2, 2, 0, 4];
  let trueRes = [4, 4, 0, 0];

  assert.deepEqual(changeColCol(col), trueRes);
});


it("Test case 6", () => {
    let col = [4, 0, 2, 4];
    let trueRes = [4, 2, 4, 0];
  
    assert.deepEqual(changeCol(col), trueRes);
  });
  
  
it("Test case 7", () => {
    let col = [4, 2, 2, 4];
    let trueRes = [4, 4, 4, 0];
  
    assert.deepEqual(changeCol(col), trueRes);
  });

  it("Test case 8", () => {
    let col = [2, 2, 2, 2];
    let trueRes = [4, 4, 0, 0];
  
    assert.deepEqual(changeCol(col), trueRes);
  });

  
  it("Test case 9", () => {
    let col = [2, 4, 4, 2];
    let trueRes = [2, 8, 2, 0];
  
    assert.deepEqual(changeCol(col), trueRes);
  });


  it("Test case 10", () => {
    let col = [2, 4, 2, 4];
    let trueRes = [2, 4, 2, 4];
  
    assert.deepEqual(changeCol(col), trueRes);
  });
