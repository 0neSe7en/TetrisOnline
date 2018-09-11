import { types } from 'mobx-state-tree';
import * as _ from 'lodash';
import Game from './Game';
import Shape from './Shape';
import Matrix from './Matrix';


const Store = types.model({
    activeShape: types.maybe(Shape),
    matrix: Matrix,
    game: Game,
}).actions((self) => ({
    move(direction) {
        const nextPositions = self.activeShape.gridPositions(direction);
        if (self.matrix.isCollision(nextPositions)) {
            return false;
        }
        self.activeShape.move(direction);
        return true;
    },
    setActiveShape(position, figure) {
        self.activeShape = {
            currentPosition: position,
            shape: figure.shape,
            color: figure.color
        }
    }
}));


const store = Store.create({
    game: {
        state: 'stop',
        mode: 'single',
        score: 0
    },
    matrix: {
        data: [],
    },
});

// store.matrix.init();

window.store = store;

export default store;
