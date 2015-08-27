(function () {
  window.Tiles = window.Tiles || {};

  var Board = Tiles.Board = function () {
    this.size = 4;
    this.grid = this.emptyGrid();
  };

  Board.FILL_COLOR = "#bbada0";

  Board.prototype.draw = function (ctx) {
    this.eachSpot(function (r, c, spot) {
      var topLeftX = r * 150;
      var topLeftY = c * 150;
      ctx.beginPath();
      ctx.font = "80px Helvetica";
      if (spot) {
        ctx.fillStyle = spot.color;
        ctx.fillRect(topLeftX, topLeftY, 150, 150);
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(spot.val, topLeftX + 75, topLeftY + 75);
      } else {
        ctx.fillStyle = Board.FILL_COLOR;
        ctx.fillRect(topLeftX, topLeftY, 150, 150);
      }
    });
  };

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

  Board.prototype.filled = function () {
    return this.availSpots.length === 0;
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
  };

  Board.prototype.removeTile = function (tile) {
    posX = tile.pos[0];
    posY = tile.pos[1];
    this.grid[posX][posY] = null;
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

  Board.prototype.columns = function () {
    var colGrid = this.emptyGrid();
    this.grid.eachSpot(function (r, c, spot) {
      colGrid[c][r] = spot;
    });

    return colGrid;
  };

  Board.prototype.eachColumn = function (callback) {
    var colGrid = this.columns();
    for (var i = 0; i < this.size; i++) {
      callback(colGrid[i]);
    }
  };

  Board.prototype.eachRow = function (callback) {
    for (var i = 0; i < this.size; i++) {
      callback(this.grid[i]);
    }
  };
})();
