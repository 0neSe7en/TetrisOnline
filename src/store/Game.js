import { types } from 'mobx-state-tree';

const Game = types.model({
    state: types.enumeration('GAME_STATE', ['stop', 'playing', 'pause']),
    mode: types.enumeration('GAME_MODE', ['single']),
    score: 0,
    interval: 500
}).actions((self) => ({
    updateInterval(target) {
        self.interval = target;
    },
    start() {
        self.state = 'playing';
    },
    stop() {
        self.state = 'stop';
        self.score = 0;
    },
    pause() {
        self.state = 'pause';
    },
    resume() {
        self.state = 'playing';
    },
    addScore(incr) {
        self.sscore += incr;
    }
}));

export default Game;
