(function () {
    if (typeof window.Asteroids === "undefined") {
        window.Asteroids = {};
    }

    var MovingObject = Asteroids.MovingObject = function (argObj) { //constructor function called from ship and asteroid
        this.pos = argObj['pos']; //this is a good way to make an object, it is tolerant to extra arguments passed in from elsewhere, if you used .call to set attributes on child objects
        this.vel = argObj['vel'];
        this.radius = argObj['radius'];
        this.color = argObj['color'];
        this.game = argObj['game'];
        //this.imgComp = argObj['imgComp']
        this.hitboxPos = this.hitboxCompensation(this.pos.slice(),this.imgComp);
    };

    MovingObject.prototype.draw = function (ctx) { 
        ctx.fillStyle = this.color; 
        ctx.beginPath(); 

        ctx.arc(
          this.pos[0], 
          this.pos[1],
          this.radius,
          0,
          2 * Math.PI, 
          false
        );

        ctx.fill();
    };

    MovingObject.prototype.move = function () {
        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];
        this.hitboxPos[0] += this.vel[0];
        this.hitboxPos[1] += this.vel[1];
        if (this.isWrappable === true) { //depends on wrappable.
            this.pos = this.game.wrap(this.pos);
            this.hitboxPos = this.hitboxCompensation(this.pos.slice(),this.imgComp);
        } else {
            if (this.game.isOutOfBounds(this.pos)) {
                this.game.remove(this);
            }
        }
    };

    MovingObject.prototype.isCollidedWith = function (otherObject) {
        var x_dist = Math.abs(this.hitboxPos[0] - otherObject.hitboxPos[0]); //needs to be changed to refer to hitbox
        var y_dist = Math.abs(this.hitboxPos[1] - otherObject.hitboxPos[1]);
        var dist = Math.floor(Math.sqrt(Math.pow(x_dist,2) + Math.pow(y_dist,2)));
        var radii_distance = this.radius + otherObject.radius;
        return (dist <= radii_distance)
    };

    MovingObject.prototype.isWrappable = true;

    MovingObject.prototype.hitboxCompensation = function (pos,imgComp) { //[x,y]
        var hitbox_x = pos[0] + imgComp[0];
        var hitbox_y = pos[1] + imgComp[1];
        return [hitbox_x,hitbox_y]
    }

    MovingObject.prototype.collideWith = function (otherObject) {
        // game.remove(otherObject);
        // game.remove(this);
    };

})();
