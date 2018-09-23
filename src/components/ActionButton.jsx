import React, {Component} from 'react'
import { observer } from 'mobx-react';
import { gameStore } from '../store';
import localStore from '../store/localStore'

class ActionButton extends Component {
  onClickStart() {
    document.activeElement.blur();
    if (gameStore.state === 'stop') {
      gameStore.start();
    } else {
      localStore.reset();
      gameStore.stop();
    }
  }

  onClickPause() {
    document.activeElement.blur();
    if (gameStore.state === 'playing') {
      gameStore.pause();
    } else if (gameStore.state === 'pause') {
      gameStore.resume();
    }
  }

  render() {
    return (
      <div>
        <button className="pure-button" onClick={this.onClickStart}>{gameStore.startStop}</button>
        <button
          className={`pure-button ${gameStore.pauseDisable && 'pure-button-disabled'}`}
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
