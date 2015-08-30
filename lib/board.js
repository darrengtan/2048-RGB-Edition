(function () {
  window.Tiles = window.Tiles || {};

  var Board = Tiles.Board = function () {
    this.size = 4;
    this.grid = this.emptyGrid();
  };

  Board.FILL_COLOR = "#bbada0";

  Board.prototype.eachSpot = function (callback) {
    for (var r = 0; r < this.size; r++) {
      for (var c = 0; c < this.size; c++) {
        callback(r, c, this.grid[r][c]);
      }
    }
  };

  Board.prototype.emptyGrid = function () {
    var newGrid = [];
    for (var r = 0; r < this.size; r++) {
      var row = [];
      for (var c = 0; c < this.size; c++) {
        row.push(null);
      }

      newGrid.push(row);
    }

    return newGrid;
  };


  Board.prototype.availSpots = function () {
    var available = [];
    this.eachSpot(function (r, c, spot) {
      if (!spot) {
        available.push([r, c]);
      }
    });

    return available;
  };

  Board.prototype.randAvailSpot = function () {
    var availSpots = this.availSpots();
    if (availSpots.length > 0) {
      return availSpots[Math.floor(Math.random() * availSpots.length)];
    }
  };

  Board.prototype.spotEmpty = function (pos) {
    var posX = pos[0];
    var posY = pos[1];
    return this.grid[posX][posY] === null;
  };

  Board.prototype.spotContent = function (pos) {
    if (!this.withinBounds(pos)) { return null; }
    var posX = pos[0];
    var posY = pos[1];
    return this.grid[posX][posY];
  };

  Board.prototype.insertTile = function (tile) {
    var posX = tile.pos[0];
    var posY = tile.pos[1];
    this.grid[posX][posY] = tile;
    var $tileDiv = $("<div>");
    $tileDiv.addClass(tile.selector);
    $(".tile-container").append($tileDiv);
    $tileDiv.hide();
    $tileDiv.delay(100).fadeIn(100);
  };

  Board.prototype.removeTile = function (tile) {
    posX = tile.pos[0];
    posY = tile.pos[1];
    this.grid[posX][posY] = null;
  };

  Board.prototype.moveTile = function (tile, pos) {
    this.grid[tile.pos[0]][tile.pos[1]] = null;
    tile.updatePos(pos);
    this.grid[pos[0]][pos[1]] = tile;
  };

  Board.prototype.withinBounds = function (pos) {
    return pos[0] >= 0 && pos[0] < this.size &&
      pos[1] >= 0 && pos[1] < this.size;
  };

  Board.prototype.spotContent = function (pos) {
    if (this.withinBounds(pos)) {
      return this.grid[pos[0]][pos[1]];
    } else {
      return null;
    }
  };
})();
