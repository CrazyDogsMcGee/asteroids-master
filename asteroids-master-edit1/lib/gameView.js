(function () {
    if ( typeof window.Asteroids === "undefined" ) {
      window.Asteroids = {};
    }

    var GameView = Asteroids.GameView = function (game, ctx) {
        this.game = game;
        this.ctx = ctx;
    };

    GameView.prototype.start = function () {
        var game_view = this
        var ship = this.game.ship
        
        this.bindKeyHandlers();
        
        setInterval( function () {
            game.step();
            game.draw(ctx);
            game_view.detectMultiKeyHandlers(ship);
        }, 20);
        setInterval( function () {
            this.game.ship.deccelerate();
        }, 100);
    };

    GameView.prototype.bindKeyHandlers = function () {
      key('up', function () {return false} ); 
      key('down', function () {return false} );      
      key('space', function () {return false} );
      key('left', function () {return false} );
      key('right', function () {return false} );
      key('s', function () {return false} );
    };
  
    GameView.prototype.detectMultiKeyHandlers = function (ship) {
      if(key.isPressed("left")) {ship.rotate(-5)};
      if(key.isPressed("right")) {ship.rotate(5)};
      if(key.isPressed("up")) {ship.power([1,1]); return false};
      if(key.isPressed("down")) {ship.power([-1,-1]); return false};
      if(key.isPressed("space")) {ship.fireBullet()};
      if(key.isPressed("s")) {ship.reset()};
    }


})();
