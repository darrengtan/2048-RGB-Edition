(function () {
  window.Tiles = window.Tiles || {};

  var Tile = Tiles.Tile = function (options) {
    this.board = options.board;
    this.val = options.val || this.randomVal();
    this.pos = options.pos || this.randomPos();
    this.prevPos = options.prevPos || null;
    this.merged = options.merged || false;
    this.color = this.getColor();
    this.fontSize = this.getFontSize();
    this.selector = "tile val-" + this.val + " pos-" + this.pos[0] + "-" + this.pos[1];
  };

  Tile.COLOR = {
    2: "rgb(255, 0, 0)",
    4: "rgb(255, 128, 0)",
    8: "rgb(255, 255, 0)",
    16: "rgb(128, 255, 0)",
    32: "rgb(0, 255, 0)",
    64: "rgb(0, 255, 128)",
    128: "rgb(0, 255, 255)",
    256: "rgb(0, 128, 255)",
    512: "rgb(0, 0, 255)",
    1024: "rgb(128, 0, 255)",
    2048: "rgb(255, 0, 255)"
  };

  Tile.FONT_SIZE = {
    2: "60",
    4: "60",
    8: "60",
    16: "60",
    32: "60",
    64: "60",
    128: "60",
    256: "60",
    512: "60",
    1024: "40",
    2048: "40"
  };

  Tile.prototype.getColor = function () {
    return Tile.COLOR[this.val];
  };

  Tile.prototype.getFontSize = function () {
    return Tile.FONT_SIZE[this.val];
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

  Tile.prototype.draw = function (ctx, topLeftX, topLeftY) {
    ctx.font = this.fontSize + "px Helvetica";
    ctx.fillStyle = this.color;
    ctx.fillRect(topLeftX, topLeftY, 100, 100);
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.val, topLeftX + 50, topLeftY + 50);
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
