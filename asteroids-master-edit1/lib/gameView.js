(function () {
    if ( typeof window.Asteroids === "undefined" ) {
      window.Asteroids = {};
    }

    var GameView = Asteroids.GameView = function (game, ctx) {
        this.game = game;
        this.ctx = ctx;
    };

    GameView.prototype.start = function () {
        //this.bindKeyHandlers();
      
        var game_view = this
        var ship = this.game.ship
        
        setInterval( function () {
            game.step();
            game.draw(ctx);
            game_view.detectMultiKeyHandlers(ship);
        }, 20);
        setInterval( function () {
            this.game.ship.deccelerate();
        }, 500);
    };

    GameView.prototype.bindKeyHandlers = function () {
      debugger
      var ship = this.game.ship
      key('up', function () {ship.power([1,1])} ); //probably have to modify power to also change the orientation
      key('down', function () {ship.power([-1,-1])} );
      
      key('up+left', function () { //need something like this...
        ship.power([1,1]);
        ship.rotate(-5);
      });
      
      key('space', function () {ship.fireBullet()} );
      key('left', function () {ship.rotate(-5)} );
      key('right', function () {ship.rotate(5)} );
      key('s', function () {ship.reset()} );
    };
  
    GameView.prototype.detectMultiKeyHandlers = function (ship) {
      if(key.isPressed("left")) {ship.rotate(-5)};
      if(key.isPressed("right")) {ship.rotate(5)};
      if(key.isPressed("up")) {ship.power([1,1])};
      if(key.isPressed("down")) {ship.power([-1,-1])};
      if(key.isPressed("space")) {ship.fireBullet()};
      if(key.isPressed("s")) {ship.reset()};
    }


})();
