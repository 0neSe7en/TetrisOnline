import { autorun } from 'mobx';
import store from './store';
import canvasUtils, {drawGrids} from './Scene'
import consts from './consts';
import './ActionButton';
import './Score';

const _ = require('lodash');
const Mousetrap = require('mousetrap');

class Game {
    constructor() {
        this.animationFrameFlag = null;
        this.state = 'stop';
        this.lastTime = 0;
        this.currentShape = _.sample(consts.FIGURES);
        this.nextShape = _.sample(consts.FIGURES);
        drawPreview(this.nextShape);
        store.matrix.init();
        store.setActiveShape({x: 4, y: -2}, this.currentShape);
        this.update = this._update.bind(this);
        autorun(() => {
            console.log('Game State Changed:', store.game.state);
            this.state = store.game.state;
            if (this.state === 'playing') {
                this.update();
            }
        })

        Mousetrap.bind('left', () => {
            store.move({x: -1, y: 0});
        })

        Mousetrap.bind('right', () => {
            store.move({x: 1, y: 0});
        })

        Mousetrap.bind('up', () => {
            store.tryRotate();
        });

        Mousetrap.bind('down', () => {
            store.game.updateInterval(50);
        }, 'keydown');

        Mousetrap.bind('down', () => {
            store.game.resetInterval();
        }, 'keyup')
    }

    _update() {
        if (this.state === 'stop') {
            this.animationFrameFlag = null;
            return;
        }
        if (!this.lastTime || Date.now() - this.lastTime > store.game.interval) {
            const success = store.move({x: 0, y: 1});
            if (!success) {
                store.matrix.insertShape(store.activeShape);
                const lines = store.matrix.tryClear();
                store.game.addScore(lines.length);
                this.currentShape = this.nextShape;
                this.nextShape = _.sample(consts.FIGURES);
                drawPreview(this.nextShape);
                store.setActiveShape({x: 4, y: 0}, this.currentShape);
            }
            this.lastTime = Date.now();
        }
        this.animationFrameFlag = requestAnimationFrame(this.update);
    }
}

function redraw() {
    const activePositions = _.map(store.activeShape.gridPositions(), pos => ({
        x: pos.x,
        y: pos.y,
        color: store.activeShape.color
    }));
    drawGrids(canvasUtils.context, [...activePositions, ...store.matrix.filledPositions]);
}

function drawPreview(shape) {
    const positions = [];
    _.forEach(shape.shape, (row, y) => {
        _.forEach(row, (v, x) => {
            if (v) {
                positions.push({x, y, color: shape.color})
            }
        })
    })
    drawGrids(canvasUtils.preview, positions);
}

const game = new Game();


autorun(redraw);
