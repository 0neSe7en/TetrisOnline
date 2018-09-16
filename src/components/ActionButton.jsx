import React, {Component} from 'react'
import { observer } from 'mobx-react';
import { gameStore } from '../store';
import localStore from '../store/localStore'

class ActionButton extends Component {
  onClickStart() {
    if (gameStore.state === 'stop') {
      gameStore.start();
    } else {
      localStore.reset();
      gameStore.stop();
    }
  }

  onClickPause() {
    if (gameStore.state === 'playing') {
      gameStore.pause();
    } else if (gameStore.state === 'pause') {
      gameStore.resume();
    }
  }

  render() {
    console.log('game store disable?', gameStore.pauseDisable);
    return (
      <div>
        <button onClick={this.onClickStart}>{gameStore.startStop}</button>
        <button
          disabled={gameStore.pauseDisable}
          onClick={this.onClickPause}
        >
          {gameStore.resumePause}
        </button>
      </div>
    )
  }
}

export default observer(ActionButton);
