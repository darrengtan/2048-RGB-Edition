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
    gameView.game.draw(gameView.ctx);
    gameView.bindKeyHandlers();
  };

  GameView.prototype.bindKeyHandlers = function () {
    var gameView = this;
    key('up', function () {
      gameView.game.move("up");
      gameView.game.draw(gameView.ctx);
    });
    key('left', function () {
      gameView.game.move("left");
      gameView.game.draw(gameView.ctx);
    });
    key('down', function () {
      gameView.game.move("down");
      gameView.game.draw(gameView.ctx);
    });
    key('right', function () {
      gameView.game.move("right");
      gameView.game.draw(gameView.ctx);
    });
  };
})();
