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

let rowNum = 2;
let colNum = 8;
let boxNum = rowNum * colNum;
let dim = canvasHeight / 8;

const gridX = canvasWidth / 2 - (colNum / 2) * dim;
const gridY = canvasHeight / 2.3;
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

let startButton;
let buttonText = "start";

let isSoundOn = false;
let countIn = 4;
let countInState = true;

let frameCounter = 0;
let beat;
let colCounter = -1;
let rowCounter = 1;

let figure = [1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0];

function preload() {
  audioRightAnswer = loadSound("./audio/rightAnswer.wav");
  audioWrongAnswer = loadSound("./audio/wrongAnswer.wav");


  audio = loadSound("./audio/trial.wav");
  goTo = "https://liamaljundi.github.io/Arecibo8-Mission/startToGreen.html";
}

function setup() {
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.id("canvas");
  beat = 60 * (0.65);

  highlighter = new Highlighter();
  grid = new Grid();
  indicator = new Indicator();
  audioHandler = new AudioHandler();

  for (i = 0; i < boxNum; i++) {
    if (coloredFigure[i] == undefined) {
      coloredFigure[i] = 0;
    }
  }
  textAlign(CENTER);
  textFont("nasalizationregular");
  createStartButton();
  createContinueButton();
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
}

function controlKeysText() {
  let x = canvasWidth / 12;
  let y = 10;

noStroke();
textSize(dim / 3);
fill("#2EFFFF");
text("ARROW KEYS: ", x*3.2, y+32);
fill(255);
text("to move around the grid", x*6.2, y+32);

fill("#2EFFFF");
text("ENTER KEY: ", x*3.2, (y+32)*2);
fill(255);
text("to check your answer", x*5.8, (y+32)*2);

fill("#2EFFFF");
text("SPACE BAR: ", x*3.2, (y+32)*3);
fill(255);
text("to highlight boxes", x*5.5, (y+32)*3);


}

function createStartButton() {
  startButton = createButton("Try Decoder");
  startButton.id("tutorialButton");
  startButton.position(
    canvasWidth - canvasWidth/3,
    canvasHeight - dim * 1.8
  );
  startButton.mousePressed(startGame);
}
function createContinueButton() {
  continueButton = createButton("continue voyage");
  continueButton.id("continueButton");
  continueButton.position(
    canvasWidth/30,
    canvasHeight - dim * 1.8
  );
  continueButton.mousePressed(skipTutorial);
}

function startGame() {
  if (!audio.isPlaying()) {
    document.getElementById("tutorialButton").innerHTML = "replay";
    isSoundOn = true;
    audio.play();
  } else {
    document.getElementById("tutorialButton").innerHTML = "start";
    resetCanvas();
  }
}

function skipTutorial() {
  window.location.assign(goTo);
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

  animatedText() {
    for (i = 0; i < 255; i++) {
      textSize(i / 1.5);
      fill(random(0, 255), random(0.255), i);
      noStroke();
      text(this.text, this.textX, this.textY);
    }
  }
}
