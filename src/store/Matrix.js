import * as _ from 'lodash';
import { types } from "mobx-state-tree";
import consts from "../consts";

const Row = types.model({
    data: types.array(types.maybeNull(types.string)),
}).actions((self) => ({
    fill(column, color) {
        self.data[column] = color;
    }
})).views((self) => ({
    get isFilled() {
        return self.data.every(i => i !== null);
    },
}));


const Matrix = types.model({
    data: types.array(Row),
}).actions((self) => ({
    init() {
        const res = [];
        for (let y = 0; y < consts.HEIGHT; y++) {
            const row = [];
            for (let x = 0; x < consts.WIDTH; x++) {
                row.push(null);
            }
            res.push({data: row});
        }
        self.data = res;
    },
    insertShape(targetShape) {
        const color = targetShape.color;
        const positions = targetShape.gridPositions();
        console.log('insert shape:', positions);
        _.forEach(positions, pos => {
            self.data[pos.y].fill(pos.x, color);
        })
    }
})).views((self) => ({
    isOutbound(position) {
        const positions = _.isArray(position) ? position : [position];
        return _.some(positions, pos => (
            pos.y >= consts.HEIGHT
         || pos.x >= consts.WIDTH
         || pos.y < 0 || pos.x < 0
        ))
    },
    isCollision(position) {
        const positions = _.isArray(position) ? position : [position];
        return self.isOutbound(positions) || _.some(positions, pos => self.data[pos.y].data[pos.x]);
    },
    get filledPositions() {
        const res = [];
        _.forEach(self.data, (row, y) => {
            _.forEach(row.data, (color, x) => {
                if (color) {
                    res.push({x, y, color})
                }
            })
        });
        return res;
    }
}));

export default Matrix;
export { Row };
