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
})();
