(function () {
  window.Tiles = window.Tiles || {};

  var Tile = Tiles.Tile = function (options) {
    this.board = options.board;
    this.val = options.val || this.randomVal();
    this.pos = options.pos || this.randomPos();
    this.prevPos = options.prevPos || null;
    this.merged = options.prevPos || false;
    this.color = this.getColor();
  };

  Tile.COLOR = {
    2: "#FF0000",
    4: "#FF8000",
    8: "#FFFF00",
    16: "#00FF00",
    32: "#0000FF",
    64: "#FF00FF"
  };

  Tile.prototype.getColor = function () {
    return Tile.COLOR[this.val];
  };

  Tile.prototype.randomPos = function () {
    var posX = Math.floor(Math.random() * this.board.size);
    var posY = Math.floor(Math.random() * this.board.size);
    while (this.board.spotTaken([posX, posY])) {
      posX = Math.floor(Math.random() * this.size);
      posY = Math.floor(Math.random() * this.size);
    }

    return [posX, posY];
  };

  Tile.prototype.randomVal = function () {
    var num = Math.random();
    return num < 0.05 ? 4 : 2;
  };

  Tile.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], 100, 100);
    ctx.fill();
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
  };
})();
