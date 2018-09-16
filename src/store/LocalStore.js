import { types } from 'mobx-state-tree';
import {
    Shape
} from './types';
import consts from '../consts'

const LocalStore = types.model('LocalStore', {
    nextShape: types.maybe(Shape),
    holdShape: types.maybe(Shape),
    currentInterval: consts.INTERVAL.BASE,
    selfId: types.string,
}).actions(self => ({
    setNextShape(figure) {
        self.nextShape = {
            currentPosition: {x: 0, y: 0},
            shape: figure.shape,
            color: figure.color,
            name: figure.name,
        }
    },
    hold(shape) {
        const current = self.holdShape;
        self.holdShape = shape;
        return current;
    },
    soft() {
        self.currentInterval = consts.INTERVAL.SOFT;
    },
    resetSoft() {
        self.currentInterval = consts.INTERVAL.BASE;
    }
}))

export default LocalStore;
