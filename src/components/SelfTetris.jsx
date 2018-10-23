import React, {Component} from 'react'
import { observer } from 'mobx-react';
import { gameStore, localStore } from '../store';
import consts from '../consts'
import * as canvas from '../utils/canvas'
import Score from './Score'
import SingleShape from './Preview'
import {autorun} from 'mobx'
import {drawGrids} from '../utils/canvas'
import Game from '../tetris/Game'
import './SelfTetris.css'
import {drawBorderGrid} from '../utils/canvas'

class SelfTetris extends Component {
  constructor(props) {
    super(props);
    this.gameCanvas = React.createRef();
    this.gameCtx = null;
    this.gameWidth = consts.GRID_WIDTH * consts.WIDTH;
    this.gameHeight = consts.GRID_WIDTH * consts.HEIGHT;
    this.previewWidth = consts.GRID_WIDTH * 4;
    this.cancelAutorun = [];
    this.game = null;
  }

  clearGameCanvas() {
    canvas.clear(this.gameCtx, this.gameWidth, this.gameHeight);
  }

  componentDidMount() {
    this.gameCtx = this.gameCanvas.current.getContext('2d');
    canvas.scaleRatio(this.gameCanvas.current, this.gameCtx, this.gameWidth, this.gameHeight);
    this.clearGameCanvas();
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
          drawBorderGrid(this.gameCtx, self.hardDropPosition.positions)
        }
      }),
    ];
  }

  componentWillUnmount() {
    this.cancelAutorun.forEach(dispos => dispos());
  }

  render() {
    const self = gameStore.players.get(localStore.selfId);
    return (
      <div className="gameWrapper">
        { <Score score={self.score}/> }
        <div className="game">
          <SingleShape
            style={{paddingRight: 15}}
            width={this.previewWidth}
            height={this.previewWidth}
            observerKey="holdShape"
          />
          <canvas
            ref={this.gameCanvas}
            width={this.gameWidth}
            height={this.gameHeight}
          />
          <SingleShape
            style={{paddingLeft: 15}}
            width={this.previewWidth}
            height={this.previewWidth}
            observerKey="nextShape"
          />
        </div>
      </div>
    )
  }
}

export default observer(SelfTetris)
