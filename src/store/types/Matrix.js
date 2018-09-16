import { types } from "mobx-state-tree";
import consts from "../../consts";

const _ = require('lodash');

const Row = types.model({
    data: types.array(types.maybeNull(types.string)),
}).actions((self) => ({
    fill(column, color) {
        self.data[column] = color;
    },
})).views((self) => ({
    get isFilled() {
        return self.data.every(i => i !== null);
    },
}));


const Matrix = types.model({
    data: types.array(Row),
}).actions((self) => ({
    init() {
        self.data = _.times(consts.HEIGHT, () => ({
            data: _.times(consts.WIDTH, () => null)
        }))
    },
    insertShape(targetShape) {
        const color = targetShape.color;
        const positions = targetShape.gridPositions();
        _.forEach(positions, pos => {
            self.data[pos.y].fill(pos.x, color);
        })
    },
    tryClear() {
        const data = self.data.slice();
        const removed = _.remove(data, row => row.isFilled);
        _.times(removed.length, () => {
            data.unshift({data: _.times(consts.WIDTH, () => null)});
        })
        self.data = data;
        return removed
    }
})).views((self) => ({
    isOutbound(position) {
        const positions = _.isArray(position) ? position : [position];
        return _.some(positions, pos => (
            pos.y >= consts.HEIGHT
         || pos.x >= consts.WIDTH
         || pos.x < 0
        ))
    },
    isCollision(position) {
        const positions = _.isArray(position) ? position : [position];
        return self.isOutbound(positions) || _.some(positions, pos => self.data[pos.y] !== undefined && self.data[pos.y].data[pos.x]);
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
