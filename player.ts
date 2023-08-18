class Player extends SpriteWrapper.Support {
    private static readonly MAX_LIFES = 5;
    private hits = 0;
    private bombs = 3;
    private weaponLevel = 1;
    private weaponKind = SpriteKind.WeaponPowerup;//aqee, for multi kind of weapons
    private timeHitable = 0;
    private readonly bombSprites: Sprite[] = [];
    private static readonly bombImage: Image = img`
        . . 6 6 6 . . f
        . 6 6 6 6 6 f .
        6 6 6 6 6 6 f f
        . 6 6 6 6 b f .
        . . b b b . . f
    `;
    private static readonly projectileImg = img`
        1
        1
    `;
    private static readonly projectile2Img = img`
        5
        5
    `;
    private static readonly plane1Left = img`
        . . . . . 4 . . . . . . . . . .
        . . 4 . . 4 . . e . . . . . . .
        . 9 9 9 4 8 e 9 9 9 . . . . . .
        . . 4 . 4 8 e . e . . . . . . .
        4 4 4 4 4 4 4 4 4 e . . . . . .
        e e e e e 4 b b b b e . . . . .
        6 4 4 4 4 4 4 4 4 e 6 . . . . .
        . . 4 e . . . 4 e . . . . . . .
        . . 4 e . . . 4 e . . . . . . .
        . . 4 e . . . 4 e . . . . . . .
        . 4 4 4 . . . 4 e e . . . . . .
        . 3 4 2 e e e 2 e 3 . . . . . .
        4 4 4 4 4 4 4 4 4 e e . . . . .
        . . 4 e . . . 4 e . . . . . . .
    `;
    private static readonly plane1Straight = img`
        . . . . . . . 4 4 . . . . . . .
        . . . 4 . . . 4 4 . . . 4 . . .
        . . 6 6 6 . 4 8 8 e . 6 6 6 . .
        . . . 4 . . 4 8 8 e . . 4 . . .
        . 4 4 4 4 4 4 4 4 4 4 4 4 4 4 .
        4 4 e e e e e e b b b b b b 4 e
        . 6 4 4 4 4 4 4 4 4 4 4 4 4 6 .
        . . . 4 e . . . . . . 4 e . . .
        . . . 4 e . . . . . . 4 e . . .
        . . . 4 e . . . . . . 4 e . . .
        . . 4 4 4 e . . . . 4 4 4 e . .
        . . 3 4 2 3 e e e e 3 2 4 3 . .
        d 4 4 4 4 4 4 4 4 4 4 4 4 4 4 e
        . . . 4 e . . . . . . 4 e . . .
    `;
    private static readonly plane1Right = img`
        . . . . . . . . . . 4 . . . . .
        . . . . . . . 4 . . 4 . . 4 . .
        . . . . . . 9 9 9 4 8 4 9 9 9 .
        . . . . . . . 4 . 4 8 4 . 4 . .
        . . . . . 3 4 4 4 4 4 4 4 4 4 4
        . . . . . 3 e e e e 4 b b b b 4
        . . . . . 6 4 4 4 4 4 4 4 4 4 6
        . . . . . . . 4 4 . . . 4 4 . .
        . . . . . . . 4 4 . . . 4 4 . .
        . . . . . . . 4 4 . . . 4 4 . .
        . . . . . . 4 4 4 . . . 4 4 4 .
        . . . . . . 3 4 2 e e e 2 4 3 .
        . . . . . 3 4 4 4 4 4 4 4 4 4 4
        . . . . . . . 4 e . . . 4 e . .
    `;
    //aqee, change 2nd player to green color
    private static readonly plane2Left = img`
        . . . . . . . . . . . . . . . . .
        . . . . . . 7 . . . . . . . . . .
        . . . 7 . . 7 . . e . . . . . . .
        . . 9 9 9 7 8 e 9 9 9 . . . . . .
        . . . 7 . 7 8 e . e . . . . . . .
        . 7 7 7 7 7 7 7 7 7 e . . . . . .
        . e e e e e 7 b b b b e . . . . .
        . 6 7 7 7 7 7 7 7 7 e 6 . . . . .
        . . . 7 e . . . 7 e . . . . . . .
        . . . 7 e . . . 7 e . . . . . . .
        . . . 7 e . . . 7 e . . . . . . .
        . . 7 7 7 . . . 7 e e . . . . . .
        . . 9 7 6 e e e 6 e 9 . . . . . .
        . 7 7 7 7 7 7 7 7 7 e e . . . . .
        . . . 7 e . . . 7 e . . . . . . .
    `;
    private static readonly plane2Straight = img`
        . . . . . . . . . . . . . . . . .
        . . . . . . . . 7 7 . . . . . . .
        . . . . 7 . . . 7 7 . . . 7 . . .
        . . . 6 6 6 . 7 8 8 e . 6 6 6 . .
        . . . . 7 . . 7 8 8 e . . 7 . . .
        . . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 .
        . 7 7 e e e e e e b b b b b b 7 e
        . . 6 7 7 7 7 7 7 7 7 7 7 7 7 6 .
        . . . . 7 e . . . . . . 7 e . . .
        . . . . 7 e . . . . . . 7 e . . .
        . . . . 7 e . . . . . . 7 e . . .
        . . . 7 7 7 e . . . . 7 7 7 e . .
        . . . 9 7 6 9 e e e e 9 6 7 9 . .
        . d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 e
        . . . . 7 e . . . . . . 7 e . . .
    `;
    private static readonly plane2Right = img`
        . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . 7 . . . . .
        . . . . . . . . 7 . . 7 . . 7 . .
        . . . . . . . 9 9 9 7 8 7 9 9 9 .
        . . . . . . . . 7 . 7 8 7 . 7 . .
        . . . . . . 9 7 7 7 7 7 7 7 7 7 7
        . . . . . . 9 e e e e 7 b b b b 7
        . . . . . . 6 7 7 7 7 7 7 7 7 7 6
        . . . . . . . . 7 7 . . . 7 7 . .
        . . . . . . . . 7 7 . . . 7 7 . .
        . . . . . . . . 7 7 . . . 7 7 . .
        . . . . . . . 7 7 7 . . . 7 7 7 .
        . . . . . . . 9 7 6 e e e 6 7 9 .
        . . . . . . 9 7 7 7 7 7 7 7 7 7 7
        . . . . . . . . 7 e . . . 7 e . .
    `;
    private static readonly planeImages = [[], [Player.plane1Left, Player.plane1Straight, Player.plane1Right],
    [Player.plane2Left, Player.plane2Straight, Player.plane2Right]]
    private lastDirection: Direction = Direction.UP;
    private lastShot: number = 0;

    public playerNo: number;
    private controller: controller.Controller
    private lastInputTime = 0
    public isAbsence = false

    constructor(playerNo: number = 1) {
        super(sprites.create(Player.planeImages[playerNo][1], SpriteKind.Player));
        this.playerNo = playerNo
        this.sprite.data["player"] = playerNo

        info.setLife(Player.MAX_LIFES);
        this.showLifeLights();

        this.sprite.y = 110;
        this.sprite.z = 100 - playerNo;

        this.sprite.setFlag(SpriteFlag.StayInScreen, true);

        const bombPositions = playerNo === 1 ? [5, 14, 23] : [scene.screenWidth() - 5, scene.screenWidth() - 14, scene.screenWidth() - 23]
        for (let pos of bombPositions) {
            const bomb = sprites.create(Player.bombImage, SpriteKind.BombPowerup);
            bomb.data["player"] = playerNo

            bomb.setFlag(SpriteFlag.RelativeToCamera, false);
            bomb.setFlag(SpriteFlag.Ghost | SpriteFlag.Invisible, true);
            bomb.setPosition(pos, scene.screenHeight() - 5);
            bomb.z = 1000;
            this.bombSprites.push(bomb);
        }
        this.drawBombs();
        const bomb = this.bombSprites[0];

        this.controller = this.playerNo === 2 ? controller.player2 : controller.player1;
        // this.controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
        //     this.lastInputTime = game.runtime()
        //     this.dropBomb()
        // });

        // this.controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
        //     this.lastInputTime = game.runtime()
        //     this.shoot();
        // });

        if (this.playerNo == 2) {
            controller.player1.B.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.isAbsence)
                    this.shoot()
            })
            controller.player1.A.onEvent(ControllerButtonEvent.Pressed, () => {
                if (this.isAbsence)
                    this.dropBomb()
            })
            controller.player1.B.onEvent(ControllerButtonEvent.Repeated, () => {
                if (this.isAbsence)
                    this.shoot()
            })
            controller.player1.A.onEvent(ControllerButtonEvent.Repeated, () => {
                if (this.isAbsence)
                    this.dropBomb()
            })
        }



        this.lastInputTime = game.runtime()

        game.onUpdateInterval(250, function () {
            if (this.controller.B.isPressed()) {
                this.shoot();
            }

            if (this.controller.A.isPressed()) {
                this.dropBomb();
            }

            if (this.controller.left.isPressed() && this.lastDirection !== Direction.LEFT) {
                this.lastInputTime = game.runtime()
                if (this.lastDirection === Direction.RIGHT) {
                    this.sprite.setImage(Player.planeImages[playerNo][1]);
                    this.lastDirection = Direction.UP;
                } else {
                    this.sprite.setImage(Player.planeImages[playerNo][0]);
                    this.lastDirection = Direction.LEFT;
                }
            } else if (this.controller.right.isPressed() && this.lastDirection !== Direction.RIGHT) {
                this.lastInputTime = game.runtime()
                if (this.lastDirection === Direction.LEFT) {
                    this.sprite.setImage(Player.planeImages[playerNo][1]);
                    this.lastDirection = Direction.UP;
                } else {
                    this.sprite.setImage(Player.planeImages[playerNo][2]);
                    this.lastDirection = Direction.RIGHT;
                }
            } else if (!this.controller.left.isPressed() && !this.controller.right.isPressed()) {
                this.sprite.setImage(Player.planeImages[playerNo][1]);
                this.lastDirection = Direction.UP;
            }

            if (this.playerNo === 2) {
                if (controller.player2.buttons.find((b) => b.isPressed()))
                    this.lastInputTime = game.runtime()
                // if (game.currentScene() && game.currentScene().followingSprites){
                //     const followInfo = game.currentScene().followingSprites
                //     console.log(["following count:", followInfo.length, ", noInputTime:", game.runtime() - this.lastInputTime, ", isAbsence:", this.isAbsence])
                // }
                if (!this.isAbsence && (game.runtime() - this.lastInputTime > 10000)) {
                    this.isAbsence = true
                    Players.onAbsence(this)
                    // console.log("follow")
                } else if (this.isAbsence && (game.runtime() - this.lastInputTime < 5000)) {
                    this.isAbsence = false
                    Players.onComeBack(this)
                    // console.log("unfollow")
                }
            }
        });
    }

    private moveByController(enable: boolean) {
        if (enable)
            this.controller.moveSprite(this.sprite)
        else
            this.controller.moveSprite(this.sprite, 0, 0)
    }

    public increaseLife() {
        info.setLife(Math.min(info.life() + 1, Player.MAX_LIFES));
        info.changeScoreBy(100);
        this.showLifeLights();
    }

    public increaseWeaponLevel(k: number) {
        if (this.weaponKind == k) {
            if (this.weaponLevel == 5)
                Enemies.destroyAll(this.sprite);
            this.weaponLevel = Math.min(this.weaponLevel + 1, 5);
        } else
            this.weaponKind = k
    }

    public decreaseWeaponLevel() {
        this.weaponLevel = Math.max(this.weaponLevel - 1, 0);
    }

    public increaseBombs() {
        this.bombs = Math.min(this.bombs + 1, 3);
        this.drawBombs()
    }

    public decreaseBombs() {
        this.bombs = Math.max(this.bombs - 1, 0);
        this.drawBombs()
    }

    private showLifeLights() {
        // for (let i = 0; i < 5; i++) {
        //     light.setPixelColor(i, light.colors(i + 1 <= info.life() ? Colors.Green : Colors.Red));
        // }
    }

    private drawBombs() {
        this.bombSprites.forEach((sprite: Sprite, index: number) => {
            sprite.setFlag(SpriteFlag.Invisible, this.bombs < index + 1);
        });
    }

    public getSprite(): Sprite {
        return this.sprite;
    }

    public dropBomb() {
        if (this.bombs > 0) {
            this.bombs -= 1;
            this.sprite.startEffect(effects.halo, 2000);
            scene.cameraShake(10, 500);
            const bomb = this.bombSprites[0]
            Enemies.destroyAll(bomb);
            this.drawBombs();
        }
    }
    public shoot() {
        // Limit the shooting rate to not create too many sprites at once
        if (game.runtime() - this.lastShot < 250) {
            return;
        }

        if (this.weaponKind == SpriteKind.WeaponPowerup2) { //aqee, new weapon
            for (let i = -this.weaponLevel; i <= this.weaponLevel; i += 2) {
                const p = sprites.createProjectileFromSprite(Player.projectile2Img, this.sprite, 0, -50);
                p.data["player"] = this.playerNo
                p.setScaleCore(1, this.weaponLevel)
                p.x += i
                p.y += Math.abs(i) - 12
                p.ay = -500
            }
            if (this.weaponLevel >= 5) {
                for (let i = -1; i <= 1; i += 2) {
                    const p = sprites.createProjectileFromSprite(Player.projectile2Img, this.sprite, 0, 50);
                    p.data["player"] = this.playerNo
                    p.setScaleCore(1, 3)
                    p.x += i
                    p.y += 12
                    p.ay = 500
                }
            }
        } else { //this.weaponKind == SpriteKind.WeaponPowerup
            const vList = [[], [0, -100], [0, -100], [50, -87], [87, -50], [0, 100]]
            for (let i = 1; i <= this.weaponLevel; i++) {
                if ((i == 1) != (this.weaponLevel > 1)) {
                    const p = sprites.createProjectileFromSprite(Player.projectileImg, this.sprite, vList[i][0], vList[i][1]);
                    p.data["player"] = this.playerNo
                    if (i == 2 || i == 5) p.x += 1
                }
                if (i > 1) {
                    const p2 = sprites.createProjectileFromSprite(Player.projectileImg, this.sprite, -vList[i][0], vList[i][1]);
                    p2.data["player"] = this.playerNo
                    if (i == 2 || i == 5) p2.x -= 1
                }
            }
        }
        this.lastShot = game.runtime();
    }

    public gotHit(otherSprite?: Sprite): boolean { //return whether bounce away
        if (this.isAbsence) return false

        // Add some grace time when got hit
        if (game.runtime() > this.timeHitable) {
            this.timeHitable = game.runtime() + 500; //aqee, change lastHit to timeHitable, for add ghost time

            if (this.weaponLevel > 1) {
                this.weaponLevel -= 1;
                music.playSound("G5:1 C5:1");
            } else {
                // if (info.life() === 1) {
                //     // will be game over
                //     light.showAnimation(light.runningLightsAnimation, 500);
                // }
                info.changeLifeBy(-1);
                this.showLifeLights();
                this.dead()
                music.playSound("G5:1 E5:1 C5:2");

                if (info.life() > 0) {
                    this.spawn()
                    this.makeGhostTime() //aqee, add ghost time
                }
                return false
            }

            this.sprite.startEffect(effects.spray, 200);
            if (otherSprite) {
                otherSprite.destroy(effects.fire, 100);
            }
            return true
        } else {
            if (otherSprite) {
                otherSprite.destroy();
            }
            return false
        }
    }

    dead() {
        this.sprite.setFlag(SpriteFlag.Invisible, true)
        this.moveByController(false)
    }

    makeGhostTime() {
        this.timeHitable = game.runtime() + 3000;
        this.sprite.setFlag(SpriteFlag.Invisible, true)
        for (let i = 0; i <= 20; i++) {
            setTimeout(() => {
                this.sprite.flags ^= SpriteFlag.Invisible
            }, i * 100)
        }
        setTimeout(() => { //ensure visible
            this.sprite.setFlag(SpriteFlag.Invisible, false)
        }, 2100)
    }

    spawnX: number = 80
    spawn(xPosition?: number) {
        if (xPosition)
            this.spawnX = xPosition

        this.sprite.x = this.spawnX
        this.sprite.top = 120 + 20
        this.sprite.vy = -160
        this.sprite.ay = 0
        this.sprite.fy = 500
        this.sprite.setFlag(SpriteFlag.StayInScreen, true)
        this.sprite.setFlag(SpriteFlag.Invisible, false)
        setTimeout(() => { //ensure visible
            this.moveByController(true)
        }, 500)
    }

    levelCompleted() {
        this.moveByController(false)
        this.sprite.setFlag(SpriteFlag.StayInScreen, false)
        this.sprite.ay = -500
    }

}

namespace Players {
    const players: Player[] = [];

    export function create() {
        const MULTIPLAYER_ENABLED = control.ramSize() > 1024 * 400;
        const twoPlayerMode: boolean = MULTIPLAYER_ENABLED// && game.ask("Two player mode?");
        addPlayerOne();
        if (twoPlayerMode) {
            addPlayerTwo();
        }
    }

    export function addPlayerOne() {
        players.push(new Player(1));
        players[0].dead()
        players[0].spawnX = scene.screenWidth() / 2
        init();
    }
    export function addPlayerTwo() {
        players.push(new Player(2));
        players[1].dead()
        players[0].spawnX = scene.screenWidth() / 2 - 30
        players[1].spawnX = scene.screenWidth() / 2 + 30

        controller.player1.B.onEvent(ControllerButtonEvent.Pressed, () => {
            // console.logValue("B", players.length > 1 && players[1].isAbsence)
            if (players.length > 1 && players[1].isAbsence)
                players[1].shoot()
        })
        controller.player1.A.onEvent(ControllerButtonEvent.Pressed, () => {
            // console.logValue("A", players.length > 1 && players[1].isAbsence)
            if (players.length > 1 && players[1].isAbsence)
                players[1].dropBomb()
        })

        controller.player1.B.onEvent(ControllerButtonEvent.Repeated, () => {
            // console.logValue("B", players.length > 1 && players[1].isAbsence)
            if (players.length > 1 && players[1].isAbsence)
                players[1].shoot()
        })
        controller.player1.A.onEvent(ControllerButtonEvent.Repeated, () => {
            // console.logValue("A", players.length > 1 && players[1].isAbsence)
            if (players.length > 1 && players[1].isAbsence)
                players[1].dropBomb()
        })

    }

    export function randomPlayer() {
        if (players.length == 0) {
            throw "No player added";
        }
        if (players.length == 1) {
            return players[0];
        } else {
            return players[randint(0, players.length - 1)];
        }
    }

    function fromSprite(sprite: Sprite): Player {
        return SpriteWrapper.fromSprite(sprite) as Player;
    }

    function init() {
        sprites.onOverlap(SpriteKind.WeaponPowerup, SpriteKind.Player, function (powerUpSprite, playerSprite) {
            info.changeScoreBy(30);
            fromSprite(playerSprite).increaseWeaponLevel(SpriteKind.WeaponPowerup);
            powerup.powerUp.caught();
        });

        sprites.onOverlap(SpriteKind.WeaponPowerup2, SpriteKind.Player, function (powerUp2Sprite, playerSprite) {
            info.changeScoreBy(30);
            fromSprite(playerSprite).increaseWeaponLevel(SpriteKind.WeaponPowerup2);
            powerup.powerUp2.caught();
        });

        sprites.onOverlap(SpriteKind.BombPowerup, SpriteKind.Player, function (powerUpSprite, playerSprite) {
            info.changeScoreBy(50);
            fromSprite(playerSprite).increaseBombs();
            powerup.bombPowerUp.caught();
        });
        sprites.onOverlap(SpriteKind.LifePowerup, SpriteKind.Player, function (lifeUpSprite, playerSprite) {
            fromSprite(playerSprite).increaseLife();
            powerup.lifePowerUp.caught();
        });

        sprites.onOverlap(SpriteKind.EnemyProjectile, SpriteKind.Player, function (enemyProjectile, playerSprite) {
            fromSprite(playerSprite).gotHit(enemyProjectile);
        });

        sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (enemySprite, playerSprite) {
            const enemy: Enemy = SpriteWrapper.fromSprite(enemySprite) as Enemy;
            if (enemySprite.z < 10) {
                // no collision with low objects like vehicles or ships
                return;
            }

            if (fromSprite(playerSprite).gotHit()) {
                //aqee, replace random bounce direction with bumped away from enemy
                playerSprite.setPosition(2 * playerSprite.x - enemySprite.x, 2 * playerSprite.y - enemySprite.y)
                scene.cameraShake(3, 700);
            }
            enemy.gotHitBy(playerSprite);
        });
    }

    export function levelCompleted() {
        players.forEach((p) => p.levelCompleted())
    }

    export function spawn() {
        players.forEach((p) => p.spawn())
    }

    export function onAbsence(player: Player) {
        if (player.playerNo == 2) {
            if (players.length < 2)
                Players.addPlayerTwo()
            players[1].sprite.follow(players[0].sprite, 80, 300)
        }
    }

    export function onComeBack(player: Player) {
        if (player.playerNo == 2) {
            players[1].sprite.follow(null)
        }
    }
}
