var map = {
  "grid": [
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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  // 0: land
  // 1: river
  // 2: square station
  "cells": {
    0: {
      "fillStyle": 'rgba(100, 245, 100, 0.5)', // beige: 'rgba(240, 245, 220, 1)'
      "padding": 2,
    },
    1: {
      "fillStyle": 'rgba(60, 180, 210, 1)',
      "padding": 2,
    },
    2: {
      "fillStyle": 'rgba(60, 180, 210, 1)',
      "padding": 2,
    }
  },
  "stations": []
}

// when the window loads, this is executed
function setup() {
  var canvas = document.getElementById('canvas');
  canvas_dim = Math.min(document.body.clientWidth, document.body.clientHeight);
  canvas.width = canvas_dim;
  canvas.height = canvas_dim;
  map.pause = true

  var ctx = canvas.getContext('2d');
  window.requestAnimationFrame(function() {
    draw(ctx, map)
  });
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

  var station1 = new Station(map);
  map.stations.push(station1);
}

function draw(ctx, map) {
  if (!map.pause) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap(ctx, map);
    //drawPlayers(ctx, map.players);
    drawStations(ctx, map.stations);
  }
  window.requestAnimationFrame(function() {
    draw(ctx, map)
  });
}

function drawCell(x, y, map, ctx, styles) {
  if (styles === undefined) {
    var styles = map.cells[map.grid[y][x]];
  }
  ctx.fillStyle = styles.fillStyle;
  ctx.fillRect(
    map.cell_dimension * x + styles.padding,
    map.cell_dimension * y + styles.padding,
    map.cell_dimension - (styles.padding * 2),
    map.cell_dimension - (styles.padding * 2));
}

function drawMap(ctx, map) {
  ctx.fillStyle = 'rgba(0, 0, 200, 0.25)';
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

function Station(map) {
  this.x = 1
  this.y = 1
  this.map = map

  // draw the station
  this.draw = function(ctx) {
    drawCell(this.x, this.y, this.map, ctx,
            {'fillStyle': 'rgba(0, 0, 0, 1)',
            'padding': 0});
    drawCell(this.x, this.y, this.map, ctx,
            {'fillStyle': 'rgba(200, 255, 255, 1)',
            'padding': 15});
  }
}

function Train(map) {
  this.wagons = []
}


function gameOver() {
  document.getElementById('game').style.display = 'none'
  document.getElementById('gameover').style.display = 'block'
}

window.onload = function() {
  setup()
}
