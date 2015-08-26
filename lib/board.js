(function () {
  window.Tiles = window.Tiles || {};

  var Board = Tiles.Board = function () {
    this.size = 4;
    this.grid = this.emptyGrid();
  };

  Board.FILL_COLOR = "#bbada0";

  Board.prototype.draw = function (ctx) {
    for (var r = 0; r < this.size; r++) {
      for (var c = 0; c < this.size; c++) {
        var topLeftX = r * 150;
        var topLeftY = c * 150;
        ctx.beginPath();
        ctx.font = "80px Helvetica";
        if (this.grid[r][c]) {
          ctx.fillStyle = this.grid[r][c].color;
          ctx.fillRect(topLeftX, topLeftY, 150, 150);
          ctx.fillStyle = "black";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(this.grid[r][c].val, topLeftX + 75, topLeftY + 75);
        } else {
          ctx.fillStyle = Board.FILL_COLOR;
          ctx.fillRect(topLeftX, topLeftY, 150, 150);
        }
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

    for (var r = 0; r < this.grid.length; r++) {
      for (var c = 0; c < this.grid.length; c++) {
        if (this.grid[r][c] === null) {
          available.push([r, c]);
        }
      }
    }

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

  Board.prototype.spotTaken = function (pos) {
    var posX = pos[0];
    var posY = pos[1];
    return this.grid[posX][posY] !== null;
  };

  Board.prototype.spotContent = function (pos) {
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
      pos[1] >= 1 && pos[1] < this.size;
  };


})();
