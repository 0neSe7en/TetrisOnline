import consts from '../consts'
import {gameStore, localStore} from '../store'
import {autorun} from 'mobx'

const _ = require('lodash');


function generateNext() {
  return _.sample(consts.FIGURES);
}

export default class Game {
  constructor(player) {
    this.animationFrameFlag = null;
    this.player = player;
    this.update = this._update.bind(this);
    this.running = false;
    autorun(() => {
      if (gameStore.state === 'stop') {
        this.running = false;
        this.setNext();
      } else if (gameStore.state === 'playing') {
        this.running = true;
        this.update();
      } else {
        this.running = false;
      }
    })
  }

  setNext() {
    const next = generateNext();
    localStore.setNextShape(next);
  }

  setActive() {
    localStore.nextShape.move({y: -2, x: 3});
    this.player.setActiveShape(localStore.nextShape.toJSON());
    this.setNext();
  }

  _update() {
    if (!this.running) {
      this.animationFrameFlag = null;
      return;
    }
    if (!this.player.activeShape) {
      this.setActive();
    }
    if (!this.lastTime || Date.now() - this.lastTime > localStore.currentInterval) {
      const success = this.player.move({x: 0, y: 1});
      if (!success) {
        this.player.matrix.insertShape(this.player.activeShape);
        const lines = this.player.matrix.tryClear();
        this.player.addScore(lines.length);
        this.setActive();
      }
      this.lastTime = Date.now();
    }
    this.animationFrameFlag = requestAnimationFrame(this.update);
  }
}
