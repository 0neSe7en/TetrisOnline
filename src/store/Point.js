import { types } from 'mobx-state-tree';
import consts from '../consts';

const Point = types.model({
    x: types.number,
    y: types.number,
}).actions((self) => {
    return {
        update(x, y) {
            self.x = x;
            self.y = y;
        },
    };
}).views((self) => ({
    get gridPosition() {
        return {
            x: self.x * consts.GRID_WIDTH,
            y: self.y * consts.GRID_WIDTH,
        };
    },
}));

export default Point;
