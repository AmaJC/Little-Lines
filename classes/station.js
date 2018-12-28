export function Station(x, y, map) {
  this.x = x
  this.y = y
  this.map = map

  this.draw = function(ctx) {
    drawCell(this.x, this.y, this.map, ctx,
            {'fillStyle': 'rgba(0, 0, 0, 1)',
            'padding': 0});
    drawCell(this.x, this.y, this.map, ctx,
            {'fillStyle': 'rgba(255, 255, 255, 1)',
            'padding': 10});
  }
}