(function () {
    if (typeof window.Asteroids === "undefined" ) {
        window.Asteroids = {};
      }

    var Ship = Asteroids.Ship = function (shipArgs) { //constructor function
        Asteroids.MovingObject.call(this, shipArgs); //sets inerherited properties on ship object
        //this.orientation = //http://creativejs.com/2012/01/day-10-drawing-rotated-images-into-canvas/
        this.sprite = new Image();
        //this.firingPoint =
        this.sprite.onload = function () { //callback function after the resource is fetched
            this.draw
        }; //this is technically a listener?
        this.sprite.src = 'lib/flying-saucer-animated-6.gif'; //needs full path, its being invoked from index.html
        this.radius = Ship.RADIUS; //needed for collision detection
    }; //where do the attributes get set? In the new object itself.

    Ship.RADIUS = 15;
    // Ship.COLOR = "#FF0000"

    Asteroids.Util.inherits.call(Ship, Asteroids.MovingObject); //gives prototype methods

    Ship.prototype.draw = function () {
        //ctx.save
        //ctx.translate()
        ctx.drawImage(this.sprite,this.pos[0],this.pos[1]);
        //ctx.restore
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

    Ship.prototype.fireBullet = function () {
        var old_pos = this.pos.slice()
        var center_pos = [old_pos[0]+42,old_pos[1]+30] //[x,y]
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

    Ship.deccelerateComp = function (velComp) {
      if (velComp === 0) {
        return 0;
      }
      return  (-1 * (velComp/(Math.abs(velComp)))) + velComp;
    }

})();
