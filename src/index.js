import { autorun } from 'mobx';
import * as _ from 'lodash';
import store from './store';
import canvas from './canvas';
import consts from './consts';

const Mousetrap = require('mousetrap');


const controller = document.getElementById('control');
controller.addEventListener('click', () => {
    if (store.game.state === 'playing') {
        store.game.stop();
    } else {
        store.game.start();
    }
});

autorun(() => {
    if (store.game.state === 'playing') {
        controller.innerText = 'Stop';
    } else {
        controller.innerText = 'Start';
    }
});

// ctx.fillStyle = consts.BACKGROUND_COLOR;
// ctx.fillRect(0, 0, canvas.dom.width, canvas.dom.height);

class Game {
    constructor(render) {
        this.animationFrameFlag = null;
        this.render = render;
        this.state = 'stop';
        this.lastTime = 0;
        this.currentShape = _.sample(consts.FIGURES);
        this.nextShape = _.sample(consts.FIGURES);
        store.matrix.init();
        store.setActiveShape({x: 4, y: 0}, this.currentShape);
        this.update = this._update.bind(this);
        this.disposer = autorun(() => {
            console.log('Game State Changed:', store.game.state);
            this.state = store.game.state;
            if (this.state === 'playing') {
                this.update();
            }
        })
    }

    _update() {
        if (this.state === 'stop') {
            this.animationFrameFlag = null;
            return;
        }
        if (!this.lastTime || Date.now() - this.lastTime > store.game.interval) {
            console.log('need update');
            const success = store.move({x: 0, y: 1});
            if (!success) {
                store.matrix.insertShape(store.activeShape);
                this.currentShape = this.nextShape;
                this.nextShape = _.sample(consts.FIGURES);
                store.setActiveShape({x: 4, y: 0}, this.currentShape);
            }
            this.lastTime = Date.now();
        }
        this.animationFrameFlag = requestAnimationFrame(this.update);
    }
}

class Grid {
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
        this.ctx.lineWidth = 0.2 ;
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }
    _rect() {
        const {x, y} = this.position;
        this.ctx.beginPath();
        this.ctx.rect(x * consts.GRID_WIDTH, y * consts.GRID_WIDTH, consts.GRID_WIDTH, consts.GRID_WIDTH);
    }
}

function redraw() {
    canvas.clear();
    const activePositions = store.activeShape.gridPositions();
    _.forEach(store.matrix.filledPositions, pos => {
        const grid = new Grid(canvas.context, pos);
        grid.fill(pos.color);
        grid.stroke('white');
    });
    _.forEach(activePositions, pos => {
        const grid = new Grid(canvas.context, pos);
        grid.fill(store.activeShape.color);
        grid.stroke('white');
    });
}

const game = new Game();

Mousetrap.bind('left', () => {
    store.move({x: -1, y: 0});
})

Mousetrap.bind('right', () => {
    store.move({x: 1, y: 0});
})

Mousetrap.bind('up', () => {
    const success = store.tryRotate();
});

autorun(redraw);
