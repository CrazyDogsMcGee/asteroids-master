(function () {
  if ( typeof window.Asteroids === "undefined") {
      window.Asteroids = {};
  }
  
  Small_Asteroid = Asteroids.Small_Asteroid = function (asterArgs) { //initiates in local scope and Asteroids window object, respectively.
    Asteroids.Asteroid.call(this, asterArgs) //whatever constructs it must pass in the game and position like this - new Small_Asteroid( { pos: Game.randomPosition(), game: _game } )
    this.vel = Asteroids.Util.randomVec(3);
    this.radius = 20
    this.sprite.src = ""
  }

  Asteroids.Util.inherits.call(Small_Asteroid, Asteroids.Asteroid); //bestows prototype methods to Small_Asteroid from Asteroid
  
  
})();