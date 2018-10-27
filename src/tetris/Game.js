import {autorun} from 'mobx'
import consts from '../consts'
import {gameStore, localStore} from '../store'
import sound from './sound';
import * as controller from './controller'

console.log('sound:', sound);
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
    console.log('init game', sound.sounds);
    const id = sound.sounds.play('background');
    console.log('background id', id);
    sound.sounds.volume(0.5, id);
    autorun(() => {
      if (gameStore.state === 'stop') {
        this.running = false;
        controller.unbind();
        this.setNext();
      } else if (gameStore.state === 'playing') {
        controller.bind(this.player, this);
        this.running = true;
        setImmediate(() => {
          // 需要跳出autorun，才能触发onPatch
          this.update();
        })
      } else {
        controller.unbind();
        this.running = false;
      }
    })
  }

  setNext() {
    const next = generateNext();
    localStore.setNextShape(next);
  }

  setActive() {
    localStore.nextShape.move(consts.INITIAL_POSITIONS);
    this.player.setActiveShape(localStore.nextShape.toJSON());
    this.setNext();
  }

  hardDrop() {
    this.player.hardDrop();
    sound.sounds.play('hardDrop');
    this.moveDone();
  }

  hold() {
    if (localStore.canHold) {
      sound.sounds.play('hold');
      const held = localStore.hold(this.player.activeShape.toJSON());
      if (held) {
        this.player.setActiveShape(held);
      } else {
        this.setActive();
      }
    }
  }

  moveDone() {
    this.player.matrix.insertShape(this.player.activeShape);
    const lines = this.player.matrix.tryClear();
    if (lines.length) {
      if (lines.length === 4) {
        sound.sounds.play('tetrisClear');
      } else {
        sound.sounds.play('clear');
      }
    }
    this.player.addScore(lines.length);
    this.setActive();
    return lines;
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
        const lines = this.moveDone();
        sound.sounds.play('drop');
      }
      this.lastTime = Date.now();
    }
    this.animationFrameFlag = requestAnimationFrame(this.update);
  }
}
