(function () {
  window.Tiles = window.Tiles || {};

  var Tile = Tiles.Tile = function (options) {
    this.board = options.board;
    this.val = options.val || this.randomVal();
    this.pos = options.pos || this.RandomPos();
    this.color = this.getColor();
    this.prevPos = null;
    this.mergedFrom = null;
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

  Tile.prototype.RandomPos = function () {
    var posX = Math.floor(Math.random() * this.size);
    var posY = Math.floor(Math.random() * this.size);
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
    if (this.val === otherTile.val) {
      this.val = otherTile.val * 2;
    }

    otherTile.remove();
  };

  Tile.prototype.remove = function () {
    this.game.remove(this);
  };

  Tile.prototype.savePos = function () {
    this.prevPos = this.pos;
  };

  Tile.prototype.updatePos = function (pos) {
    this.pos = pos;
  };
})();
