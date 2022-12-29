namespace SpriteKind {
    export const Powerup = SpriteKind.create()
    export const Powerup2 = SpriteKind.create()
    export const BombPowerup = SpriteKind.create()
    export const LifePowerup = SpriteKind.create()
}

namespace powerup {
    class PowereUp {
        private sprite: Sprite;
        constructor(img: Image, spriteKind: number, interval: number, chance: number) {
            this.sprite = sprites.create(img, spriteKind);
            this.hide();
            this.sprite.z = 5;

            game.onUpdateInterval(interval, function () {
                if (game.runtime() > 5000 && Math.percentChance(chance)) {
                    // this.sprite.setPosition(Math.randomRange(10, scene.screenWidth() - 10), Math.randomRange(10, scene.screenHeight() - 10))
                    // aqee, emit from screen top
                    this.sprite.setPosition(Math.randomRange(10, screen.width - 10), -10)
                    this.sprite.vy = Math.randomRange(30, 80)
                    this.show();
                }
            })
        }

        private show() {
            this.sprite.setFlag(SpriteFlag.Invisible | SpriteFlag.Ghost, false);
        }

        private hide() {
            this.sprite.setFlag(SpriteFlag.Invisible | SpriteFlag.Ghost, true);
        }

        public caught() {
            music.baDing.play();
            this.sprite.startEffect(effects.fountain, 500);
            this.hide();
        }
    }

    export const powerUp = new PowereUp(img`
    . . . . . . . .
    . . 7 7 7 7 7 .
    . 7 7 1 1 1 7 7
    . 7 7 1 7 1 7 7
    . 7 7 1 1 1 7 7
    . 7 7 1 7 7 7 7
    . 7 7 1 7 7 7 7
    . . 7 7 7 7 7 .
`, SpriteKind.Powerup, 8000, 50);
    export const powerUp2 = new PowereUp(img`
    . . . . . . . .
    . . 5 5 5 5 5 .
    . 5 5 b b b 5 5
    . 5 5 b 5 b 5 5
    . 5 5 b b b 5 5
    . 5 5 b 5 5 5 5
    . 5 5 b 5 5 5 5
    . . 5 5 5 5 5 .
`, SpriteKind.Powerup2, 8500, 50);
    export const bombPowerUp = new PowereUp(img`
    . 6 6 6 6 . . c
    6 6 6 6 6 6 c .
    . b b b b . . c
`, SpriteKind.BombPowerup, 10000, 50);
    export const lifePowerUp = new PowereUp(img`
    . 2 2 . . 2 2 .
    2 2 2 2 2 2 3 2
    2 2 2 2 2 3 2 2
    c 2 2 2 2 2 2 2
    . c 2 2 2 2 2 .
    . . c 2 2 2 . .
    . . . c 2 . . .
`, SpriteKind.LifePowerup, 10000, 40);

    export function create() {

    }
}