(function () {
    if (typeof window.Asteroids === "undefined" ) {
        window.Asteroids = {};
      }

    var Ship = Asteroids.Ship = function (shipArgs) {
        Asteroids.MovingObject.call(this, shipArgs); 
        this.orientation = 0
        this.sprite = new Image();
        this.sprite.onload = function () {
            this.draw();
        };
        this.sprite.src = 'lib/ShumaGorath.png'; 
        this.radius = 25; 
        this.bullet_compensation_radius = [28,28];
        this.img_center = [104,54]
        this.center = function () {
          return [this.pos[0]+104,this.pos[1]+54]
        }
        this._can_fire = true
        this._firing_rate = 500;
    };

    //Ship.RADIUS = 25;
    Ship.TO_RADIANS = Math.PI / 180;

    Asteroids.Util.inherits.call(Ship, Asteroids.MovingObject); //gives prototype methods

    Ship.prototype.orientationRadians = function () {
      return this.orientation * Ship.TO_RADIANS
    },
      
    Ship.prototype.reset = function () {
      this.orientation = 0;
      this.vel = [0,0];
    }
  
    Ship.prototype.draw = function () {
        ctx.save();
      
        ctx.translate(this.pos[0],this.pos[1]); //move the sprite to where you want, the entire context must be moved for the rotation to occur
        ctx.translate(this.img_center[0],this.img_center[1]); //center the rotation
      
        ctx.rotate(this.orientation*Ship.TO_RADIANS);

        ctx.drawImage(this.sprite, -this.img_center[0], -this.img_center[1]);
        ctx.restore();
    }

    Ship.prototype.relocate = function () {
        this.pos = Asteroids.Game.randomPosition();
        this.vel = [0,0];
    };

    Ship.prototype.power = function (impulse) { //use radians instead
        var orientation_radians = Ship.TO_RADIANS * this.orientation
      
        if (Math.abs(this.vel[0]) < 10) {
          this.vel[0] += Math.cos(orientation_radians)*impulse[0]; //cos is x (0/h)
        }
        if (Math.abs(this.vel[1]) < 10) {
          this.vel[1] += Math.sin(orientation_radians)*impulse[1]; //sin is y (a/h)
        }
    };
  
    Ship.prototype.rotate = function (n) {
      if (this.orientation + n > 361) {
        this.orientation -= 360
        this.orientation += n
      } else if  (this.orientation + n < -1){
        this.orientation += 360
        this.orientation += n
      } else {
        this.orientation += n
      }
    }

    Ship.prototype.fireBullet = function () {
        if (this._can_fire) {
          var ship_position = this.pos.slice()
          var ship_midpoint = [ship_position[0]+this.img_center[0],ship_position[1]+this.img_center[1]];

          var adjusted_bullet_compensation = [this.bullet_compensation_radius[0]*Math.cos(this.orientationRadians()),this.bullet_compensation_radius[1]*Math.sin(this.orientationRadians())];
          var firing_pos = [ship_midpoint[0]+adjusted_bullet_compensation[0],ship_midpoint[1]+adjusted_bullet_compensation[1]];

          this.game.bullets.push(new Asteroids.Bullet( {
              vel: [15*Math.cos(this.orientationRadians()),15*Math.sin(this.orientationRadians())],
              pos: firing_pos,
              color: "#FF69B4",
              game: this.game,
              radius: 3
          }));

          this._can_fire = false;

          setTimeout( function () {
          this._can_fire = true;
          }.bind(this), this._firing_rate)
        }
    };

    Ship.prototype.deccelerate = function () {
      for (var i = 0; i < this.vel.length; i++) {
        this.vel[i] = Ship.deccelerateComp(this.vel[i]);
      }
    };

    Ship.deccelerateComp = function (velComp) { //needs to be fixed, one is too big because velocities can be fractional now
      if ((velComp === 0) || (Math.abs(velComp) < 1)) {
        return 0;
      }
      
      return  (-1 * (velComp/(Math.abs(velComp)))) + velComp;
    };

})();
