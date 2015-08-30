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

  GameView.prototype.bindReset = function () {
    
  };

  GameView.prototype.checkTransition = function () {
    if (this.game.transition) {
      return;
    }
  };

  GameView.prototype.start = function () {
    var gameView = this;
    gameView.bindKeyHandlers();
    gameView.bindReset();
  };

  GameView.prototype.bindKeyHandlers = function () {
    var gameView = this;
    key('up', function (e) {
      e.preventDefault();
      gameView.checkTransition();
      gameView.game.move("up");
    });
    key('left', function (e) {
      e.preventDefault();
      gameView.checkTransition();
      gameView.game.move("left");
    });
    key('down', function (e) {
      e.preventDefault();
      gameView.checkTransition();
      gameView.game.move("down");
    });
    key('right', function (e) {
      e.preventDefault();
      gameView.checkTransition();
      gameView.game.move("right");
    });
  };
})();
