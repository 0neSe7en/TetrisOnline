import { types } from 'mobx-state-tree';

const scoreLogic = require('../logic/score');

const Game = types.model({
    state: types.enumeration('GAME_STATE', ['stop', 'playing', 'pause']),
    mode: types.enumeration('GAME_MODE', ['single']),
    score: 0,
    baseInterval: 500,
    interval: 500
}).actions((self) => ({
    resetInterval() {
        self.interval = self.baseInterval;
    },
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
    addScore(lines) {
        self.score += scoreLogic.basic(lines);
    }
}));

export default Game;
