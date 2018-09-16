import consts from '../consts';
export function srs(activeShape, matrix) {
    const currentAngle = activeShape.angle;
    let kickTests;
    switch (activeShape.name) {
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
        const testPosition = activeShape.gridPositions({angle: currentAngle + 1, x: offset.x, y: offset.y});
        if (!matrix.isCollision(testPosition)) {
            return offset;
        }
    }
    return null;
}
