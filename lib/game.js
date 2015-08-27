(function () {
  window.Tiles = window.Tiles || {};

  var Game = Tiles.Game = function () {
    this.board = new Tiles.Board();

    for (var i = 0; i < 2; i++) { this.addTile(); }
  };

  Game.DIM_X = 600;
  Game.DIM_Y = 600;

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.board.draw(ctx);
  };

  Game.prototype.addTile = function () {
    var tile = new Tiles.Tile({
      board: this.board
    });

    this.board.insertTile(tile);
  };

  Game.prototype.over = function () {
    return this.board.filled;
  };

  Game.TRANSLATE = {
    "up": [0, -1],
    "down": [0, 1],
    "left": [-1, 0],
    "right": [1, 0]
  };

  Game.prototype.getVector = function (dir) {
    return Game.TRANSLATE(dir);
  };

  Game.prototype.moveTile = function (dir) {
    var vector = this.getVector(dir);
  };

  // if left (-1) -> 3-0
  // if right (1) -> 0-3
  // if up (-1) -> 3-0
  // if down (1) -> 0-3

  Game.prototype.traversalVectors = function (vector) {
    var traverseX = [];
    var traverseY = [];
    for (var i = 0; i < this.board.size; i++) {
      traverseX.push(i);
      traverseY.push(i);
    }

    if (vector[0] === -1) { traverseX = traverseX.reverse(); }
    if (vector[1] === -1) { traverseY = traverseY.reverse(); }

    return [traverseX, traverseY];
  };

  Game.prototype.move = function (dir) {
    var vector = this.getVector(dir);
    var traverse = this.traversalVectors(vector);
    var traverseX = traverse[0];
    var traverseY = traverse[1];
    var tile;

    for (var r = 0; r < this.board.size; r++) {
      for (var c = 0; c < this.board.size; c++) {
        tile = this.board[traverseX[r]][traverseY[c]];
        // do more stuff
      }
    }
  };

  Game.prototype.findObstacle = function (pos, vector) {
    var obs;

    do {
      prevPos = pos;
      obs = [pos[0] + vector[0], pos[1] + vector[1]];
    } while (this.board.withinBounds(obs) && !this.board.spotTaken(obs));

    return [prevPos, obstacle];
  };
})();
