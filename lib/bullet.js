(function () {
    if (typeof window.Asteroids === "undefined" ) {
      window.Asteroids = {};
    }

    var Bullet = Asteroids.Bullet = function ( bulletArgs ) {
        Asteroids.MovingObject.call(this, bulletArgs);     
        this.sprite = new Image();
        this.sprite.onload = function () {
            this.draw();
        };
        this.sprite.src = 'lib/bullets.png';
      
        this.img_center = [12,12]
        this.center = function () {
          return [this.pos[0]+12, this.pos[1]+12]
        }
    };

    Asteroids.Util.inherits.call(Bullet, Asteroids.MovingObject); //inherits from Moving Object, is still a sphere
  
    Bullet.prototype.draw = function () {
      ctx.save();
      ctx.translate(this.pos[0],this.pos[1]);
      ctx.drawImage(this.sprite, -this.img_center[0], -this.img_center[1]);
      ctx.restore();
    };

    Bullet.prototype.collideWith = function (otherObject) {
        if (otherObject.constructor === Asteroids.Asteroid) {
            this.game.score += 100
            this.game.remove(otherObject);
            this.game.remove(this);
        }
    };


    Bullet.prototype.isWrappable = false;

})();
