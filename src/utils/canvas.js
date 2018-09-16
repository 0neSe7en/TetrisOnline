import consts from '../consts'
import Grid from '../tetris/Grid'

export function scaleRatio(canvas, context, width, height) {
  const devicePixelRatio = window.devicePixelRatio || 1;
  // console.log(canvas, context, width, height);
  canvas.width = width * devicePixelRatio;
  canvas.height = height * devicePixelRatio;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  context.scale(devicePixelRatio, devicePixelRatio);
}

export function clear(context, width, height) {
  context.fillStyle = consts.BACKGROUND_COLOR;
  context.fillRect(0, 0, width, height);
}


/**
 * drawGrids
 * @param context
 * @param {{x: Number, y: Number, color: String}[]} grids
 */
export function drawGrids(context, grids) {
  grids.forEach(pos => {
    const grid = new Grid(context, pos);
    grid.fill(pos.color);
    grid.stroke('white');
  })
}
