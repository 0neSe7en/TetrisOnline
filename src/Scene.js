import consts from './consts';
import Grid from './Grid';
const canvasDom = document.getElementById('scene');
const previewCanvasDom = document.getElementById('preview');
const canvasContext = canvasDom.getContext('2d');
const previewContext = previewCanvasDom.getContext('2d');

function scaleCanvas(canvas, context, width, height) {
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    context.scale(devicePixelRatio, devicePixelRatio);
}

const canvasUtils = {
    get context() {
        return canvasContext;
    },
    get dom() {
        return canvasDom;
    },
    get preview() {
        return previewContext
    },
    clear(ctx) {
        ctx.fillStyle = consts.BACKGROUND_COLOR;
        ctx.fillRect(0, 0, canvasUtils.dom.width, canvasUtils.dom.height);
    },
};

/**
 * drawGrids
 * @param ctx
 * @param {{x: Number, y: Number, color: String}[]} grids
 */
export function drawGrids(ctx, grids) {
    canvasUtils.clear(ctx);
    grids.forEach(pos => {
        const grid = new Grid(ctx, pos);
        grid.fill(pos.color);
        grid.stroke('white');
    })
}

scaleCanvas(canvasDom, canvasContext, consts.GRID_WIDTH * consts.WIDTH, consts.GRID_WIDTH * consts.HEIGHT);
scaleCanvas(previewCanvasDom, previewContext, consts.GRID_WIDTH * 4, consts.GRID_WIDTH * 4);
canvasUtils.clear(previewContext);

export default canvasUtils;
