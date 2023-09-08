game.stats = true
const hardcore: boolean = false //game.ask("Hardcore mode?");

// light.setBrightness(7);
// light.setLength(5);
scene.setBackgroundColor(9);

StoryBook.play();

/** 
features:
 
 * Players:
     * always 2 plyers (orange and green) on sim or RPi
     * player's spawn/level complete animations
     * 2s ghost time after spawn
     * co-pilot mode 
        * whenever 2nd player absence for 5s, press any key to exit absence.
        * co-pilot will never die
        * removed player count choosing
        * P1 drop P2 bomb if P1's used out
     * pump away from enemy instead of random direction
     * pump away occured only be hit but didn't dead    

 * Weapon:
     * add new weapon, yellow P icon, bullets concentrated
     * add 5th weapon level, extra bullets shooting backward
     * got powerup at 5th weapon level, drop an extra bomb immdiately.
     * powerups icons dropping changed to from screen top

 * Bomb:
     * drop bomb with lightning effect

 * Enemy:
     * add airplane carrier
     * spawn plane on carrier
     * spawn helicopter on battle ship
     * unified enemy scores
     * hitting sound, even enemy hasn't destroyed

 * Levels:
     * add endless random generated levels after 7 designed levels.

 * UI:
     * add title scene (handdrawing)
     * add progress bar, diff colors for each kind of enemies
     * add level summary, custom Image Dialog
        * for both players, scoll with arrow keys
        * scored by the player hit more, intead of who shot last bullet
     * commented hardcore mode choosing

fixed:
 * bigplane missing when moving left/right: w/h should swap after transposed image
 * perf tune, avoid set fire effect of enemy repeatly
 * fix max 4 bomb to 3

TODO:
 * load only one level a time, for save memory of device
 * tune FPS.

 */