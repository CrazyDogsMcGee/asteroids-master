(function () {
  if (typeof window.Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.addAsteroids();
    this.bullets = [];
    
    this.bkg = new Image(); //background Image()? Is this javascript or HTML5?
    this.bkg.onload = function () { //callback function after the resource is fetched
      ctx.drawImage(this.bkg,0,0); //Does this onload need to be called every time? or just once
    }.bind(this);
    this.bkg.src = 'lib/stopchaos_dimension.jpg';
    
    this.ship = new Asteroids.Ship( {
        vel: [0, 0],
        pos: Game.randomPosition(), //should be center
        game: this
    });
    
    this.score = 0
    this.lives = 5
    
 var calaloo = this.asteroidAdder = setInterval( function () {
      if (this.asteroids.length <= (Game.NUM_ASTEROIDS/2)) {
        this.addAsteroids();
        Game.NUM_ASTEROIDS += 1
      }
    }.bind(this), 1000);

  };

  Game.DIM_X = 1200; //variables are restricted to scope on 'Game' var
  Game.DIM_Y = 800;
  Game.NUM_ASTEROIDS = 1;

  Game.prototype.addAsteroids = function () { //this doesn't regenerate asteroids should be "addInitialAsteroids"
      var _game = this
      
      for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroid( { pos: Game.randomPosition(), game: _game } )); //only provides game and position
      }
  };

  Game.prototype.draw = function (ctx) {
      var objects = this.allObjects();
      ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    
      ctx.drawImage(this.bkg,0,0);
      for (var i = 0; i < objects.length; i++) {
        objects[i].draw(ctx);
      }
      this.renderStats();
  };

  Game.prototype.moveObjects = function () {
    var objects = this.allObjects();
    for (var i = 0; i < objects.length; i++) {
      objects[i].move();
    }
  };

  Game.randomPosition = function () { //Fix this a little bit to avoid the ship
      var x = Math.floor(Math.random() * Game.DIM_X);
      var y = Math.floor(Math.random() * Game.DIM_Y);

      return [x, y];
  };

  Game.prototype.wrap = function (pos) { //need to fix this a bit to look at the sprite center rather than the upper-left position
    var x = (pos[0] > Game.DIM_X) ? (pos[0] - Game.DIM_X) : pos[0];
    var y = (pos[1] > Game.DIM_Y) ? (pos[1] - Game.DIM_Y) : pos[1];
    x = (x < 0) ? (x + Game.DIM_X) : x; 
    y = (y < 0) ? (y + Game.DIM_Y) : y;
    return [x,y]
  };

  Game.prototype.wrap2 = function (pos, img_center) { //need to fix this a bit to look at the sprite center rather than the upper-left position
        //take the largest component of img_center, double it, use that
    var max_dim = Math.max.apply(null, img_center);
    max_dim *= 2
    
    var x = (pos[0] > Game.DIM_X) ? (pos[0] - Game.DIM_X - max_dim) : pos[0]; //these are okay
    var y = (pos[1] > Game.DIM_Y) ? (pos[1] - Game.DIM_Y - max_dim) : pos[1];
    
    x = (x+max_dim < 0) ? (x + Game.DIM_X + max_dim) : x; //needs to be adjusted with "antipos"
    y = (y+max_dim < 0) ? (y + Game.DIM_Y + max_dim) : y;
    return [x,y]
  };
  
  Game.prototype.checkCollisions = function () { //performs 
    var objects = this.allObjects();
    for (var i = 0; i < objects.length; i++) {
      for (var j = 0; j < objects.length; j++) {
        if ( (i != j) && (objects[i].isCollidedWith(objects[j])) ) {
          objects[i].collideWith(objects[j]);
        }
      }
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (object) { //remove object from game
    var obj_array;
    if (object.constructor === Asteroids.Asteroid) {
      obj_array = this.asteroids;
    }else{
      obj_array = this.bullets;
    }
    var index = obj_array.indexOf(object);
    obj_array.splice(index, 1);
  };

  Game.prototype.allObjects = function () {
      return ( this.asteroids.concat(this.bullets).concat([this.ship]) );
  };

  Game.prototype.isOutOfBounds = function (pos) {
      return (  pos[0] < 0 ||
                pos[0] > Game.DIM_X ||
                pos[1] < 0 ||
                pos[1] > Game.DIM_Y );
  };
  
  Game.prototype.renderStats = function () {
    ctx.font="20px Georgia";
    ctx.fillStyle="#FFF";
    ctx.fillText("Score: "+this.score,0,15);
    ctx.fillText("Lives: "+this.lives,0,50);
  };
  
  Game.prototype.reset = function () {
    //call on game over, this makes all traits reset to factory zero.
    this.score = 0
    this.lives = 5
    Game.NUM_ASTEROIDS = 0;
    
    this.bullets = [];
    this.asteroids = [];
    
    this.ship.vel = [0,0]
    this.ship.pos = Game.randomPosition() //should be center
  }

//   http://blog.sklambert.com/html5-canvas-game-html5-audio-and-finishing-touches/
  
})();
