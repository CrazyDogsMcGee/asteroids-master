(function () {
    if (typeof window.Asteroids === "undefined" ) {
      window.Asteroids = {};
    }

    var Bullet = Asteroids.Bullet = function ( bulletArgs ) {
        Asteroids.MovingObject.call(this, bulletArgs);
        this.orientation = bulletArgs["orientation"];
      
        this.img_center = [7,7]
        this.center = function () {
          return [this.pos[0]+7, this.pos[1]+7]
        }
    }

    Asteroids.Util.inherits.call(Bullet, Asteroids.MovingObject); //inherits from Moving Object, is still a sphere
  

    Bullet.prototype.collideWith = function (otherObject) {
        if (otherObject.constructor === Asteroids.Asteroid) {
            this.game.score += 100
            this.game.remove(otherObject);
            this.game.remove(this);
        }
    };


    Bullet.prototype.isWrappable = false;

})();
