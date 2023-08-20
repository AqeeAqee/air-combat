game.stats = true
const hardcore: boolean = false //game.ask("Hardcore mode?");

//test
// summary.destroiedEnemy(Enemies.redPlane.create({ v: 10, pos: 10, direction: Direction.DOWN }), null)
// summary.destroiedEnemy(Enemies.redPlane.create({ v: 10, pos: 10, direction: Direction.DOWN }), null)
// summary.show()

// light.setBrightness(7);
// light.setLength(5);
scene.setBackgroundColor(9);

StoryBook.play();

//////////////////////////////////
/** Change Log, Aqee Li
2023-8
scored by the player hit more, intead of last shot
fix btn events
unified enemy scores
custom Image Dialog, with scolling
add level summary, for both players, scoll with arrow keys
add island for ground-enemies, in randomLevels
fix max 4 bomb to 3
2022-1
fix copilot z-index over pilot when following
2022-12
adds/changes:
always 2 plyers
add title scene (handmade)
add progress bar, diff colors for each kind of enemies
change 2nd player plane to green
co-pilot mode(removed player count choose), effect whenever 2nd player without input for 5s, press any btn exit.
co-pilot will never die
add player's spawn/ level begin/level complete behaviors with animations
add new weapon, yellow icon, bullets concentrated
add 5th weapon level, extra bullets shooting backward
anymore powerup at 5th weapon level, will kill all-in-screen, like a bomb.
2s ghost time after spawn
add hitting sound, even didn't destroyed enemy
change powerups droping from screen top
pump away from enemy instead of random direction
pump away occured only be hit but didn't dead
commented hardcore mode

experience features:
random generated level.

fixed:
bigplane missing when moving left/right: w/h should swap after transposed image
perf tune, avoid set fire effect of enemy repeatly

TODO:
load only one level a time, for save memory of device
tune FPS.
 */