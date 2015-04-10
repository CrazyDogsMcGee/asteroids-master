(function () { //
    if (typeof window.Asteroids === "undefined") {
        window.Asteroids = {};
    }

    if (typeof window.Asteroids.Util === "undefined") {
        window.Asteroids.Util = {};
    }

    Asteroids.Util.inherits = function (ParentClass) {
      var Surrogate = function () {}; //classic js inheritance. Make a surrogate
      Surrogate.prototype = ParentClass.prototype; //the surrogate has all the parents methods
      this.prototype = new Surrogate(); //an instance of a surrogate, that has all the parents methods
      this.prototype.constructor = this; //is constructor a reserved word? The empty object you call it on becomes the constructor. But is this necessary? I thought this was implicit? Or maybe not, if the prototype also attempts to assign the constructor. If I interpret this correctly, taking out the last line will make novel construction logic inaccessible.

      //The point is, all the new INSTANCE METHODS defined for any child ("this") will live in the surrogate instance. Attributes will still belong to the object itself. Inherited methods still live in the surrogate (and all its instances), but since the child protoype is 
      // Cat.constructor === Cat  is true!
    };

    Asteroids.Util.randomVec = function (length) { //magnitude
        var x = Math.floor(Math.random() * length);
        var y = Math.floor(Math.random() * length);
        return [x, y];
    };

})();
