import { types, onPatch, applyPatch } from 'mobx-state-tree';
import Player from './types/Player';
import consts from '../consts'

const nanoid = require('nanoid')

const Game = types.model('Game', {
  players: types.map(Player),
  levelInterval: consts.INTERVAL.BASE,
  state: types.enumeration('GAME_STATE', ['stop', 'playing', 'pause']),
  mode: types.enumeration('GAME_MODE', ['single', 'multiple']),
  winner: types.maybe(types.reference(Player)),
}).views(self => ({
  get startStop() {
    if (self.state === 'stop') {
      return 'Start';
    }
    return 'Stop';
  },
  get resumePause() {
    if (self.state === 'pause') {
      return 'Resume';
    }
    return 'Pause';
  },
  get pauseDisable() {
    return self.state === 'stop';
  }
})).actions(self => ({
  start() {
    self.state = 'playing';
  },
  pause() {
    self.state = 'pause';
  },
  resume() {
    self.state = 'playing';
  },
  stop() {
    self.state = 'stop';
    self.players.forEach(player => {
      player.reset();
    })
  },
  win(player) {
    this.win = player;
  },
  join(name) {
    const player = Player.create({
      name,
      id: nanoid(10),
      matrix: { data: [] }
    });
    player.matrix.init();
    self.players.set(player.id, player);
    return player.id;
  },
  left(id) {
    self.players.delete(id);
  }
}));


const gameStore = Game.create({
  mode: 'single',
  state: 'stop',
  players: {}
})

onPatch(gameStore, patch => {
  applyPatch(window.gameStore2, patch);
})

window.gameStore = gameStore;
const gameStore2 = Game.create({
  mode: 'single',
  state: 'stop',
  players: {}
})

window.gameStore2 = gameStore2;

export { gameStore2 };


export default gameStore;
