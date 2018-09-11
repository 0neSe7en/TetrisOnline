import {types} from 'mobx-state-tree';
import Point from './Point';

// TODO: 优化旋转
function rotate(original) {
    const result = [];
    for (let y = 0; y < original.length; y++) {
        let row = original.map(e => e[y]).reverse();
        result.push(row);
    }
    return result;
}

const Shape = types.model({
    currentPosition: Point,
    shape: types.frozen(),
    color: types.string,
    angle: 0
}).actions((self) => ({
    move(point) {
        const x = self.currentPosition.x + point.x;
        const y = self.currentPosition.y + point.y;
        self.currentPosition.update(x, y);
    },
    rotate() {
        self.angle += 90;
        if (self.angle > 360) {
            self.angle = self.angle - 360;
        }
    }
})).views((self) => ({
    get realShape() {
        const count = self.angle / 90;
        let r = self.shape;
        for (let i = 0; i < count; i++) {
            r = rotate(r);
        }
        return r;
    },
    gridPositions(direction = {x: 0, y: 0}) {
        const res = [];
        // console.log('Get grid positions',)
        for (let y = 0; y < self.realShape.length; y++) {
            const row = self.realShape[y];
            for (let x = 0; x < row.length; x++) {
                if (row[x]) {
                    res.push({
                        x: x + self.currentPosition.x + direction.x,
                        y: y + self.currentPosition.y + direction.y,
                    })
                }
            }
        }
        return res;
    },
}));

export default Shape;
