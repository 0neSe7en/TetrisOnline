import consts from './consts';
const canvasDom = document.getElementById('scene');
const canvasContext = canvasDom.getContext('2d');

function scaleCanvas(width, height) {
    const canvas = canvasUtils.dom;
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvasUtils.context.scale(devicePixelRatio, devicePixelRatio);
}

const canvasUtils = {
    scaleCanvas,
    get context() {
        return canvasContext;
    },
    get dom() {
        return canvasDom;
    },
    clear() {
        canvasUtils.context.fillStyle = consts.BACKGROUND_COLOR;
        canvasUtils.context.fillRect(0, 0, canvasUtils.dom.width, canvasUtils.dom.height);
    },
};

scaleCanvas(consts.GRID_WIDTH * consts.WIDTH, consts.GRID_WIDTH * consts.HEIGHT);

export default canvasUtils;
