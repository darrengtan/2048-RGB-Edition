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
    16: "#80FF00",
    32: "#00FF00",
    64: "#00FF80",
    128: "#00FFFF",
    256: "#0080FF",
    512: "#0000FF",
    1024: "#7F00FF",
    2048: "#FF00FF"
  };

  Tile.prototype.getColor = function () {
    return Tile.COLOR[this.val];
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
