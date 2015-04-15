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
        this.sprite.src = 'lib/'
        this.center = function () {
          return this.pos
        }
    }

    Asteroids.Util.inherits.call(Bullet, Asteroids.MovingObject); //inherits from Moving Object, is still a sphere
  
//     Bullet.prototype.draw = function () {
//         ctx.save();
      
//         ctx.translate(this.pos[0],this.pos[1]); //move the sprite to where you want, the entire context must be moved for the rotation to occur
//         ctx.translate(this.img_center[0],this.img_center[1]); //center the rotation
      
//         ctx.rotate(this.orientation*Ship.TO_RADIANS);

//         ctx.drawImage(this.sprite, -this.img_center[0], -this.img_center[1]);
//         ctx.restore();
//     }

    Bullet.TO_RADIANS = Math.PI / 180;
    
    Bullet.prototype.collideWith = function (otherObject) {
        if (otherObject.constructor === Asteroids.Asteroid) {
            this.game.score += 100
            this.game.remove(otherObject);
            this.game.remove(this);
        }
    };


    Bullet.prototype.isWrappable = false;

})();
