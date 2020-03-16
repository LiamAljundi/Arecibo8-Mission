let referrer = document.referrer;
let goTo;

let canvasHeight = window.innerHeight;
let canvasWidth = window.innerWidth;

let audio;

let indicator;
let grid;
let audioHandler;
let highlighter;
let checkerBtn;

const rowNum = 4;
const colNum = 8;
const boxNum = rowNum * colNum;
let dim = canvasHeight / 8;

const gridX = canvasWidth / 2 - (colNum / 2) * dim;
const gridY = canvasHeight / 2 - (rowNum / 2) * dim;
const gridW = gridX + (colNum - 1) * dim;
const gridH = gridY + (rowNum - 1) * dim;

let boxPosX, boxPosY;
let boxIndex;

let highlighterPosX = gridX;
let highlighterPosY = gridY;
let highlighterDim = dim;

let highlighterKeyPressed = false;
let highlighterKeyMoving = false;

let storyNum = 0;

let coloredFigure = new Array(boxNum);

let isSoundOn = false;
let countIn = 4;
let countInState = false;

let frameCounter = 0;
let beat;
let colCounter = -1;
let rowCounter = 1;

const figures = {
  dark: [
    0,
    1,
    1,
    0,
    0,
    1,
    1,
    1, //

    0,
    1,
    1,
    1,
    1,
    0,
    1,
    1, //

    1,
    1,
    0,
    0,
    0,
    1,
    0,
    0, //

    1,
    1,
    0,
    0,
    0,
    1,
    1,
    1 //
  ],
  earth: [
    1,
    0,
    0,
    1,
    1,
    0,
    0,
    1, //

    0,
    0,
    1,
    1,
    1,
    1,
    0,
    0, //

    0,
    0,
    1,
    1,
    1,
    1,
    0,
    0, //

    1,
    0,
    0,
    1,
    1,
    0,
    0,
    1
  ],
  earthquakes: [
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1, //

    1,
    1,
    1,
    1,
    0,
    0,
    1,
    1, //

    1,
    1,
    1,
    0,
    0,
    1,
    1,
    1, //

    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1
  ],
  humanity: [
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0, //

    1,
    1,
    1,
    0,
    0,
    1,
    1,
    1, //

    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0, //

    1,
    0,
    1,
    0,
    0,
    1,
    0,
    1
  ],
  ship: [
    0,
    0,
    0,
    1,
    1,
    0,
    0,
    0, //

    1,
    1,
    1,
    0,
    0,
    1,
    1,
    1, //

    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0, //

    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1
  ],
  water: [
    0,
    1,
    0,
    1,
    1,
    0,
    0,
    1, //

    1,
    0,
    0,
    1,
    1,
    0,
    1,
    0, //

    0,
    1,
    0,
    1,
    1,
    0,
    0,
    1, //

    1,
    0,
    0,
    1,
    1,
    0,
    1,
    0
  ]
};
let figure;

function preload() { 
  if (
    referrer === "https://liamaljundi.github.io/Arecibo8-Mission/start.html"
  ) {
    figure = figures.dark;
    audio = loadSound("./dark.wav");
    goTo = "https://liamaljundi.github.io/Arecibo8-Mission/startToGreen.html";
  }
  
  else if (
    referrer ===
    "https://liamaljundi.github.io/Arecibo8-Mission/startToGreen.html"
  ) {
    figure = figures.dark;
    audio = loadSound("./dark.wav");
    goTo = "https://liamaljundi.github.io/Arecibo8-Mission/greenToPurple.html";
  }
  
  else if (
    referrer === "https://liamaljundi.github.io/Arecibo8-Mission/purple.html"
  ) {
    figure = figures.dark;
    audio = loadSound("./dark.wav");
    goTo = "https://liamaljundi.github.io/Arecibo8-Mission/purpleToOrange.html";
  }
  
  else if (
    referrer === "https://liamaljundi.github.io/Arecibo8-Mission/orange.html"
  ) {
    figure = figures.dark;
    audio = loadSound("./dark.wav");
    goTo = "https://liamaljundi.github.io/Arecibo8-Mission/orangeToYellow.html";
  }
  
  else if (
    referrer === "https://liamaljundi.github.io/Arecibo8-Mission/yellow.html"
  ) {
    figure = figures.dark;
    audio = loadSound("./dark.wav");
    goTo = "https://liamaljundi.github.io/Arecibo8-Mission/yellowToBlue.html";
  }else{
    figure = false;
    audio = false;
    goTo = false;
  
  }
  
  
}

function setup() {
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.id("canvas");

  highlighter = new Highlighter();
  grid = new Grid();
  indicator = new Indicator();
  audioHandler = new AudioHandler();
  for (i = 0; i < boxNum; i++) {
    if (coloredFigure[i] == undefined) {
      coloredFigure[i] = 0;
    }
  }
    
  beat = 60 * (audio.duration() / (countIn + boxNum));

}

function draw() {
  frameCounter++;
  background(0);

  if (isSoundOn) {
    audioHandler.beatTimer();
    audioHandler.countIn();
    isSoundOn = audio.isPlaying();
  }

  for (let y = 0; y < rowNum; y++) {
    boxPosY = gridY + y * dim;

    /*    if (rowCounter <= y) {
      indicator.display(gridX - dim / 2, boxPosY + dim / 2);
    } else {
      indicator.active(gridX - dim / 2, boxPosY + dim / 2);
    }  */

    for (let x = 0; x < colNum; x++) {
      boxPosX = gridX + x * dim;

      boxIndex = y * colNum + x; // find the boxIndex

      if (boxIndex < colNum) {
        if (boxIndex === colCounter) {
          indicator.active(boxPosX + dim / 2, boxPosY - dim / 1.5);
        } else {
          indicator.display(boxPosX + dim / 2, boxPosY - dim / 1.5);
        }
      }

      grid.display(boxPosX, boxPosY);
      highlighter.paint();
      highlighter.display();
    }
  }

  controlKeysText();
}

function controlKeysText() {
  let x = gridX - dim;
  let y = gridH + dim * 2;

  let instructions =
    "SHIFT: start  " +
    "  ARROW KEYS: move  " +
    "  SPACE: highlight box  " +
    "  ENTER: check-answer/restart";

  textSize(24);
  fill(255);
  noStroke();
  text(instructions, x, y);
}

class Grid {
  constructor() {
    this.stroke = 0;
    this.strokeW = 15;
    this.fill = "#F27294";
  }

  display(x, y) {
    stroke(this.stroke);
    strokeWeight(this.strokeW);
    fill(this.fill);
    rect(x, y, dim, dim);
  }
}

class Indicator {
  constructor() {
    this.radius = 30;
    this.stroke = 255;
    this.strokeW = 2;
    this.fill = "#2BFF94";
  }

  display(x, y) {
    noFill();
    stroke(this.stroke);
    strokeWeight(this.strokeW);
    ellipse(x, y, this.radius, this.radius);
  }

  active(x, y) {
    strokeWeight(this.strokeW);
    fill(this.fill);
    ellipse(x, y, this.radius, this.radius);
  }
}

class Highlighter {
  constructor() {
    this.stroke = "#2EFFFF";
    this.strokeW = canvasHeight / 100;
  }

  display() {
    noFill();
    stroke(this.stroke);
    strokeWeight(this.strokeW);
    rect(highlighterPosX, highlighterPosY, highlighterDim, highlighterDim);
  }

  paint() {
    if (!highlighterKeyMoving) {
      if (highlighterKeyPressed) {
        if (boxPosX == highlighterPosX && boxPosY == highlighterPosY) {
          coloredFigure[boxIndex] = (coloredFigure[boxIndex] + 1) % 2;

          highlighterKeyMoving = true;
        }
      }
    } else if (!highlighterKeyPressed) {
      highlighterKeyMoving = false;
    }

    if (keyIsDown(32)) {
      highlighterKeyPressed = true;
    } else if (!keyIsDown(32)) {
      highlighterKeyPressed = false;
    }

    if (coloredFigure[boxIndex]) {
      fill("#2EFFFF");
      rect(boxPosX, boxPosY, dim, dim);
    }
  }
}

class AudioHandler {
  constructor() {
    this.textX = gridW - dim * 3;
    this.textY = gridH + dim * 2;

    this.textAlignX = CENTER;
    this.textAlignY = CENTER;
    this.textSize = 60;
    this.fill = "#2EFFFF";
    this.StrokeW = 2;
  }

  beatTimer() {
    if (frameCounter % beat === 0) {
      countIn--;

      if (countIn <= 4 && countIn > 0) {
        countInState = true;
      } else {
        countInState = false;
        countIn = 0;
      }

      if (!countInState) {
        colCounter++;
        if (colCounter >= colNum) {
          colCounter = 0;
          rowCounter++;
          if (rowCounter > rowNum) {
            countIn = 4;
            colCounter = -1;
            rowCounter = 1;
          }
        }
      }
    }
  }

  countIn() {
    textSize(this.textSize);
    textAlign(this.textAlignX, this.textAlignY);
    strokeWeight(this.StrokeW);
    fill(this.fill);

    if (countIn != 0) {
      text(countIn, this.textX, this.textY);
    } else {
      text("GO!", this.textX, this.textY);
    }
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW && highlighterPosX > gridX) {
    highlighterPosX = highlighterPosX - dim;
  } else if (
    keyCode === LEFT_ARROW &&
    highlighterPosX == gridX &&
    highlighterPosY > gridY
  ) {
    highlighterPosX = highlighterPosX + dim * (colNum - 1);
    highlighterPosY = highlighterPosY - dim;
  } else if (keyCode === RIGHT_ARROW && highlighterPosX < gridW) {
    highlighterPosX = highlighterPosX + dim;
  } else if (
    keyCode === RIGHT_ARROW &&
    highlighterPosX == gridW &&
    highlighterPosY < gridH
  ) {
    highlighterPosX = highlighterPosX - dim * (colNum - 1);
    highlighterPosY = highlighterPosY + dim;
  } else if (keyCode === UP_ARROW && highlighterPosY > gridY) {
    highlighterPosY = highlighterPosY - dim;
  } else if (keyCode === DOWN_ARROW && highlighterPosY < gridH) {
    highlighterPosY = highlighterPosY + dim;
  }

  if (keyIsDown(16) && !audio.isPlaying()) {
    isSoundOn = true;
    audio.play();
  }

  if (keyCode === ENTER) {
    compare();
  }

  return false;
}

function compare() {
  if (JSON.stringify(coloredFigure) == JSON.stringify(figure)) {
    alert("Right Answer");
    window.location.assign(goTo);
  } else {
    resetCanvas();
    alert("Wrong Answer");
  }
}
function resetCanvas() {
  boxPosX = gridX;
  boxPosY = gridY;
  highlighterPosX = gridX;
  highlighterPosY = gridY;

  for (i = 0; i < boxNum; i++) {
    coloredFigure[i] = 0;
  }
}

/* 
function insideGrid(x, y) {
  if (x >= gridX && x <= gridW && y >= gridY && y <= gridH) {
    return true;
  } else {
    return false;
  }
}

function uniqueArray(array) {
  return array.length === new Set(array).size;
} */
