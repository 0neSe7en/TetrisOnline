import React, { Component } from 'react';
import {autorun} from 'mobx'
import { observer } from 'mobx-react';

import { gameStore2 } from '../store/gameStore';
import consts from '../consts'
import * as canvas from '../utils/canvas'
import Score from './Score'

class RemoteTetris extends Component {
  constructor(props) {
    super(props);
    this.gameCanvas = React.createRef();
    this.gameCtx = null;
    this.gameWidth = consts.GRID_WIDTH * consts.WIDTH;
    this.gameHeight = consts.GRID_WIDTH * consts.HEIGHT;
    this.cancelAutorun = [];
  }

  clearGameCanvas() {
    canvas.clear(this.gameCtx, this.gameWidth, this.gameHeight);
  }

  componentDidMount() {
    this.gameCtx = this.gameCanvas.current.getContext('2d');
    canvas.scaleRatio(this.gameCanvas.current, this.gameCtx, this.gameWidth, this.gameHeight);
    this.clearGameCanvas();
    this.cancelAutorun = [
      autorun(() => {
        const self = gameStore2.players.get(this.props.playerId);
        const filled = self.matrix.filledPositions;
        if (!self.activeShape) {
          this.clearGameCanvas();
        } else {
          const active = self.activeShape.gridPositions();
          this.clearGameCanvas();
          canvas.drawGrids(this.gameCtx, [...active, ...filled]);
        }
      }),
    ];
  }

  componentWillUnmount() {
    this.cancelAutorun.forEach(dispos => dispos());
  }

  render() {
    const player = gameStore2.players.get(this.props.playerId);
    return (
      <React.Fragment>
        <div className="game">
          <canvas
            ref={this.gameCanvas}
            width={this.gameWidth}
            height={this.gameHeight}
          />
          { <Score score={player.score}/> }
        </div>
      </React.Fragment>
    )
  }
}

export default observer(RemoteTetris)
