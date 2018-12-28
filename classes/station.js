class Station {
    constructor(x, y, map) {
        this.x = x
        this.y = y
        this.map = map
    }

    draw(ctx) {
        drawCell(this.x, this.y, this.map, ctx,
            {'fillStyle': 'rgba(0, 0, 0, 1)',
            'padding': 0});
        drawCell(this.x, this.y, this.map, ctx,
            {'fillStyle': 'rgba(255, 255, 255, 1)',
            'padding': 10});
    }
}