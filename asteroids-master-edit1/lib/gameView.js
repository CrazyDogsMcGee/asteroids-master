(function () {
    if ( typeof window.Asteroids === "undefined" ) {
      window.Asteroids = {};
    }

    var GameView = Asteroids.GameView = function (game, ctx) {
        this.game = game;
        this.ctx = ctx;
    };

    GameView.prototype.start = function () {
        this.bindKeyHandlers();
        setInterval( function () {
            this.game.step();
            this.game.draw(this.ctx);
        }, 20);
        setInterval( function () {
            this.game.ship.deccelerate();
        }, 500);
    };

    GameView.prototype.bindKeyHandlers = function () {
      var ship = this.game.ship
      key('up', function () {ship.power([1,1])} ); //probably have to modify power to also change the orientation
//       key('down', function () {ship.power([0,2])} );
//       key('left', function () {ship.power([-2,0])} );
//       key('right', function () {ship.power([2,0])} );
      key('space', function () {ship.fireBullet()} );
      key('a', function () {ship.rotate(-5)} );
      key('d', function () {ship.rotate(5)} );
      key('s', function () {ship.reset()} );
    };


})();
