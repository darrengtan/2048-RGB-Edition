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

  // if left -> 0-3
  // if right -> 3-0
  // if up -> 3-0
  // if down -> 0-3

  Game.prototype.traversalVector = function (vector) {
    var traverseX = [];
    var traverseY = [];
    for (var i = 0; i < this.board.size; i++) {
      traverseX.push(i);
      traverseY.push(i);
    }

    if (vector[0] === -1) { traverseX = traverseX.reverse(); }
    if (vector[1] === 1) { traverseY = traverseY.reverse(); }

    return [traverseX, traverseY];
  };

  Game.prototype.move = function (dir) {
    var vector = this.getVector(dir);
    var traverseDir = this.chooseTraversal(vector);
    if (vector[0] !== 0) {
      this.board.eachRow(function (row) {
        this.doSomething(row, traverseDir).bind(this)();
      });
    } else {
      this.board.eachColumn(function (col) {
        this.doSomething(row, traverseDir).bind(this)();
      });
    }
  };

  Game.prototype.chooseTraversal = function (vector) {
    var traverse = this.traversalVector(vector);
    var traverseDir;
    if (vector[0] === 0) {
      traverseDir = traverse[1];
    } else {
      traverseDir = traverse[0];
    }

    return traverseDir;
  };
})();
