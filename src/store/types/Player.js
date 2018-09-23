import {types} from 'mobx-state-tree'
import Matrix from './Matrix';
import Shape from './Shape';

const logic = require('../../logic');

const Player = types.model('Player', {
  id: types.identifier,
  score: 0,
  name: '',
  activeShape: types.maybe(Shape),
  matrix: Matrix,
}).views((self) => ({
  get isGameOver() {
    return false;
  },
  get hardDropPosition() {
    let success = {offset: {x: 0, y: 0}, positions: []}
    const offset = {x: 0, y: 1};
    let positions = self.activeShape.gridPositions(offset);
    while(!self.matrix.isCollision(positions)) {
      success.offset = {...offset};
      success.positions = positions;
      offset.y ++;
      positions = self.activeShape.gridPositions(offset);
    }
    return success;
  },
})).actions(self => ({
  move(direction) {
    const nextPositions = self.activeShape.gridPositions(direction);
    if (self.matrix.isCollision(nextPositions)) {
      return false;
    }
    self.activeShape.move(direction);
    return true;
  },
  hardDrop() {
    const { offset } = self.hardDropPosition;
    self.activeShape.move(offset);
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
    self.activeShape = undefined;
    self.matrix.init();
  },
  addScore(lines) {
    self.score += logic.score.basic(lines);
  }
}))

export default Player;
