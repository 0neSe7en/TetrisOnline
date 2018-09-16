import {types} from 'mobx-state-tree'
import {Matrix, Shape} from './index'

const logic = require('../../logic');

const Player = types.model('Player', {
    id: types.identifier,
    score: 0,
    name: '',
    activeShape: types.maybe(Shape),
    matrix: Matrix,
}).views(() => ({
    get isGameOver() {
       return false;
    }
})).actions(self => ({
    move(direction) {
        const nextPositions = self.activeShape.gridPositions(direction);
        if (self.matrix.isCollision(nextPositions)) {
            return false;
        }
        self.activeShape.move(direction);
        return true;
    },
    rotate() {
        const offset = logic.rotate.srs(self.activeShape, self.matrix);
        if (offset) {
            self.activeShape.rotate();
            self.activeShape.move(offset);
            return true;
        }
        return false;
    },
    setActiveShape(shape) {
        self.activeShape = shape;
    },
    reset() {
        self.score = 0;
        self.matrix.init();
    },
    addScore(lines) {
        self.score += logic.score.basic(lines);
    }
}))

export default Player;
