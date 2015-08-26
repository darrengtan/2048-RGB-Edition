(function () {
  window.Tiles = window.Tiles || {};

  var GameView = Tiles.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.MOVES = {
    "up": [0, -1],
    "down": [0, 1],
    "left": [-1, 0],
    "right": [1, 0]
  };

  GameView.prototype.start = function () {
    var gameView = this;
    gameView.game.draw(this.ctx);
  };
})();
