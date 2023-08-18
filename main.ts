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
/** Change Log
 *
2023-8
add summary
fix max 4 bomb to 3
2022-1
fix copilot z-index over pilot when following
2022-12, Aqee Li
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

fix:
bigplane missing when moving left/right: w/h should swap after transposed image
perf tune, avoid set fire effect of enemy repeatly

TODO:
-shorten bomb shake duration
-co-pilot covered pilot, in following mode
[bug] bombed when start first level
level summary, for both players
    scoll with arrow keys
    custom grid dialog

add island for ground-enemies, in randomLevels
load only one level a time, for save memory of device
pause feature
tune FPS.


 */