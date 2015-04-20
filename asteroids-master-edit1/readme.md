# Asteroids

This take on asteroids was written with javascript with the HTML5 Canvas API.

Features include:
* Rotating sprites
* Support for multiple key-presses
* Score and lives
* Audio (COMING SOON)

## Design Discussion

First coming into this project, I had to quickly learn many quirks of javascript that I never thought of or simply took for granted coming from Ruby on Rails.
Whereas certain class and function scopes seemed to be pretty clear cut in Ruby, and RoR took much of the pain out of loading javascript with it's asset pipeline,
for this application I had to become more familiar with function scope and be cognizant of the load order of my javascript assets. I also had to familiarize myself with the
HTML5 canvas API and the greater emphasis on asynchronous functions, which I used to take advantage of javascript's "setInterval" and "setTimeout" functions.

### Using sprites


### HUD elements and game flow