import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools'
import './App.css';
import SelfTetris from './components/SelfTetris'
import { gameStore, localStore } from './store'
import ActionButton from './components/ActionButton'


class App extends Component {
  state = {
    selfId: ''
  }

  componentDidMount() {
    const selfId = gameStore.join('Local');
    localStore.setSelfId(selfId);
    this.setState({selfId});
  }

  render() {
    return (
      <div className="App">
        <h1>Tetris</h1>
        {this.state.selfId && <SelfTetris />}
        <ActionButton />
        <DevTools />
      </div>
    );
  }
}

export default App;
