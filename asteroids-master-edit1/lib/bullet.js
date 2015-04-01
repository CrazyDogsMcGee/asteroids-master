(function () {
    if (typeof window.Asteroids === "undefined" ) {
      window.Asteroids = {};
    }

    var Bullet = Asteroids.Bullet = function ( bulletArgs ) {
        this.imgComp = [8,8]
        this.sprite = new Image();
        this.sprite.onload = function () { //callback function after the resource is fetched
            this.draw
        }; //this is technically a listener?
        this.sprite.src = 'lib/bullet.png';
        Asteroids.MovingObject.call(this, bulletArgs);
        if ((this.vel[0] === 0) && (this.vel[1] === 0)) {
          this.vel = [0,-2]; //insert orientation of ship here.
        } 
    }

    Asteroids.Util.inherits.call(Bullet, Asteroids.MovingObject); //inherits from Moving Object, is still a sphere


    Bullet.prototype.collideWith = function (otherObject) {
        if (otherObject.constructor === Asteroids.Asteroid) {
            this.game.remove(otherObject);
            this.game.remove(this);
        }
    }

    Bullet.prototype.draw = function () {
      ctx.drawImage(this.sprite,this.pos[0],this.pos[1]);
    }

    Bullet.prototype.firingVelocity = function (velocity) {
    }


    Bullet.prototype.isWrappable = false;

})();
