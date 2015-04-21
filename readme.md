# Asteroids

This take on asteroids was written with javascript with the HTML5 Canvas API.

Features include:
* Rotating sprites
* Support for multiple key-presses
* Score and lives
* Audio (COMING SOON)

## Design Discussion

First coming into this project, I had to quickly learn many quirks of javascript that I never thought of or simply took for granted coming from Ruby on Rails. Whereas certain class and function scopes seemed to be pretty clear cut in Ruby, and RoR took much of the pain out of loading javascript with it's asset pipeline, for this application I had to become more familiar with function scope and be cognizant of the load order of my javascript assets. I also had to familiarize myself with the HTML5 canvas API and the greater emphasis on asynchronous functions, which I used to take advantage of javascript's "setInterval" and "setTimeout" functions.

### Game Flow
The three main classes of objects in this game are "movingObject", "game", and "gameView." The "movingObject" object contains methods that take an image and draw it to the canvas or detect whether one instance of the object has collided with another. The class is itself never used, but all other objects ("asteroid","ship",etc.) all inherit prototype methods from it or call it's constructor to set properties needed to call the prototype methods. The "game" object operates by managing all the instances of "movingObject," calling their #draw methods and checking for collisions. "gameView" is a further abstraction,

#### More on movingObject and game
Inheritance from moving object is achieved by using an "inherit" utility method. This method handles prototype inheritance by using surrogates. Direct inheritance (asteroid.prototype = movingObject.prototype) would not work because any method defined on asteroids would then get defined or overwritten. Inheritance by instance (asteroid.prototype = new movingObject()) would allow separate object methods to be set, but declaring a new movingObject and calling it's constructor function could have unintended side-effects if it needed to be initialized with parameters, as well as blurring the line between method inheritance and attribute inheritance for the objects. The surrogate inheritance works by creating a new instance of a "surrogate" object whose prototype is set to the prototype of the parent. The child class then sets its prototype to an instance of the surrogate, to shield the parent class from the addition or modification or any methods on the child class. Calling the constructor method is handled by simply calling the constructor of the parent class in the child class.

### Using sprites
When the canvas API draws an image to the canvas element at point (x,y), the point is treated as the new origin. Images are rendered with the top-left corner of the image at the origin. This presents two issues, that the point at which the image is rendered cannot be used for collision detection (being offset to the top-left of the image) and the point cannot be used as the axis of rotation for rotating the image. For each image I use, I must specify a new point to use as an axis of rotation and reference for detecting collisions. I need to specify this new point manually in the object constructor. The object methods then use this new point to check collisions instead of the position the sprite is rendered.
