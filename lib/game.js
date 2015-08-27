(function () {
  window.Tiles = window.Tiles || {};

  var Game = Tiles.Game = function () {
    this.board = new Tiles.Board();
    this.won = false;

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
    return this.board.filled || this.won;
  };

  Game.TRANSLATE = {
    "up": [0, -1],
    "down": [0, 1],
    "left": [-1, 0],
    "right": [1, 0]
  };

  Game.prototype.getVector = function (dir) {
    return Game.TRANSLATE[dir];
  };

  Game.prototype.moveTile = function (tile, pos) {
    this.removeTile(tile);
    this.board[pos[0]][pos[1]] = tile;
  };

  // if left (-1) -> 0-3
  // if right (1) -> 3-0
  // if up (-1) -> 0-3
  // if down (1) -> 3-0

  Game.prototype.traversalVectors = function (vector) {
    var traverseX = [];
    var traverseY = [];
    for (var i = 0; i < this.board.size; i++) {
      traverseX.push(i);
      traverseY.push(i);
    }

    if (vector[0] === 1) { traverseX = traverseX.reverse(); }
    if (vector[1] === 1) { traverseY = traverseY.reverse(); }

    return [traverseX, traverseY];
  };

  Game.prototype.move = function (dir) {
    var vector = this.getVector(dir);
    console.log(vector);
    var traverse = this.traversalVectors(vector);
    var traverseX = traverse[0];
    var traverseY = traverse[1];
    var moved = false;
    var tile;
    var obstacle;
    var newTile;

    for (var r = 0; r < this.board.size; r++) {
      for (var c = 0; c < this.board.size; c++) {
        tile = this.board.spotContent([traverseX[r], traverseY[c]]);
        // if (tile) {
        //   obsPath = this.findObstacle([traverseX[r], traverseY[c]], vector);
        //   obstacle = this.board.spotContent(obsPath[1]);
        //   if (obstacle) {
        //     if (tile.equalVal(obstacle) && !obstacle.merged) {
        //       newTile = new Tiles.Tile({
        //         val: tile.val * 2,
        //         pos: obstacle.pos,
        //         merged: true
        //       });
        //
        //       this.board.insertTile(newTile);
        //       this.removeTile(tile);
        //       moved = true;
        //     } else {
        //       this.moveTile(tile, obsPath[0]);
        //     }
        //   }
        // }

        if (tile) { console.log(tile); }
      }
    }

    if (moved) { this.addTile(); }
  };

  Game.prototype.findObstacle = function (pos, vector) {
    var obs;

    do {
      prevPos = pos;
      obs = [pos[0] + vector[0], pos[1] + vector[1]];
    } while (this.board.withinBounds(obs) && !this.board.spotTaken(obs));

    return [prevPos, obs];
  };
})();
