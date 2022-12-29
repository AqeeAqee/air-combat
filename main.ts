game.stats = true
const hardcore: boolean = false //game.ask("Hardcore mode?");

// light.setBrightness(7);
// light.setLength(5);
scene.setBackgroundColor(9);

StoryBook.play();


//////////////////////////////////
/** Change Log
 *
2022-12, Aqee Li
adds/changes:
add title scene (handmade)
add progress bar
change 2nd player plane to green
add player's spawn/ level begin/level complete ani & behaviors
add new weapon, yellow icon, bullets concentrated
add 5th weapon level, extra bullets shooting backward
anymore powerup at 5th weapon level, will kill all-in-screen, like bomb.
2s ghost time after spawn
add hitting sound, even didn't destroyed enemy
change powerups droping from screen top
pump away from enemy instead of random direction
pump away only hit but didn't dead
commented hardcore mode

fix:
bigplane missing when moving left/right: w/h should swap after transposed image
perf tune, avoid set fire effect of enemy repeatly

 */