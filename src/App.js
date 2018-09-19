import React, {Component} from 'react';
import DevTools from 'mobx-react-devtools'
import './App.css';
import SelfTetris from './components/SelfTetris'
import {gameStore, localStore} from './store'
import ActionButton from './components/ActionButton'
import {observer} from 'mobx-react'
import RemoteTetris from './components/RemoteTetris'
import {createPeer, createRoom, join} from './store/rtc'


class App extends Component {
  onEnter = async () => {
    const peerId = await createPeer();
    if (localStore.targetPeer) {
      await join(localStore.targetPeer);
      gameStore.join(localStore.currentNickName, peerId);
    } else {
      createRoom();
      gameStore.join(localStore.currentNickName, peerId);
    }
    localStore.setSelfId(peerId);
    console.log('peer id:', peerId, gameStore.remotePlayerId(peerId));
  }

  onInput = (e) => {
    localStore.inputNickName(e.target.value);
  }

  onInputPeer = (e) => {
    localStore.inputTargetPeer(e.target.value);
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
        <input
          className="pure-input-rounded"
          type="text"
          value={localStore.targetPeer}
          onChange={this.onInputPeer}
          placeholder="Peer ID"
        />
        <button
          className="btnSuccess pure-button"
          onClick={this.onEnter}
        >Enter Or Join
        </button>
      </div>
    )
  }

  game = () => {
    return (
      <div className="gameContainer">
        <SelfTetris/>
        {
          gameStore.remotePlayerId(localStore.selfId).map(id => <RemoteTetris playerId={id} key={id}/>)
        }
        <ActionButton/>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <h1>Tetris</h1>
        {localStore.selfId ? this.game() : this.enterGame()}
        <DevTools/>
      </div>
    );
  }
}

export default observer(App);
