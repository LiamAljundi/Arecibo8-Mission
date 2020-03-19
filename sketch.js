let referrer = document.referrer;
let goTo;

let canvasHeight = window.innerHeight;
let canvasWidth = window.innerWidth;

let audio;
let audioRightAnswer;
let audioWrongAnswer;

let indicator;
let grid;
let audioHandler;
let highlighter;
let checkerBtn;
let animation;

let rowNum = 4;
let colNum = 8;
let boxNum = rowNum * colNum;
let dim = canvasHeight / 8;

const gridX = canvasWidth / 2 - (colNum / 2) * dim;
const gridY = canvasHeight / 4;
const gridW = gridX + (colNum - 1) * dim;
const gridH = gridY + (rowNum - 1) * dim;

let boxPosX, boxPosY;
let boxIndex;

let highlighterPosX = gridX;
let highlighterPosY = gridY;
let highlighterDim = dim;

let highlighterKeyPressed = false;
let highlighterKeyMoving = false;

let coloredFigure = new Array(boxNum);

let isFigureRight = false;
let animationFigures = [
  [
    1,
    1,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    0,
    1,
    1
  ],
  [
    1,
    0,
    1,
    0,
    0,
    0,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    0,
    1
  ],
  [
    1,
    0,
    1,
    0,
    1,
    0,
    1,
    1,
    0,
    1,
    0,
    1,
    0,
    1,
    0,
    1,
    1,
    0,
    1,
    0,
    1,
    0,
    1,
    0,
    1,
    1,
    0,
    1,
    0,
    1,
    0,
    1
  ],
  [
    0,
    1,
    0,
    1,
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    0,
    1,
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    0,
    1,
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    0,
    1,
    0
  ],
  [
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    1,
    0,
    1,
    0,
    1,
    1,
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    1,
    0,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    1
  ],
  [
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    1,
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0
  ],
  [
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    0,
    0
  ],
  [
    1,
    0,
    0,
    1,
    1,
    0,
    0,
    1,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    1,
    0,
    0,
    0,
    1,
    1,
    0,
    0,
    0
  ],
  [
    0,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0
  ],
  [
    0,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    1
  ]
];

let startButton;
let buttonText = "start";

let isSoundOn = false;
let countIn = 4;
let countInState = true;

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
    0, 1, 0, 0, 0, 0, 1, 0, //
     1, 0, 1, 0, 0, 1, 0, 1, //
      0, 1, 0, 0, 0, 0, 1, 0, //
       1, 0, 1, 0, 0, 1, 0, 1],
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
  audioRightAnswer = loadSound("./audio/rightAnswer.wav");
  audioWrongAnswer = loadSound("./audio/wrongAnswer.wav");

  if (
    referrer ===
    "https://liamaljundi.github.io/Arecibo8-Mission/startToGreen.html"
  ) {
    figure = figures.dark;
    audio = loadSound("./audio/dark.wav");
    goTo = "https://liamaljundi.github.io/Arecibo8-Mission/greenToPurple.html";
  } else if (
    referrer === "https://liamaljundi.github.io/Arecibo8-Mission/purple.html"
  ) {
    figure = figures.earthquakes;
    audio = loadSound("./audio/earthquakes.wav");
    goTo = "https://liamaljundi.github.io/Arecibo8-Mission/purpleToOrange.html";
  } else if (
    referrer === "https://liamaljundi.github.io/Arecibo8-Mission/orange.html"
  ) {
    figure = figures.water;
    audio = loadSound("./audio/water.wav");
    goTo = "https://liamaljundi.github.io/Arecibo8-Mission/orangeToYellow.html";
  } else if (
    referrer === "https://liamaljundi.github.io/Arecibo8-Mission/yellow.html"
  ) {
    figure = figures.ship;
    audio = loadSound("./audio/ship.wav");
    goTo = "https://liamaljundi.github.io/Arecibo8-Mission/yellowToBlue.html";
  } else if (
    referrer === "https://liamaljundi.github.io/Arecibo8-Mission/blue.html"
  ) {
    figure = figures.humanity;
    audio = loadSound("./audio/humanity.wav");
    goTo = "https://liamaljundi.github.io/Arecibo8-Mission/blueToReturn.html";
  } else {
    figure = figures.dark;
    audio = loadSound("./audio/dark.wav");
    goTo = false;
  }
}

function setup() {
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.id("canvas");
  beat = Math.floor(60 * (audio.duration() / (countIn + boxNum)));

  highlighter = new Highlighter();
  grid = new Grid();
  indicator = new Indicator();
  audioHandler = new AudioHandler();
  animation = new JuicyFeedback();

  for (i = 0; i < boxNum; i++) {
    if (coloredFigure[i] == undefined) {
      coloredFigure[i] = 0;
    }
  }
  textAlign(CENTER);
  textFont("nasalizationregular");
  createStartButton();
}

function draw() {
  frameCounter++;

  background(0);

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
  if (isSoundOn) {
    audioHandler.beatTimer();
    audioHandler.countIn();
    isSoundOn = audio.isPlaying();
  }
  controlKeysText();

  if (isFigureRight) {
    document.getElementById("startButton").innerHTML = "continue";

    animation.animatedText();

    if (frameCounter % 20 === 0) {
      animation.gridAnimation();
    }

    if (frameCounter % 10 === 0) {
      colCounter = int(random(-1, 8));
    }
  }
}

function controlKeysText() {
  let x = canvasWidth / 2;
  let y = 30;

  let instructions =
    "  ARROW KEYS: move  " +
    "  SPACE: highlight box  " +
    "  ENTER: check answer";

  textSize(dim / 3);
  fill(255);
  noStroke();
  text(instructions, x, y);
}

function createStartButton() {
  startButton = createButton("start");
  startButton.id("startButton");
  startButton.position(
    canvasWidth / 2 - canvasWidth / 10,
    canvasHeight - dim * 1.8
  );
  startButton.mousePressed(startGame);
}

function startGame() {
  if (!audio.isPlaying() && !isFigureRight) {
    document.getElementById("startButton").innerHTML = "restart";
    isSoundOn = true;
    audio.play();

  }else if (isFigureRight) {
    window.location.assign(goTo);
  } else {
    document.getElementById("startButton").innerHTML = "start";
    resetCanvas();
  }
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
    this.radius = dim / 3;
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
    this.textX = canvasWidth / 2;
    this.textY = canvasHeight / 2;

    this.textAlignX = CENTER;
    this.textAlignY = CENTER;
    this.textSize = 200;
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

    if (countIn > 1 && countInState) {
      text(countIn - 1, this.textX, this.textY);
    }
    if (countIn === 1) {
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

  if (keyCode === ENTER) {
    compare();
  }

  return false;
}

function compare() {
  if (JSON.stringify(coloredFigure) == JSON.stringify(figure)) {
    audioRightAnswer.play();
    isFigureRight = true;
  } else {
    audioWrongAnswer.play();
    isFigureRight = false;
    resetCanvas();
  }
  if (isSoundOn) {
    audio.stop();
  }
}
function resetCanvas() {
  audio.stop();

  boxPosX = gridX;
  boxPosY = gridY;
  highlighterPosX = gridX;
  highlighterPosY = gridY;

  for (i = 0; i < boxNum; i++) {
    coloredFigure[i] = 0;
  }
  frameCounter = 0;
  countIn = 4;
  colCounter = -1;
  rowCounter = 1;
}

class JuicyFeedback {
  constructor() {
    this.text = "GOOD JOB";
    this.textX = canvasWidth / 2;
    this.textY = canvasHeight / 2;
  }

  gridAnimation() {
    for (i = 0; i < coloredFigure.length; i++) {
      if (i == 0 || i == 8 || i == 16 || i == 24) {
        arrayMove(coloredFigure, i, i + 7);
      }
    }
  }

  animatedText() {
    for (i = 0; i < 255; i++) {
      textSize(i / 1.5);
      fill(random(0, 255), random(0.255), i);
      noStroke();
      text(this.text, this.textX, this.textY);
    }
  }
}

function arrayMove(arr, fromIndex, toIndex) {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
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
