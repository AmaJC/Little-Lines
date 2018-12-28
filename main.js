let grid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

var map = new Map(grid, [])
var line, isDown;

// when the window loads, this is executed
function setup() {
    var canvas = document.getElementById('canvas');
    var canvas_dim = Math.min(document.body.clientWidth, document.body.clientHeight);
    canvas.width = canvas_dim;
    canvas.height = canvas_dim;
    map.pause = true

    var ctx = canvas.getContext('2d');
    // window.requestAnimationFrame(function() {
    // draw(ctx, map)
    // });

    setupLineListener(canvas, ctx);
    drawMap(ctx, map);
    drawStations(ctx, map.stations);
}

function setupLineListener(canvas, ctx) {
    ctx.lineWidth = 50;
    ctx.strokeStyle = 'red';

    canvas.onmousedown = function(pointer){
        console.log("Mouse Down", pointer.x, pointer.y)
        ctx.beginPath()
        ctx.moveTo(pointer.x, pointer.y)
    };

    canvas.onmousemove = function(pointer){
        //ctx.lineTo(pointer.x, pointer.y)
    };

    canvas.onmouseup = function(pointer){
        console.log("Mouse Up")
        ctx.lineTo(pointer.x, pointer.y)
        ctx.stroke();
    };
}

function newGame(map) {
    document.getElementById('game').style.display = 'block'
    document.getElementById('gameover').style.display = 'none'
    document.getElementById('start').style.display = 'none'
    document.getElementById('date').innerHTML = 'Mon'
    document.getElementById('score').innerHTML = 0
    map.pause = false
    map.stations = []
    map.width = map.grid[0].length
    map.height = map.grid.length

    var cell_dimension = Math.min(
    canvas.width / map.width,
    canvas.height / map.height);
    map.cell_dimension = cell_dimension

    var station1 = new Station(1, 1, map);
    var station2 = new Station(10, 2, map);
    map.stations.push(station1);
    map.stations.push(station2);

    setup();
}

function draw(ctx, map) {
    if (!map.pause) {
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        //drawMap(ctx, map);
        //drawStations(ctx, map.stations);
    }

    window.requestAnimationFrame(function() {
        draw(ctx, map)
    });
}

function drawCell(x, y, map, ctx, styles) {
    if (styles === undefined) {
        var styles = Map.cells[map.grid[y][x]];
    }
    ctx.fillStyle = styles.fillStyle;
    ctx.fillRect(
        map.cell_dimension * x + styles.padding,
        map.cell_dimension * y + styles.padding,
        map.cell_dimension - (styles.padding * 2),
        map.cell_dimension - (styles.padding * 2)
    );
}

function drawMap(ctx, map) {
    for (var i = 0; i < map.grid.length; i++) {
        for (var j = 0; j < map.grid[0].length; j++) {
            drawCell(j, i, map, ctx)
        }
    }
}

function drawStations(ctx, stations) {
    for (var i = 0; i < stations.length; i++) {
        var station = stations[i];
        station.draw(ctx);
    }
}

function gameOver() {
    document.getElementById('game').style.display = 'none'
    document.getElementById('gameover').style.display = 'block'
}

window.onload = function() {
    setup()
}
