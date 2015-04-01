Ship
* placing firing point (DONE)
* Making shuma's' hitbox based around his eye
* need eye position for ship - this is where the bullets and hitbox comes from
* initial acceleration issue
* Smooth out braking
* possibly fix drawing point? Might have to create translate drawing method.

Game (in charge of object representations, by necessity, contains all draw objects too.)
* score

GameView (in)

Asteroids
* replace with image
* bounce off each other
* make multiple kinds of asteroids

bullet
*make them 
*make spawn point at least correspond with ship orientation

Moving object
* refactor - all moving objects should have a hitbox position instead of just referencing their draw position
* the draw position should be considered different...unless I can get the shift draw position to work...
* look for all constructor methods, need to include image compensation parameter manually
	*Larger asteroids will probably be a separate class then?