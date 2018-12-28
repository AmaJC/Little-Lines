class Map {
    constructor(grid, stations) {
        this.grid = grid
        this.stations = stations
    }
}

Map.cells = {
    0: {
        "fillStyle": 'rgba(100, 245, 100, 0.5)', // beige: 'rgba(240, 245, 220, 1)'
        "padding": 2
    },
    1: {
        "fillStyle": 'rgba(60, 180, 210, 1)',
        "padding": 2
    }
}