(function () {
    if (typeof window.Asteroids === "undefined") {
        window.Asteroids = {};
    }

    var MovingObject = Asteroids.MovingObject = function (argObj) { //constructor function called from ship and asteroid
        this.pos = argObj['pos'];
        this.game = argObj['game'];
        this.vel = argObj['vel'];
        this.radius = argObj['radius'];
        this.color = argObj['color'];
      
        //attrs I might consider adding
        this.img_center = []
        this.sprite = new Image();
        this.sprite.src = "";
        this.antipos = function () {};
        this.center = function () {};
    };

    MovingObject.prototype.draw = function (ctx) { //function actually draws the shapes
        ctx.fillStyle = this.color; //this chooses the style
        ctx.beginPath(); //initialize drawing? Seriously, this seems superfluous

        ctx.arc(
          this.pos[0], 
          this.pos[1],
          this.radius,
          0,
          2 * Math.PI, //already knows it closed?
          false
        );

        ctx.fill();
    };
  
    MovingObject.prototype.draw2 = function () {};

    MovingObject.prototype.move = function () {
        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];
        if (this.isWrappable === true) {
            debugger
            this.pos = this.game.wrap2(this.pos, this.img_center);
        } else {
            if (this.game.isOutOfBounds(this.pos)) {
                this.game.remove(this);
            }
        }
    };

    MovingObject.prototype.isCollidedWith = function (otherObject) {
        var x_dist = Math.abs(this.pos[0] - otherObject.pos[0]); //needs to be changed to refer to hitbox
        var y_dist = Math.abs(this.pos[1] - otherObject.pos[1]);

        var radii_distance = this.radius + otherObject.radius;
        var dist = this.absoluteDistance(otherObject)
        return (dist <= radii_distance)
    };

    MovingObject.prototype.isWrappable = true;

    MovingObject.prototype.hitboxCompensation = function (pos,imgComp) { //[x,y]
        var hitbox_x = pos[0] + imgComp[0];
        var hitbox_y = pos[1] + imgComp[1];
        return [hitbox_x,hitbox_y]
    }

    MovingObject.prototype.collideWith = function (otherObject) { //default ship behavior...
//         game.remove(otherObject);
//         game.remove(this);
    };

    MovingObject.prototype.absoluteDistance = function (otherObject) {
        var x_dist = Math.abs(this.center()[0] - otherObject.center()[0]); //needs to be changed to refer to hitbox
        var y_dist = Math.abs(this.center()[1] - otherObject.center()[1]);
        var dist = Math.floor(Math.sqrt(Math.pow(x_dist,2) + Math.pow(y_dist,2)));
        return dist
    },

    MovingObject.prototype.vectorDistance = function (otherObject) {
        var x_dist = Math.abs(this.center()[0] - otherObject.center()[0]);
        var y_dist = Math.abs(this.center()[1] - otherObject.center()[1]);
        return [x_dist,y_dist]
    }

})();
