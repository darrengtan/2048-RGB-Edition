(function () {
  window.Tiles = window.Tiles || {};

  var Game = Tiles.Game = function () {
    this.board = new Tiles.Board();
    this.won = false;
    this.score = 0;

    for (var i = 0; i < 2; i++) { this.addTile(); }
  };

  Game.DIM_X = 400;
  Game.DIM_Y = 400;

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
    return this.won || !this.stillPlayable();
  };

  Game.TRANSLATE = {
    "up": [0, -1],
    "down": [0, 1],
    "left": [-1, 0],
    "right": [1, 0]
  };

  Game.VAL_CLASSES = [
    "val-2",
    "val-4",
    "val-8",
    "val-16",
    "val-32",
    "val-64",
    "val-128",
    "val-256",
    "val-512",
    "val-1024",
    "val-2048",
  ];

  Game.POS_CLASSES = [
    "pos-0-0",
    "pos-0-1",
    "pos-0-2",
    "pos-0-3",
    "pos-1-0",
    "pos-1-1",
    "pos-1-2",
    "pos-1-3",
    "pos-2-0",
    "pos-2-1",
    "pos-2-2",
    "pos-2-3",
    "pos-3-0",
    "pos-3-1",
    "pos-3-2",
    "pos-3-3",
  ];

  Game.prototype.getVector = function (dir) {
    return Game.TRANSLATE[dir];
  };

  Game.prototype.moveTile = function (tile, pos) {
    var $tile = $(".tile.val-" + tile.val + ".pos-" + tile.pos[0] + "-" + tile.pos[1]);
    this.board.moveTile(tile, pos);
    tile.updatePos(pos);
    Game.POS_CLASSES.forEach(function (posClass) {
      $tile.removeClass(posClass);
    });

    $tile.removeClass("new").addClass(tile.selector);
  };

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

  Game.prototype.resetMerged = function () {
    var tile;
    this.board.eachSpot(function (r, c, spot) {
      if (spot) {
        spot.merged = false;
      }
    });
  };

  Game.prototype.mergeTiles = function (tile, obstacle) {
    // this.board.removeTile(obstacle);
    // this.board.removeTile(tile);
    // this.board.insertTile(newTile);
    var $tile = $(".tile.val-" + tile.val + ".pos-" + tile.pos[0] + "-" + tile.pos[1]);
    var $obstacle = $(".tile.val-" + obstacle.val + ".pos-" + obstacle.pos[0] + "-" + obstacle.pos[1]);
    var newTile = new Tiles.Tile({
      val: tile.val * 2,
      pos: obstacle.pos,
      merged: true
    });
    this.moveTile(tile, obstacle.pos);
    Game.VAL_CLASSES.forEach(function (valClass) {
      $tile.removeClass(valClass);
      $obstacle.removeClass(valClass);
    });

    $tile.addClass("val-" + newTile.val).addClass("merged");
    $obstacle.addClass("val-" + newTile.val).addClass("merged");
    this.board.mergeTile(tile);
    $obstacle.remove();
    this.updateScore(newTile.val);
    if (newTile.val === 256) {
      this.won = true;
      this.checkGameEnd();
    }
  };

  Game.prototype.obstacleAction = function (tile, vector) {
    var obsPath = this.findObstacle(tile.pos, vector);
    var obstacle = this.board.spotContent(obsPath[1]);
    var prevPos;
    if (obstacle) {
      prevPos = null;
      if (tile.equalVal(obstacle) && !obstacle.merged) {
        this.mergeTiles(tile, obstacle);
        return true;
      } else {
        prevPos = tile.pos;
        this.moveTile(tile, obsPath[0]);
        return JSON.stringify(prevPos) !== JSON.stringify(obsPath[0]);
      }
    } else {
      prevPos = tile.pos;
      this.moveTile(tile, obsPath[0]);
      return JSON.stringify(prevPos) !== JSON.stringify(obsPath[0]);
    }
  };

  Game.prototype.tileAction = function (traverse, vector, r, c) {
    var traverseX = traverse[0];
    var traverseY = traverse[1];
    var tile = this.board.spotContent([traverseX[r], traverseY[c]]);
    var moved;
    if (tile) {
      moved = this.obstacleAction(tile, vector);
    }

    return moved;
  };

  Game.prototype.move = function (dir) {
    if ($('div.overlay').length !== 0) { return; }
    this.resetMerged();
    var moved;
    var vector = this.getVector(dir);
    var traverse = this.traversalVectors(vector);
    var newTile;
    var prevPos;

    for (var r = 0; r < this.board.size; r++) {
      for (var c = 0; c < this.board.size; c++) {
        bool = this.tileAction(traverse, vector, r, c);
        if (bool) {
          moved = true;
        }
      }
    }

    this.checkMoved(moved);
  };

  Game.prototype.checkMoved = function (moved) {
    if (moved) {
      this.addTile();
    } else {
      this.checkGameEnd();
    }
  };

  Game.prototype.checkGameEnd = function () {
    if (this.over() || !this.stillPlayable()) {
      var overlay = $("<div>");
      overlay.addClass("overlay");
      $('body').append(overlay[0]);
      $('div.result').html(this.won ? "You Win!" : "Game Over");
    }
  };

  Game.prototype.stillPlayable = function () {
    var game = this;
    var playable = false;
    var vector;
    var adjacent;

    this.board.eachSpot(function (r, c, spot) {
      if (spot) {
        ["up", "down", "left", "right"].forEach(function (dir) {
          vector = game.getVector(dir);
          pos = [r + vector[0], c + vector[1]];
          if (this.board.withinBounds(pos)) {
            adjacent = this.board.grid[r + vector[0]][c + vector[1]];
            if (adjacent === null || adjacent.val === spot.val) {
              playable = true;
            }
          }
        }.bind(this));
      }
    }.bind(this));

    return playable;
  };

  Game.prototype.findObstacle = function (pos, vector) {
    var obs;

    do {
      prevPos = pos;
      pos = [pos[0] + vector[0], pos[1] + vector[1]];
    } while (this.board.withinBounds(pos) && this.board.spotEmpty(pos));

    return [prevPos, pos];
  };

  Game.prototype.updateScore = function (points) {
    this.score += points;
    $('div.score').html("Score: " + this.score);
  };
})();
