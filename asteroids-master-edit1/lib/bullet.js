(function () {
    if (typeof window.Asteroids === "undefined" ) {
      window.Asteroids = {};
    }

    var Bullet = Asteroids.Bullet = function ( bulletArgs ) {
        Asteroids.MovingObject.call(this, bulletArgs);
        if ((this.vel[0] === 0) && (this.vel[1] === 0)) {
          this.vel = [0,-2];
        }
    }

    Asteroids.Util.inherits.call(Bullet, Asteroids.MovingObject); //inherits from Moving Object, is still a sphere


    Bullet.prototype.collideWith = function (otherObject) {
        if (otherObject.constructor === Asteroids.Asteroid) {
            this.game.remove(otherObject);
            this.game.remove(this);
        }
    };


    Bullet.prototype.isWrappable = false;

})();
