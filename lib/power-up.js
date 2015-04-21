(function () {
  if (typeOf window.Asteroids === "undefined" ){
    window.Asteroids = {}
  }
  
  Power_Up = Asteroids.Power_Up = function () {
    Asteroids.MovingObject.call(this, asterArgs);  
  }
  
  Asteroids.Util.inherits.call(Asteroid, Asteroids.MovingObject);
  
})();