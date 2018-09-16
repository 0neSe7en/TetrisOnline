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
    name: types.string,
    angle: 0
}).actions((self) => ({
    move(point) {
        const x = self.currentPosition.x + point.x;
        const y = self.currentPosition.y + point.y;
        self.currentPosition.update(x, y);
    },
    rotate() {
        self.angle += 1;
        if (self.angle === 4) {
            self.angle = self.angle - 4;
        }
    }
})).views((self) => ({
    realShape(angle) {
        let r = self.shape;
        let rotateCount = angle === undefined ? self.angle : angle;
        for (let i = 0; i < rotateCount; i++) {
            r = rotate(r);
        }
        return r;
    },
    gridPositions(direction = {x: 0, y: 0}) {
        const res = [];
        const shape = self.realShape(direction.angle);
        for (let y = 0; y < shape.length; y++) {
            const row = shape[y];
            for (let x = 0; x < row.length; x++) {
                if (row[x]) {
                    res.push({
                        x: x + self.currentPosition.x + direction.x,
                        y: y + self.currentPosition.y + direction.y,
                        color: self.color,
                    })
                }
            }
        }
        return res;
    },
}));

export default Shape;
