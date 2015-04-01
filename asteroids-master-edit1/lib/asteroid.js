(function () {
  if ( typeof window.Asteroids === "undefined") {
      window.Asteroids = {};
  }

  Asteroid = Asteroids.Asteroid = function (asterArgs) { // takes in pos, game)
      Asteroids.MovingObject.call(this, asterArgs); // calls parent constructor with pos, game
      this.vel = Asteroids.Util.randomVec(10);
      this.color = asterArgs["color"] || Asteroid.COLOR;
      this.radius = asterArgs["radius"] || Asteroid.RADIUS;
  };

  Asteroid.COLOR = "#00FF00";
  Asteroid.RADIUS = 50;

  Asteroids.Util.inherits.call(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) { //just set position the same as bullet exit for ship collision
      if (otherObject.constructor === Asteroids.Ship) {
        otherObject.relocate();
      } //should include another elseif for bouncing.
  };


})();
