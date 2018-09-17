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
            color: '#70baba',
            name: 'I',
            shape: [
                [0,0,0,0],
                [1,1,1,1],
                [0,0,0,0],
                [0,0,0,0],
            ],
        },
        {
            color: '#3b39c9',
            name: "J",
            shape: [
                [1,0,0],
                [1,1,1],
                [0,0,0]
            ]
        },
        {
            color: '#e9a333',
            name: "L",
            shape: [
                [0,0,1],
                [1,1,1],
                [0,0,0]
            ]
        },
        {
            color: '#ded73f',
            name: "O",
            shape: [
                [1,1],
                [1,1]
            ]
        },
        {
            color: '#7ddf4c',
            name: "S",
            shape: [
                [0,1,1],
                [1,1,0],
                [0,0,0]
            ],
        },
        {
            color: '#9e2fca',
            name: "T",
            shape: [
                [0,1,0],
                [1,1,1],
                [0,0,0]
            ]
        },
        {
            color: '#d6393f',
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
