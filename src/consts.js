const consts = {
    BACKGROUND_COLOR: '#eeeeee',
    GRID_BORDER_COLOR: '#444444',
    GRID_WIDTH: 20,
    HEIGHT: 20,
    WIDTH: 10,
    INTERVAL: {
        BASE: 500,
        SOFT: 50,
    },
    FIGURES: [
        {
            color: '#6EE1FB',
            name: 'I',
            shape: [
                [0,0,0,0],
                [1,1,1,1],
                [0,0,0,0],
                [0,0,0,0],
            ],
        },
        {
            color: '#3CA2FC',
            name: "J",
            shape: [
                [1,0,0],
                [1,1,1],
                [0,0,0]
            ]
        },
        {
            color: '#F0650B',
            name: "L",
            shape: [
                [0,0,1],
                [1,1,1],
                [0,0,0]
            ]
        },
        {
            color: '#F8B50E',
            name: "O",
            shape: [
                [1,1],
                [1,1]
            ]
        },
        {
            color: '#33A712',
            name: "S",
            shape: [
                [0,1,1],
                [1,1,0],
                [0,0,0]
            ],
        },
        {
            color: '#8354BA',
            name: "T",
            shape: [
                [0,1,0],
                [1,1,1],
                [0,0,0]
            ]
        },
        {
            color: '#F41F1D',
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
