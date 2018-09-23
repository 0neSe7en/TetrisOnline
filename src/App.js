import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DevTools from 'mobx-react-devtools'
import './App.css';
import SelfTetris from './components/SelfTetris'
import {gameStore, localStore} from './store'
import ActionButton from './components/ActionButton'
import {observer} from 'mobx-react'
import RemoteTetris from './components/RemoteTetris'
import {createPeer, createRoom, join} from './store/rtc'
import Home from './pages/Home'
import SingleTetris from './pages/SingleTetris'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <h1>Tetris</h1>
          <Route exact path="/" component={Home}/>
          <Route path="/single" component={SingleTetris}/>
          <Route path="/multi" component={Home}/>
          <DevTools/>
        </div>
      </Router>
    )
  }
}

export default App;
