let canvasSize = 500;
let ctx;

let rowNum = 4;
colNum = 8;

let boxIndex = [];
boxNum = rowNum * colNum;
dim = canvasSize / 10;

let gridX = canvasSize / 2 - (colNum / 2) * dim;
gridY = canvasSize / 2 - (rowNum / 2) * dim;

let gridW = gridX + (colNum - 1) * dim;
gridH = gridY + (rowNum - 1) * dim;

let posX = gridX,
  posY = gridY;
highlightDim = dim;

let xpos, ypos;

let coloredIndex = [];
let figure01 = [
  0,
  1,
  3,
  4,
  5,
  7,
  8,
  10,
  11,
  12,
  13,
  14,
  16,
  17,
  18,
  19,
  23,
  27,
  28,
  31
];

let spaceBgd;

let checker = (painted, original) =>
  original.every(block => painted.includes(block));
let checkerBtn;
checkerBtnX = gridX + (colNum / 2) * dim - (dim * 3) / 2;
checkerBtnY = gridY + rowNum * dim + dim;

for (let i = 0; i < boxNum; i++) {
    boxIndex.push(i);
  }


function draw() {
  let canvas = document.getElementById("canvas");

  if (canvas.getContext) {
    ctx = canvas.getContext("2d");
    for (let y = 0; y < rowNum; y++) {
      for (let x = 0; x < colNum; x++) {
        xpos = gridX + x * dim;
        ypos = gridY + y * dim;

        let index = y * colNum + x; // find the index
        
        ctx.strokeStyle = "#1A1A26";
        ctx.fillStyle = "#32738C";
        ctx.fillRect(xpos, ypos, dim, dim);

        keyPressed();
        for (i = 0; i < coloredIndex.length; i++) {
            if (coloredIndex.includes(index)) {
              ctx.fillStyle = "#F27294";
              ctx.fillRect(xpos, ypos, dim, dim);
            }
        }
        display();
      }
    }
  }
}

function display() {
    ctx.strokeStyle = ("#F27294");    
  ctx.fillRect(posX + 2, posY + 1, highlightDim, highlightDim);
}

function keyPressed() {
  if (keyPressed.keyCode === 37 && posX > gridX) {
    posX = posX - dim;
  } else if (keyPressed.keyCode === 39 && posX < gridW) {
    posX = posX + dim;
  } else if (keyPressed.keyCode === 38 && posY > gridY) {
    if (posY == checkerBtnY && posX == checkerBtnX) {
      posX = gridX;
      posY = gridY;
      highlightDim = dim;
    } else {
      posY = posY - dim;
    }
  } else if (keyPressed.keyCode === 40) {
    if (posY < gridH) {
      posY = posY + dim;
    } else {
      posY = checkerBtnY;
      posX = checkerBtnX;
      highlightDim = dim * 2;
    }
  }
  if (keyPressed.keyCode === 32 && xpos == posX && ypos == posY) {
    ctx.fillRect(xpos, ypos, dim, dim);
    coloredIndex.push(index);

    console.log(coloredIndex);
  }
}

function compare() {
  if (checker(coloredIndex, figure01)) {
    alert("Right Answer");
  } else {
    alert("Wrong Answer");
  }
}

/* 


 */
