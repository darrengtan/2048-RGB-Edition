(function () {
  window.Tiles = window.Tiles || {};

  var Tile = Tiles.Tile = function (options) {
    this.board = options.board;
    this.val = options.val || this.randomVal();
    this.pos = options.pos || this.randomPos();
    this.prevPos = options.prevPos || null;
    this.merged = options.merged || false;
    this.selector = "tile val-" + this.val + " pos-" + this.pos[0] + "-" + this.pos[1];
  };

  Tile.prototype.randomPos = function () {
    var posX;
    var posY;
    do {
      posX = Math.floor(Math.random() * this.board.size);
      posY = Math.floor(Math.random() * this.board.size);
    } while (!this.board.spotEmpty([posX, posY]));

    return [posX, posY];
  };

  Tile.prototype.randomVal = function () {
    var num = Math.random();
    return num < 0.05 ? 4 : 2;
  };

  Tile.prototype.equalVal = function (otherTile) {
    return this.val === otherTile.val;
  };

  Tile.prototype.remove = function () {
    this.board.removeTile(this);
  };

  Tile.prototype.savePos = function () {
    this.prevPos = this.pos;
  };

  Tile.prototype.updatePos = function (pos) {
    this.pos = pos;
    this.selector = "tile val-" + this.val + " pos-" + this.pos[0] + "-" + this.pos[1];
  };
})();
