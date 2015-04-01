(function () {
  if ( typeof window.Asteroids === "undefined") {
      window.Asteroids = {};
  }

  Asteroid = Asteroids.Asteroid = function (asterArgs) { // takes in pos, game)
      this.imgComp = [65,65];
      Asteroids.MovingObject.call(this, asterArgs); // calls parent constructor with pos, game
      this.vel = Asteroids.Util.randomVec(10); // values from 0-1 times vector (so 0 - 10 pix/drawspeed in this instance)
      this.color = asterArgs["color"] || Asteroid.COLOR;
      this.radius = asterArgs["radius"] || Asteroid.RADIUS;
      this.sprite = new Image();
        this.sprite.onload = function () { //callback function after the resource is fetched
            this.draw();
        } //this is technically a listener?
      this.sprite.src = 'lib/singleBoulder.png';
  };

  Asteroid.COLOR = "#00FF00";
  Asteroid.RADIUS = 60;

  Asteroids.Util.inherits.call(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.draw = function () {
      ctx.drawImage(this.sprite,this.pos[0],this.pos[1]);
  }

  Asteroid.prototype.collideWith = function (otherObject) { //just set position the same as bullet exit for ship collision
      if (otherObject.constructor === Asteroids.Ship) {
        otherObject.relocate();
      } //should include another elseif for bouncing.
  };


})();
