(function () {
  window.Tiles = window.Tiles || {};

  var GameView = Tiles.GameView = function (game) {
    this.game = game;
  };

  GameView.MOVES = {
    "up": [0, -1],
    "down": [0, 1],
    "left": [-1, 0],
    "right": [1, 0]
  };

  GameView.prototype.start = function () {
    var gameView = this;
    gameView.bindKeyHandlers();
  };

  GameView.prototype.bindKeyHandlers = function () {
    var gameView = this;
    key('up', function () {
      gameView.game.move("up");
    });
    key('left', function () {
      gameView.game.move("left");
    });
    key('down', function () {
      gameView.game.move("down");
    });
    key('right', function () {
      gameView.game.move("right");
    });
  };
})();
