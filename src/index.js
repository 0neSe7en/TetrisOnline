import { autorun } from 'mobx';
import store from './store';
import canvasUtils, {drawGrids} from './Scene'
import consts from './consts';
import './ActionButton';
import './Score';

const _ = require('lodash');
const Mousetrap = require('mousetrap');

function generateNext() {
    return _.sample(consts.FIGURES);
}

class Game {
    constructor() {
        this.animationFrameFlag = null;
        this.state = 'stop';
        this.lastTime = 0;
        store.matrix.init();
        store.next(generateNext);
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

    _fixedUpdate() {
        const success = store.move({x: 0, y: 1});
        if (!success) {
            store.matrix.insertShape(store.activeShape);
            const lines = store.matrix.tryClear();
            store.game.addScore(lines.length);
            store.next(generateNext);
        }
    }

    _update() {
        if (this.state === 'stop' || this.state === 'pause') {
            this.animationFrameFlag = null;
            return;
        }
        if (!this.lastTime || Date.now() - this.lastTime > store.game.interval) {
            this._fixedUpdate();
            this.lastTime = Date.now();
        }
        this.animationFrameFlag = requestAnimationFrame(this.update);
    }
}

function redraw() {
    const activePositions = store.activeShape.gridPositions();
    drawGrids(canvasUtils.context, [...activePositions, ...store.matrix.filledPositions]);
}

function drawPreview() {
    const previewShape = store.nextShape.gridPositions();
    drawGrids(canvasUtils.preview, previewShape);
}

const game = new Game();


autorun(redraw);
autorun(drawPreview);
