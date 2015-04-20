(function () {
    if ( typeof window.Asteroids === "undefined" ) {
      window.Asteroids = {};
    }

    var GameView = Asteroids.GameView = function (game, ctx) {
        this.game = game;
        this.ctx = ctx;
        this.threads = []
    };

    GameView.prototype.start = function () {
        var game_view = this
        var ship = this.game.ship
        
//         this.bindKeyHandlers();
        
        var mofongo = setInterval( function () {
            game.step();
            game.draw(ctx);
            game_view.detectMultiKeyHandlers(ship);
        }, 20);
        
        var fufu = setInterval( function () {
            this.game.ship.deccelerate();
        }, 100);
      

        this.threads = [mofongo,fufu]
    };
  
    GameView.prototype.stop = function () {
      this.threads.forEach(function (threadID) {
        clearInterval(threadID);
      })
      
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
      if(key.isPressed("up")) {ship.power([1,1])};
      if(key.isPressed("down")) {ship.power([-1,-1])};
      if(key.isPressed("space")) {ship.fireBullet()};
      if(key.isPressed("s")) {ship.reset()};
      if(key.isPressed("q")) {ship.game.reset()};
      return false
    }


})();
