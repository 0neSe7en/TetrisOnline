import consts from '../consts'

export default class Grid {
    constructor(ctx, position) {
        this.position = position;
        this.ctx = ctx;
    }
    fill(color) {
        this._rect();
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }
    stroke(color=consts.GRID_BORDER_COLOR) {
        this._rect();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }
    _rect() {
        const {x, y} = this.position;
        this.ctx.beginPath();
        this.ctx.rect(x * consts.GRID_WIDTH, y * consts.GRID_WIDTH, consts.GRID_WIDTH, consts.GRID_WIDTH);
    }
}
