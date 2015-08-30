(function () {
  window.Tiles = window.Tiles || {};

  var GameView = Tiles.GameView = function (game) {
    this.game = game;
  };

  GameView.prototype.bindReset = function () {
    $('.reset-button').click(function () {
      $('.tile').remove();
      $('.score').html("Score: 0");
      this.game = new Tiles.Game();

    }.bind(this));
  };

  GameView.prototype.checkTransition = function () {
    if (this.game.transition) { return; }
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
