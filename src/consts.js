const consts = {
    BACKGROUND_COLOR: '#eeeeee',
    GRID_BORDER_COLOR: '#444444',
    GRID_WIDTH: 30,
    HEIGHT: 20,
    WIDTH: 10,
    INTERVAL: {
        BASE: 500,
        SOFT: 50,
    },
    FIGURES: [
        {
            color: '#50F0F0',
            name: 'I',
            shape: [
                [0,0,0,0],
                [1,1,1,1],
                [0,0,0,0],
                [0,0,0,0],
            ],
        },
        {
            color: '#1D00F0',
            name: "J",
            shape: [
                [1,0,0],
                [1,1,1],
                [0,0,0]
            ]
        },
        {
            color: '#F0A002',
            name: "L",
            shape: [
                [0,0,1],
                [1,1,1],
                [0,0,0]
            ]
        },
        {
            color: '#F0F001',
            name: "O",
            shape: [
                [1,1],
                [1,1]
            ]
        },
        {
            color: '#4AF000',
            name: "S",
            shape: [
                [0,1,1],
                [1,1,0],
                [0,0,0]
            ],
        },
        {
            color: '#A000F0',
            name: "T",
            shape: [
                [0,1,0],
                [1,1,1],
                [0,0,0]
            ]
        },
        {
            color: '#F00000',
            name: "Z",
            shape: [
                [1,1,0],
                [0,1,1],
                [0,0,0]
            ]
        }
    ],
    WALL_KICKS: {
        BASIC_KICK_WALL: [
            [{x: 0, y: 0}, {x: -1, y: 0}, {x: -1, y: +1}, {x: 0, y: -2}, {x: -1, y: -2}],
            [{x: 0, y: 0}, {x: +1, y: 0}, {x: +1, y: -1}, {x: 0, y: +2}, {x: +1, y: +2}],
            [{x: 0, y: 0}, {x: +1, y: 0}, {x: +1, y: +1}, {x: 0, y: -2}, {x: +1, y: -2}],
            [{x: 0, y: 0}, {x: -1, y: 0}, {x: -1, y: -1}, {x: 0, y: +2}, {x: -1, y: +2}]
        ],
        I_KICK_WALL: [
            [{x: 0, y: 0}, {x: -2, y: 0}, {x: +1, y: 0}, {x: -2, y: -1}, {x: +1, y: +2}],
            [{x: 0, y: 0}, {x: -1, y: 0}, {x: +2, y: 0}, {x: -1, y: +2}, {x: +2, y: -1}],
            [{x: 0, y: 0}, {x: +2, y: 0}, {x: -1, y: 0}, {x: +2, y: +1}, {x: -1, y: -2}],
            [{x: 0, y: 0}, {x: +1, y: 0}, {x: -2, y: 0}, {x: +1, y: -2}, {x: -2, y: +1}]
        ]
    }
};

export default consts;
