const canvasDom = document.getElementById('scene');
const canvas = canvasDom.getContext('2d');

function scaleCanvas(canvas, context, width, height) {
  // assume the device pixel ratio is 1 if the browser doesn't specify it
  const devicePixelRatio = window.devicePixelRatio || 1;

  // determine the 'backing store ratio' of the canvas context
  const backingStoreRatio = (
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio || 1
  );

  // determine the actual ratio we want to draw at
  const ratio = devicePixelRatio / backingStoreRatio;

  if (devicePixelRatio !== backingStoreRatio) {
    // set the 'real' canvas size to the higher width/height
    canvas.width = width * ratio;
    canvas.height = height * ratio;

    // ...then scale it back down with CSS
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
  }
  else {
    // this is a normal 1:1 device; just scale it simply
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = '';
    canvas.style.height = '';
  }

  // scale the drawing context so everything will work at the higher ratio
  context.scale(ratio, ratio);
}

scaleCanvas(canvasDom, canvas, 300, 600);

const consts = {
  BACKGROUND_COLOR: '#eeeeee',
  GRID_BORDER_COLOR: '#444444',
  GRID_WIDTH: 30,
  WIDTH: 10,
  HEIGHT: 20,
  FIGURES: [
    [
      [0,1,0],
      [0,1,0],
      [1,1,0]
    ],[
      [0,1,0],
      [0,1,0],
      [0,1,1]
    ],[
      [1,1,0],
      [0,1,1],
      [0,0,0]
    ],[
      [0,1,1],
      [1,1,0],
      [0,0,0]
    ],[
      [0,0,0,0],
      [1,1,1,1],
      [0,0,0,0],
      [0,0,0,0]
    ],[
      [1,1],
      [1,1]
    ],[
      [0,1,0],
      [1,1,1],
      [0,0,0]
    ]
  ]
};


class Grid {
  constructor(position) {
    this.position = position
  }
  fill(color) {
    this._rect();
    canvas.fillStyle = color;
    canvas.fill();
  }
  stroke(color=consts.GRID_BORDER_COLOR) {
    this._rect();
    canvas.lineWidth = 0.2 ;
    canvas.strokeStyle = color;
    canvas.stroke();
  }
  _rect() {
    const {x, y} = this.position;
    canvas.beginPath();
    canvas.rect(x * consts.GRID_WIDTH, y * consts.GRID_WIDTH, consts.GRID_WIDTH, consts.GRID_WIDTH);
  }
}

function strokeSingleGrid({x, y}) {
  canvas.strokeStyle = consts.GRID_BORDER_COLOR;
  canvas.lineWidth = 0.2;
  canvas.strokeRect(x * consts.GRID_WIDTH, y * consts.GRID_WIDTH, consts.GRID_WIDTH, consts.GRID_WIDTH)
}

function drawGrid() {
  for (let x = 0; x < consts.WIDTH; x++ ) {
    for (let y = 0; y < consts.HEIGHT; y ++) {
      strokeSingleGrid({x, y});
    }
  }
}

function drawScene() {
  // canvas.fillStyle = consts.BACKGROUND_COLOR;
  // canvas.fillRect(0, 0, canvasDom.width, canvasDom.height);
  canvas.clearRect(0, 0, canvasDom.width, canvasDom.height);
  drawGrid();
}

const figure = consts.FIGURES[0];

function drawShape(point, shape) {
  for (let y = 0; y < shape.length; y++) {
    const row = shape[y];
    for (let x = 0; x < row.length; x++) {
      if (row[x]) {
        const position = {x: x + point.x, y: y + point.y};
        const grid = new Grid(position);
        grid.fill('red');
        grid.stroke('white');
      }
    }
  }
}
const currentPosition = {x: 0, y : 0};
const currentInterval = 1000;

let lastTime = 0;

function update() {
  if (!lastTime || Date.now() - lastTime > currentInterval) {
    currentPosition.y += 1;
    drawScene();
    drawShape(currentPosition, figure);
    lastTime = Date.now();
  }
  flag = requestAnimationFrame(update);
}

drawScene();
let flag = requestAnimationFrame(update);
update();


// const shape = [[0, 0, ]]

// drawShape() {
//
// }

