import React, { Component } from 'react';
import localStore from '../store/localStore'
import ActionButton from '../components/ActionButton'
import SelfTetris from '../components/SelfTetris'
import {observer} from 'mobx-react'
import gameStore from '../store/gameStore'
import './SingleTetris.css';

class SingleTetris extends Component {
  componentDidMount() {
    const id = 'Player 1';
    gameStore.join(id, id);
    localStore.setSelfId(id);
  }

  render() {
    if (localStore.selfId) {
      return (
        <div>
          <SelfTetris />
          <ActionButton />
        </div>
      )
    } else {
      return 'loading...';
    }
  }
}

export default observer(SingleTetris);
