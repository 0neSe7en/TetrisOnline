import { types } from 'mobx-state-tree';
import {
    Player
} from './types';
import consts from '../consts'

const nanoid = require('nanoid')

const Game = types.model('Game', {
    players: types.map(Player),
    levelInterval: consts.INTERVAL.BASE,
    state: types.enumeration('GAME_STATE', ['stop', 'playing', 'pause']),
    mode: types.enumeration('GAME_MODE', ['single', 'multiple']),
}).actions(self => ({
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
    join(name) {
        const player = Player.create({
            name,
            id: nanoid(10),
            matrix: { data: [] }
        });
        player.matrix.init();
        self.players.add(player.id, player);
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

window.gameStore = gameStore;

export default gameStore;
