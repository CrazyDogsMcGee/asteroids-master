(function () {
    if (typeof window.Asteroids === "undefined" ) {
        window.Asteroids = {};
      }

    var Ship = Asteroids.Ship = function (shipArgs) { //constructor function
        Asteroids.MovingObject.call(this, shipArgs); //sets inerherited properties on ship object
        this.orientation = 0//http://creativejs.com/2012/01/day-10-drawing-rotated-images-into-canvas/
        this.sprite = new Image();
        this.sprite.onload = function () { //callback function after the resource is fetched
            this.draw
        }; //this is technically a listener?
        this.sprite.src = 'lib/ShumaGorath.png'; //needs full path, its being invoked from index.html
        this.radius = Ship.RADIUS; //needed for collision detection
        this.bullet_compensation = [125,55];
        this.img_center = [100,50]
    }; //where do the attributes get set? In the new object itself.

    Ship.RADIUS = 15;
    Ship.TO_RADIANS = Math.PI / 180;

    Asteroids.Util.inherits.call(Ship, Asteroids.MovingObject); //gives prototype methods

    Ship.prototype.draw = function () {
        ctx.save();
      
        ctx.translate(this.pos[0],this.pos[1]); //move the sprite to where you want, the entire context must be moved for the rotation to occur
        ctx.translate(this.img_center[0],this.img_center[1]); //center the rotation
      
        ctx.rotate(this.orientation * Ship.TO_RADIANS);

        ctx.drawImage(this.sprite, -this.img_center[0], -this.img_center[1]);
        ctx.restore();
    }

    Ship.prototype.relocate = function () {
        this.pos = Asteroids.Game.randomPosition();
        this.vel = [0,0];
    };

    Ship.prototype.power = function (impulse) {
        if (Math.abs(this.vel[0]) < 10) {
          this.vel[0] += impulse[0];
        }
        if (Math.abs(this.vel[1]) < 10) {
          this.vel[1] += impulse[1];
        }
    };
  
    Ship.prototype.rotate = function (n) {
      if (this.orientation + n > 360) {
        this.orientation -= 360
        this.orientation += n
      } else if  (this.orientation + n < 0){
        this.orientation += 360
        this.orientation += n
      } else {
        this.orientation += n
      }
    }

    Ship.prototype.fireBullet = function () {
        var ship_position = this.pos.slice() //
        var center_pos = [old_pos[0]+this.bullet_compensation[0],old_pos[1]+this.bullet_compensation[1]] //[x,y] - should refactor to property
        this.game.bullets.push(new Asteroids.Bullet( {
            vel: [this.vel[0]*2,this.vel[1]*2],
            pos: center_pos, //this will need some tweaking. It needs to fire from Shuma's Eye, currently it'd fire from the upper left of his sprite
            //also, it may need to account for Shuma's orientation.
            color: "#FF69B4",
            game: this.game,
            radius: 3
        }));
    };

    Ship.prototype.deccelerate = function () {
      for (var i = 0; i < this.vel.length; i++) {
        this.vel[i] = Ship.deccelerateComp(this.vel[i]);
      }

    };

    Ship.deccelerateComp = function (velComp) { //class method utility - does not need access to "this"
      if (velComp === 0) {
        return 0;
      }
      return  (-1 * (velComp/(Math.abs(velComp)))) + velComp;
    };

})();
