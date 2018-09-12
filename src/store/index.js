import { types } from 'mobx-state-tree';
import Game from './Game';
import Shape from './Shape';
import Matrix from './Matrix';
import consts  from '../consts'


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
    tryRotate() {
        const currentAngle = self.activeShape.angle;
        const nextPositions = self.activeShape.gridPositions({x: 0, y: 0, angle: currentAngle + 1});
        if (!self.matrix.isCollision(nextPositions)) {
            self.activeShape.rotate();
            return true;
        }
        let kickTests;
        switch (self.activeShape.name) {
            case 'I':
                kickTests = consts.WALL_KICKS.I_KICK_WALL[currentAngle];
                break;
            case 'O':
                kickTests = [];
                break;
            default:
                kickTests = consts.WALL_KICKS.BASIC_KICK_WALL[currentAngle];
        }
        for (let offset of kickTests) {
            const testPosition = self.activeShape.gridPositions({angle: currentAngle + 1, x: offset.x, y: offset.y});
            if (!self.matrix.isCollision(testPosition)) {
                self.activeShape.rotate();
                self.activeShape.move(offset);
                return true;
            }
        }
        return false;
    },
    setActiveShape(position, figure) {
        self.activeShape = {
            currentPosition: position,
            shape: figure.shape,
            color: figure.color,
            name: figure.name,
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

window.store = store;

export default store;
