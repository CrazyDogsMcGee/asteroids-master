(function () {
    if (typeof window.Asteroids === "undefined") {
        window.Asteroids = {};
    }

    if (typeof window.Asteroids.Util === "undefined") {
        window.Asteroids.Util = {};
    }

    Asteroids.Util.inherits = function (ParentClass) {
      var Surrogate = function () {};
      Surrogate.prototype = ParentClass.prototype;
      this.prototype = new Surrogate();
      this.prototype.constructor = this;
      //this way, prototype methods are shared but not attributes
    };

    Asteroids.Util.randomVec = function (length) {
        var x = Math.floor(Math.random() * length);
        var y = Math.floor(Math.random() * length);

        if (x == 0 || y == 0) {
          return Asteroids.Util.randomVec(length);
        }

        return [x, y];
    };

    Asteroids.Util.vectorAngle = function (v1,v2) {
      var numerator = (v1[0]*v2[0])+(v1[1]*v2[1]);
      var denomenator1 = Math.sqrt(Math.pow(v1[0],2)+Math.pow(v1[2],2));
      var denomenator2 = Math.sqrt(Math.pow(v2[0],2)+Math.pow(v2[2],2));
      var ratio = numerator/(denomenator1*denomenator1);
      return Math.acos(ratio);
    };

    Asteroids.Util.comparison = function (val1,val2) {
      if (val1 < val2) {
        return 1
      } else if (val1 > val2) {
        return -1
      } else {
        return 0
      }
    }

})(); //IFFE disperses all into javascript space
