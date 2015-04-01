(function () {
    if (typeof window.Asteroids === "undefined" ) {
        window.Asteroids = {};
      }

    var Ship = Asteroids.Ship = function (shipArgs) { //constructor function
        Asteroids.MovingObject.call(this, shipArgs); //sets inerherited properties on ship object
        this.imgComp = [100,50];
        this.orientation = 0;//http://creativejs.com/2012/01/day-10-drawing-rotated-images-into-canvas/
        this.sprite = new Image();
        this.sprite.onload = function () { //callback function after the resource is fetched
            this.draw
        }; //this is technically a listener?
        this.sprite.src = 'lib/ShumaGorath.png'; //needs full path, its being invoked from index.html
        this.radius = Ship.RADIUS; //needed for collision detection
    };

    Ship.RADIUS = 20;
    // Ship.COLOR = "#FF0000"
    Ship.TO_RADIANS = Math.PI / 180;

    Asteroids.Util.inherits.call(Ship, Asteroids.MovingObject); //gives prototype methods

    Ship.prototype.draw = function () {
        ctx.save
        ctx.translate(this.pos[0],this.pos[1]); //moves to actual position on canvas
        ctx.translate(this.imgComp[0],this.imgComp[1]) //moves the image 
      
        ctx.rotate(this.orientation * this.TO_RADIANS)
      
        ctx.drawImage(this.sprite,this.pos[0],this.pos[1]);
        ctx.restore
    }

    Ship.prototype.relocate = function () {
        this.pos = Asteroids.Game.randomPosition();
        this.vel = [0,0];
    };

    Ship.prototype.power = function (impulse, orientation) {
        if (Math.abs(this.vel[0]) < 10) {
          this.vel[0] += impulse[0];
        }
        if (Math.abs(this.vel[1]) < 10) {
          this.vel[1] += impulse[1];
        }
        this.orientation = orientation;
    };

    Ship.prototype.fireBullet = function () {
        var old_pos = this.pos.slice()
        var center_pos = [old_pos[0]+42,old_pos[1]+30] //firing compensation occurs here
        this.game.bullets.push(new Asteroids.Bullet( {
            vel: [(this.vel[0]),(this.vel[1])],
            pos: center_pos,
            game: this.game,
            radius: 8
        }));
    };

    Ship.prototype.deccelerate = function () {
      for (var i = 0; i < this.vel.length; i++) {
        this.vel[i] = Ship.deccelerateComp(this.vel[i]);
      }

    };

    Ship.prototype.deccelerateComp = function (velComp) {
      if (velComp === 0) {
        return 0;
      }
      return  (-1 * (velComp/(Math.abs(velComp)))) + velComp;
    };
  
    Ship.prototype.rotate = function (degrees) {
      this.orientation += direction
      
      if (this.orientation >= 360) {
        this.orientation -= 360
      }
      // To rotate this - there should be an angle that increases or decreases depending on the keypress
      // then apply sin/cosine to this to angle to get x and y
      // 
      // 
      //
      //sin is O/H (y-coord)
      //cos is A/H (x-coord)
    }

})();
