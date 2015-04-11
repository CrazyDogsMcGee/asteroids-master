(function () {
    if (typeof window.Asteroids === "undefined" ) {
      window.Asteroids = {};
    }

    var Bullet = Asteroids.Bullet = function ( bulletArgs ) {
        Asteroids.MovingObject.call(this, bulletArgs);
        this.sprite = new Image();
        this.sprite.onload = function () {
           
        };
        this.sprite.src = 'lib/'
        this.center = function () {
          return this.pos
        }
    }

    Asteroids.Util.inherits.call(Bullet, Asteroids.MovingObject); //inherits from Moving Object, is still a sphere
  
//     Bullet.prototype.draw = function () {
      
//     };

    Bullet.prototype.collideWith = function (otherObject) {
        
        if (otherObject.constructor === Asteroids.Asteroid) {
            this.game.remove(otherObject);
            this.game.remove(this);
        }
    };


    Bullet.prototype.isWrappable = false;

})();
