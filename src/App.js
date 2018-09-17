import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools'
import './App.css';
import SelfTetris from './components/SelfTetris'
import { gameStore, localStore } from './store'
import ActionButton from './components/ActionButton'
import {observer} from 'mobx-react'
import RemoteTetris from './components/RemoteTetris'


class App extends Component {
  onEnter = () => {
    const selfId = gameStore.join(localStore.currentNickName);
    localStore.setSelfId(selfId);
  }

  onInput = (e) => {
    localStore.inputNickName(e.target.value);
  }

  enterGame = () => {
    return (
      <div className="pure-form">
        <input
          className="pure-input-rounded"
          type="text"
          value={localStore.currentNickName}
          onChange={this.onInput}
          placeholder="Nickname..."
        />
        <button
          className="btnSuccess pure-button"
          onClick={this.onEnter}
        >Enter
        </button>
      </div>
    )
  }

  game = () => {
    return (
      <div className="gameContainer">
        <SelfTetris />
        <RemoteTetris playerId={localStore.selfId}/>
        <ActionButton/>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <h1>Tetris</h1>
        { localStore.selfId ? this.game() : this.enterGame() }
        <DevTools />
      </div>
    );
  }
}

export default observer(App);
