import {types} from 'mobx-state-tree';
import Shape from './types/Shape';
import consts from '../consts'

const Local = types.model('Local', {
  nextShape: types.maybe(Shape),
  holdShape: types.maybe(Shape),
  canHold: true,
  currentInterval: consts.INTERVAL.BASE,
  selfId: '',
  currentNickName: '',
  targetPeer: ''
}).actions(self => ({
  inputNickName(v) {
    self.currentNickName = v;
  },
  inputTargetPeer(v) {
    self.targetPeer = v;
  },
  setNextShape(figure) {
    self.canHold = true;
    self.nextShape = {
      currentPosition: {x: 0, y: 0},
      shape: figure.shape,
      color: figure.color,
      name: figure.name,
    }
  },
  hold(shape) {
    let current = self.holdShape;
    if (current) {
      current.moveTo(consts.INITIAL_POSITIONS);
      current = current.toJSON();
    }
    self.holdShape = shape;
    self.holdShape.moveTo({x: 0, y: 0});
    self.canHold = false;
    return current;
  },
  soft() {
    self.currentInterval = consts.INTERVAL.SOFT;
  },
  resetSoft() {
    self.currentInterval = consts.INTERVAL.BASE;
  },
  setSelfId(id) {
    self.selfId = id;
  },
  reset() {
    self.nextShape = undefined;
    self.holdShape = undefined;
    self.resetSoft();
  }
}))

const localStore = Local.create({})
window.localStore = localStore;

export default localStore;
