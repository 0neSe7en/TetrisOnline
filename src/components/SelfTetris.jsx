import React, {Component} from 'react'
import { observer } from 'mobx-react';
import { gameStore, localStore } from '../store';
import consts from '../consts'
import * as canvas from '../utils/canvas'
import Score from './Score'
import Preview from './Preview'
import {autorun} from 'mobx'
import {drawGrids} from '../utils/canvas'
import * as controller from '../tetris/controller'
import Game from '../tetris/Game'

class SelfTetris extends Component {
  constructor(props) {
    super(props);
    this.gameCanvas = React.createRef();
    this.gameCtx = null;
    this.gameWidth = consts.GRID_WIDTH * consts.WIDTH;
    this.gameHeight = consts.GRID_WIDTH * consts.HEIGHT;
    this.previewWidth = consts.GRID_WIDTH * 4;
    this.cancelAutorun = [];
    this.bound = false;
    this.game = null;
  }

  clearGameCanvas() {
    canvas.clear(this.gameCtx, this.gameWidth, this.gameHeight);
  }

  componentDidMount() {
    this.gameCtx = this.gameCanvas.current.getContext('2d');
    canvas.scaleRatio(this.gameCanvas.current, this.gameCtx, this.gameWidth, this.gameHeight);
    this.clearGameCanvas();
    controller.bind(gameStore.players.get(localStore.selfId));
    this.game = new Game(gameStore.players.get(localStore.selfId));
    this.cancelAutorun = [
      autorun(() => {
        const self = gameStore.players.get(localStore.selfId);
        const filled = self.matrix.filledPositions;
        if (!self.activeShape) {
          this.clearGameCanvas();
        } else {
          const active = self.activeShape.gridPositions();
          this.clearGameCanvas();
          // TODO: 只重绘修改部分
          drawGrids(this.gameCtx, [...active, ...filled]);
        }
      }),
    ];
  }

  componentWillUnmount() {
    this.cancelAutorun.forEach(dispos => dispos());
    controller.unbind();
  }

  render() {
    const self = gameStore.players.get(localStore.selfId);
    return (
      <div>
        <div className="game">
          <canvas
            ref={this.gameCanvas}
            width={this.gameWidth}
            height={this.gameHeight}
          />
          <Preview
            width={this.previewWidth}
            height={this.previewWidth}
          />
        </div>
        { self && <Score score={self.score}/> }
      </div>
    )
  }
}

export default observer(SelfTetris)
