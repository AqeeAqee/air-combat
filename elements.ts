namespace SpriteKind {
    export const EnemyProjectile = SpriteKind.create()
}

namespace EnemySubKind {
    export const RedPlane = SpriteKind.create()
    export const GreenPlane = SpriteKind.create()
    export const GrayPlane = SpriteKind.create()
    export const BigPlane = SpriteKind.create()
    export const BomberPlane = SpriteKind.create()
    export const CombatHelicopter = SpriteKind.create()
    export const Frigate = SpriteKind.create()
    export const BattleShip = SpriteKind.create()
    export const Carrier = SpriteKind.create()
    export const Tank = SpriteKind.create()
    export const AntiAircraftTower = SpriteKind.create()
    export const AntiAircraftMissile = SpriteKind.create()
    export const enemySubKinds = [
        EnemySubKind.RedPlane,
        EnemySubKind.GreenPlane,
        EnemySubKind.GrayPlane,
        EnemySubKind.BigPlane,
        EnemySubKind.BomberPlane,
        EnemySubKind.CombatHelicopter,
        EnemySubKind.Frigate,
        EnemySubKind.BattleShip,
        EnemySubKind.Carrier,
        EnemySubKind.Tank,
        EnemySubKind.AntiAircraftTower,
        EnemySubKind.AntiAircraftMissile,
    ]
}

function angleBetween(sprite1: Sprite, sprite2: Sprite): number {
    const dx: number = sprite2.x - sprite1.x;
    const dy: number = sprite2.y - sprite1.y;
    const a = Math.atan2(dx, dy);
    return a;
}

function vComponents(v: number, angle: number): { vx: number, vy: number } {
    const vy = v * Math.cos(angle);
    const vx = v * Math.sin(angle);
    return { vx, vy };
}

function toRadian(degrees: number) {
    return degrees * (Math.PI / 180);
}

function toDegrees(rad: number) {
    return rad * (180 / Math.PI);
}

enum Direction { UP, LEFT, DOWN, RIGHT };
const cloudZ = 30;

function rotateImage(img: Image, deg: number): Image {
    function transpose(img: Image): Image {
        const result = image.create(img.height, img.width);
        for (let x = 0; x < img.width; x++) {
            for (let y = 0; y < img.height; y++) {
                result.setPixel(y, x, img.getPixel(x, y));
            }
        }
        return result;
    }

    if (deg == -90 || deg == 270) {
        const r = transpose(img);
        r.flipY();
        return r;
    } else if (deg == 180 || deg == -180) {
        const r = img.clone();
        r.flipX();
        r.flipY();
        return r;
    } else if (deg == 90) {
        const r = transpose(img);
        r.flipX();
        return r;
    } else {
        return img;
    }
}

function rotate(img: Image, direction: Direction): Image {
    switch (direction) {
        case Direction.DOWN: return img;
        case Direction.UP: return rotateImage(img, 180);
        case Direction.LEFT: return rotateImage(img, 90);
        case Direction.RIGHT: return rotateImage(img, 270);
    }
}

function rotate45(img: Image, img45: Image, angleDegrees: number): Image {
    switch (angleDegrees) {
        case 180:
        case -180:
            return rotateImage(img, 180);
        case 135:
            return rotateImage(img45, 180);
        case 90:
            return rotateImage(img, -90);
        case 45:
            return rotateImage(img45, -90);
        case 0:
            return img;
        case -45:
            return img45;
        case -90:
            return rotateImage(img, 90);
        case -135:
            return rotateImage(img45, 90);
        default:
            return img
    }
}

class Elements {
    public static cloud1 = { color: 15, create: (mov: Movement) => new Cloud(mov, 1) };
    public static cloud2 = { color: 15, create: (mov: Movement) => new Cloud(mov, 2) };

    public static island1 = { color: 15, create: (mov: Movement) => new Island(mov, 1) };
    public static island2 = { color: 15, create: (mov: Movement) => new Island(mov, 2) };
    public static island3 = { color: 15, create: (mov: Movement) => new Island(mov, 3) };
    public static island4 = { color: 15, create: (mov: Movement) => new Island(mov, 4) };
}

img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`
class Enemies {
    public static redPlane = { color: 2, create: (mov: Movement) => new RedPlane(mov) };
    public static greenPlane = { color: 7, create: (mov: Movement) => new GreenPlane(mov) };
    public static grayPlane = { color: 11, create: (mov: Movement) => new GrayPlane(mov) };
    public static bigPlane = { color: 6, create: (mov: Movement) => new BigPlane(mov) };
    public static bomberPlane = { color: 13, create: (mov: Movement) => new BomberPlane(mov) };
    public static combatHelicopter = { color: 3, create: (mov: Movement) => new CombatHelicopter(mov) };
    public static frigate = { color: 10, create: (mov: Movement) => new Frigate(mov) };
    public static battleShip = { color: 4, create: (mov: Movement) => new BattleShip(mov) };
    public static battleShip2 = { color: 4, create: (mov: Movement) => new BattleShip(mov,2) };
    public static battleShip3 = { color: 4, create: (mov: Movement) => new BattleShip(mov,3) };
    public static carrier = { color: 5, create: (mov: Movement) => new Carrier(mov) };
    public static carrier2 = { color: 5, create: (mov: Movement) => new Carrier(mov,2) };
    public static carrier3 = { color: 5, create: (mov: Movement) => new Carrier(mov,3) };
    public static tank = { color: 7, create: (mov: Movement) => new Tank(mov) };
    public static antiAircraftTower = { color: 12, create: (mov: Movement) => new AntiAircraftTower(mov) };

    public static antiAircraftMissile = (x: number, y: number) => new AntiAircraftMissile(x, y);

    public static destroyAll(sprite: Sprite): void {
        SpriteWrapper.all().forEach((object: SpriteWrapper.SpriteWrapper) => {
            if (object instanceof BaseEnemy) {
                (object as Enemy).gotHitBy(sprite);
            }
        });
        sprites.allOfKind(SpriteKind.EnemyProjectile).forEach((projectile: Sprite) => {
            projectile.destroy();
        });
    }
}

interface Element extends SpriteWrapper.SpriteWrapper {

}

interface Enemy extends Element {
    getScore(): number;
    gotHitBy(projectile?: Sprite): void;
}

interface RelativeMovement {
    direction: Direction;
    v: number;
    pos: number;
    f?: number;
}

interface AbsolutMovement {
    startX: number;
    startY: number;
    vx: number;
    vy: number;
    f?: number;
}

type Movement = AbsolutMovement | RelativeMovement;

function isRelativeMovement(mov: Movement): mov is RelativeMovement {
    return (mov as RelativeMovement).direction !== undefined;
}

function isAbsoluteMovement(mov: Movement): mov is AbsolutMovement {
    return (mov as AbsolutMovement).startX !== undefined;
}

abstract class BaseObject extends SpriteWrapper.Support {
    protected movement: Movement;
    private intervalFunctions: { (): void; }[] = [];

    private static createSprite(image: Image, mov: Movement): Sprite {
        let sprite: Sprite = undefined;
        if (isRelativeMovement(mov)) {
            //mov = mov as RelativeMovement;
            sprite = sprites.create(rotate(image, mov.direction), SpriteKind.Enemy);
            if(mov.f)
                sprite.fy=mov.f

            let x: number, y: number, vx: number, vy: number;
            switch (mov.direction) {
                case Direction.DOWN:
                    x = mov.pos;
                    y = -image.height / 2 + 2;
                    vx = 0;
                    vy = mov.v;
                    break;
                case Direction.UP:
                    x = mov.pos;
                    y = scene.screenHeight() + image.height / 2 - 2;
                    vx = 0;
                    vy = -mov.v;
                    break;
                case Direction.LEFT:
                    x = scene.screenWidth() + image.height / 2 - 2; //aqee, width->height, transposed
                    y = mov.pos;
                    vx = -mov.v;
                    vy = 0;
                    break;
                case Direction.RIGHT:
                    x = -image.height / 2 + 2; //aqee, width->height, transposed
                    y = mov.pos;
                    vx = mov.v;
                    vy = 0;
                    break;
            }

            sprite.setPosition(x, y);
            sprite.setVelocity(vx, vy);
        } else if (isAbsoluteMovement(mov)) {
            mov = mov as AbsolutMovement;
            sprite = sprites.create(image, SpriteKind.Enemy);
            sprite.setPosition(mov.startX, mov.startY);
            sprite.setVelocity(mov.vx, mov.vy);
            if(mov.f)
                sprite.fy=mov.f
        }

        sprite.setFlag(SpriteFlag.AutoDestroy, true);
        return sprite;
    }

    constructor(image: Image, mov: Movement) {
        super(BaseObject.createSprite(image, mov));
        this.movement = mov;
    }

    public onDestroyed(): void {
        this.intervalFunctions.forEach(f => f());
    }

    public onUpdateInterval(interval: number, f: () => void) {
        const removeInterval = Interval.on(interval, f);
        this.intervalFunctions.push(removeInterval);
    }
}

abstract class BaseEnemy extends BaseObject {
    public subKind: number
    protected remainingHits: number = hardcore ? 1 : 2;
    protected hits: number = hardcore ? 1 : 2;
    public hitsByPlayer:number[]=[0,0]
    public icon:Image //size=11 or 12
    protected effectStarted = false

    constructor(image: Image, mov: Movement, hits: number = 1) {
        super(image, mov);
        this.icon= BaseEnemy.getIcon(image)
        this.hits = hardcore ? hits * 2 : hits;
        this.remainingHits = this.hits;
    }

    static getIcon(img: Image) {
        let size= Math.max(img.width,img.height)%2===0?12:11
        const icon = image.create(size, size)
        // console.log([img.width,img.height].join())
        if (img) { //keep original w/h ratio
            if (img.width > img.height) {
                // console.logValue("h", size * img.height / img.width)
                const h = size * img.height / img.width
                icon.blit(0, (size - h) >> 1, size, h, img, 0, 0, img.width, img.height, true, false)
            } else if (img.width < img.height) {
                // console.logValue("w", size * img.width / img.height)
                const w = size * img.width / img.height
                icon.blit((size - w) >> 1, 0, w, size, img, 0, 0, img.width, img.height, true, false)
            } else {
                icon.blit(0, 0, size, size, img, 0, 0, img.width, img.height, true, false)
            }
        }
        icon.flipY()
        return icon
}

    public getScore(): number {
        return 10;
    }

    public gotHitBy(projectile?: Sprite): void {
        let hit=1
        if (projectile && projectile.kind() === SpriteKind.BombPowerup) 
            hit = Math.min(this.remainingHits, 10)
    
        this.remainingHits -= hit;
        let playerNo = projectile.data["player"]
        if (playerNo)
            this.hitsByPlayer[playerNo-1]+=hit

        if (this.remainingHits <= 0) {
            this.sprite.destroy(effects.fire, 100);
                info.changeScoreBy(this.getScore())
            music.playSound("C4:1");

            summary.destroiedEnemy(this, projectile)
        } else {
            //aqee, add hit sound
            music.playTone(Note.C - 4 * this.remainingHits, BeatFraction.Double)
            if ((this.remainingHits < this.hits / 2) && !this.effectStarted) {
                this.effectStarted = true //aqee, avoid repeate fire effect, especially on battleShip
                this.sprite.startEffect(effects.fire);
            }
        }

        if (projectile && projectile.kind() === SpriteKind.Projectile) {
            projectile.destroy();
        }
    }
}

abstract class Vehicle extends BaseEnemy {
    constructor(image: Image, mov: Movement, hits: number = 10) {
        super(image, mov, hits);
        this.sprite.z = 1;
    }
}

abstract class Building extends BaseEnemy {
    constructor(image: Image, mov: Movement, hits: number = 20) {
        super(image, mov, hits);
        this.sprite.z = 1;
    }
}

abstract class Ship extends BaseEnemy {
    constructor(image: Image, mov: Movement, hits: number = 6) {
        super(image, mov, hits);
        this.sprite.z = 0;
    }
}

abstract class Plane extends BaseEnemy {
    constructor(image: Image, mov: Movement, hits: number = 1) {
        super(image, mov, hits);
        this.sprite.z = cloudZ + 10; // above the clouds
    }
}

class Tank extends Vehicle implements Enemy {
    private static readonly projectileImage: Image = img`
        4 f 4
        f 5 f
        4 f 4
    `;
    private static readonly image: Image = img`
        . . c 4 c 4 c . .
        f f 6 6 6 6 6 f f
        e e 6 b 7 b 6 e e
        f f b 7 7 7 b f f
        e e 7 7 c 7 7 e e
        f f b 7 7 7 b f f
        e e 6 b 7 b 6 e e
        f f 6 6 7 6 6 f f
        e e 6 6 7 6 6 e e
        . . c 6 7 6 c . .
        . . . . f . . . .
    `;

    constructor(mov: Movement) {
        super(Tank.image, mov);
        this.subKind = EnemySubKind.Tank
        this.onUpdateInterval(4000, () => {
            this.shoot();
        });
    }

    private shoot(): void {
        const a = angleBetween(this.sprite, Players.randomPlayer().getSprite());
        for (let angle of [a - toRadian(15), a, a + toRadian(15)]) {
            const v = vComponents(30, angle);
            sprites.createProjectile(Tank.projectileImage, v.vx, v.vy, SpriteKind.EnemyProjectile, this.sprite);
        }
    }

    public getScore(): number {
        return this.hits * 5 * 3;
    }
}

class AntiAircraftMissile extends Plane implements Enemy {
    public static readonly image: Image = img`
        . 1 . 1 .
        . . 1 . .
        d 2 d 2 d
        . d d d .
        . d d d .
        . d d d .
        . d d d .
        . d d d .
        . d d d .
        . d d d .
        . . d . .
        . . d . .
    `;
    public static readonly image45: Image = img`
        . . . . . . . 1 .
        . . . . . d 2 . 1
        . . . . . d . 2 .
        . . . . d d d d .
        . . . d d d . . .
        . . d d d . . . .
        . d d d . . . . .
        . d d . . . . . .
        d . . . . . . . .
    `;

    private timeout1: number = 0;
    private timeout2: number = 0;
    private timeout3: number = 0;

    constructor(x: number, y: number) {
        super(AntiAircraftMissile.image, { startX: x, startY: y, vx: 0, vy: 0 });
        this.subKind = EnemySubKind.AntiAircraftMissile

        this.recalc(20);

        this.timeout1 = setTimeout(() => this.recalc(30), 1000);
        this.timeout2 = setTimeout(() => this.recalc(40), 2000);
        this.timeout3 = setTimeout(() => this.recalc(50), 3000);
    }

    private recalc(v: number) {
        const r = AntiAircraftMissile.calc(this.sprite, Players.randomPlayer().getSprite(), v);
        this.sprite.setImage(r.image);
        this.sprite.setVelocity(r.vx, r.vy);
    }

    public static calc(sprite1: Sprite, sprite2: Sprite, v: number): { image: Image, vx: number, vy: number } {
        let a = angleBetween(sprite1, sprite2);
        // Align to 45° angles
        const degrees = Math.round(toDegrees(a) / 45) * 45;
        a = toRadian(degrees);
        const vc = vComponents(v, a);
        return { image: rotate45(AntiAircraftMissile.image, AntiAircraftMissile.image45, degrees), vx: vc.vx, vy: vc.vy };
    }

    public getScore(): number {
        return this.hits * 5 * 2;
    }

    public onDestroyed() {
        if (this.timeout1) {
            clearTimeout(this.timeout1);
        }
        if (this.timeout2) {
            clearTimeout(this.timeout2);
        }
        if (this.timeout3) {
            clearTimeout(this.timeout3);
        }
    }
}

class AntiAircraftTower extends Building implements Enemy {
    private static readonly image: Image = img`
        . . . e e e e e e e e f . . .
        . . e b b b b b b b b b f . .
        . e b b c c c c c c c b b f .
        e b b c c c c c c c c a b b e
        e b c c c c c c c c c c a b f
        e b c c c c c b c c c c a b e
        e b c c c c b c b c c c a b f
        e b c c c b c c c b c c a b e
        e b c c c c b c b c c c a b f
        e b c c c c c b c c c c a b e
        e b c c c c c c c c c c a b f
        e b b c c c c c c c c a b b e
        . e b b c c c c c c c b b f .
        . . e b b b b b b b b b f . .
        . . . e e e e e e e e f . . .
    `;
    private missileLoaded: boolean = true;

    constructor(mov: Movement) {
        super(AntiAircraftTower.image, mov);
        this.subKind = EnemySubKind.AntiAircraftTower
        const i = AntiAircraftTower.image.clone();
        i.drawTransparentImage(AntiAircraftMissile.image, 5, 5);
        this.sprite.setImage(i);
        this.onUpdateInterval(Math.randomRange(2200, 2500), () => this.shoot());
        this.onUpdateInterval(500, () => {
            if (this.missileLoaded) {
                const r = AntiAircraftMissile.calc(this.sprite, Players.randomPlayer().getSprite(), 10);
                const i = AntiAircraftTower.image.clone();
                const offsetX = (AntiAircraftTower.image.width - r.image.width) / 2;
                const offsetY = (AntiAircraftTower.image.height - r.image.height) / 2;
                i.drawTransparentImage(r.image, offsetX, offsetY);
                this.sprite.setImage(i);
            }
        });
    }

    public shoot(): void {
        Enemies.antiAircraftMissile(this.sprite.x + 1, this.sprite.y + 1);
        this.sprite.setImage(AntiAircraftTower.image);
        this.missileLoaded = false;
        setTimeout(() => this.missileLoaded = true, 1500);
    }

    public getScore(): number {
        return this.hits * 5 * 2;
    }
}

class CombatHelicopter extends Plane implements Enemy {
    private static readonly image: Image = img`
        .............1.........
        ...........6b1.........
        ...........6bc.........
        ...........6b1.........
        ...........6.1.........
        ...........6...........
        ...........6...........
        .........bbdbb.........
        .......b1d.b.ddb.......
        .......db.6b6.b1.......
        ......b1..6b6..db......
        ......bd.6bbb6.db......
        ......dbbbbfbbbbd......
        ......bd.6bbb6.db......
        ......b1.b6b6..db......
        .......db.6b6.b1.......
        .......b1d8b8ddb.......
        .........bbdbb.........
        .......................
        .......................
        .......................
        .......................
        .......................
    `;
    private static readonly image45: Image = img`
        .......................
        .......................
        ....................6..
        ...................6bb1
        ..................6bb1.
        ................66.b1..
        .........bbdbb.666.1...
        .......b1d.b.d6b6......
        .......db..b66b6.......
        ......b1..6b666db......
        ......bd.6bbb6.db......
        ......dbbbbfbbbbd......
        ......bd.6bbb6.db......
        ......b1..6b6..db......
        .......db..b..b1.......
        .......b1ddbdddb.......
        .........bbdbb.........
        .......................
        .......................
        .......................
        .......................
        .......................
        .......................
    `;
    private static readonly projectileImage: Image = img`
        . 2 .
        2 f 2
        . 2 .
    `;

    constructor(mov: Movement) {
        super(CombatHelicopter.image, mov, 5);
        this.icon.fill(0)
        this.icon.blit(0, 0, 11,11,CombatHelicopter.image45,6,0,17,17,true,false)
        this.icon.flipY() 
        this.subKind = EnemySubKind.CombatHelicopter
        this.sprite.z = cloudZ - 10; // below the clouds

        this.onUpdateInterval(400, () => {
            let a = angleBetween(this.sprite, Players.randomPlayer().getSprite());
            // Align to 45° angles
            const degrees = Math.round(toDegrees(a) / 45) * 45;
            this.sprite.setImage(rotate45(CombatHelicopter.image, CombatHelicopter.image45, degrees));
        });

        this.onUpdateInterval(1000, () => {
            const a = angleBetween(this.sprite, Players.randomPlayer().getSprite());
            const v = vComponents(100, a);
            sprites.createProjectile(CombatHelicopter.projectileImage, v.vx, v.vy, SpriteKind.EnemyProjectile, this.sprite);
        });
    }

    public getScore(): number {
        return this.hits * 5 * 3;
    }
}

class GreenPlane extends Plane implements Enemy {
    private static readonly image: Image = img`
        . . . . . . . 7 7 . . . . . . .
        . . . . 7 7 6 7 7 6 7 7 . . . .
        . . . . . . 7 7 7 7 . . . . . .
        . . . . . . . 7 7 . . . . . . .
        . . . . . . . 7 7 . . . . . . .
        . . . . . . . 7 7 . . . . . . .
        . . . 7 7 7 7 7 7 7 7 7 7 . . .
        . 6 7 7 6 7 e 7 7 e 7 6 7 7 6 .
        . . . . . 7 7 8 8 7 7 . . . . .
        . . . . . . . 8 8 . . . . . . .
        . . . . . . . 7 7 . . . . . . .
        . . . . . 9 9 9 9 9 9 . . . . .
    `;

    constructor(mov: Movement) {
        super(GreenPlane.image, mov);
        this.subKind = EnemySubKind.GreenPlane
        this.sprite.z = cloudZ - 10; // below the clouds
    }
}

class RedPlane extends Plane implements Enemy {
    private static readonly image: Image = img`
        . . . . . . . 2 . . . . . . . .
        . . . . . . . 2 . . . . . . . .
        . . . . 2 2 2 c 2 2 2 . . . . .
        . . . . . . 2 2 2 . . . . . . .
        . . . . . . 2 2 2 . . . . . . .
        . . . . . . 2 2 2 . . . . . . .
        . . . . c c 2 2 3 4 4 . . . . .
        . . c c 2 2 2 2 3 3 3 4 4 . . .
        c c 2 2 2 2 c 8 9 3 3 3 3 4 4 .
        c 2 2 2 2 2 c 8 9 3 3 3 3 3 4 .
        c c 2 2 2 2 c 8 9 3 3 3 3 4 4 .
        . . . . 2 2 2 2 2 2 2 . . . . .
        . . . . . 2 2 2 2 2 . . . . . .
        . . . . 9 9 9 8 9 9 9 . . . . .
    `;

    constructor(mov: Movement) {
        super(RedPlane.image, mov);
        this.subKind = EnemySubKind.RedPlane
    }
}

class GrayPlane extends Plane implements Enemy {
    private static readonly projectileImage: Image = img`
        b 2 b
        b f b
        . f .
        . f .
        c f c
        . c .
    `;

    private static readonly image: Image = img`
        . . . 2 4 2 . . . . 2 4 2 . . .
        . b b 6 6 6 6 6 6 6 6 6 6 6 6 .
        . . b 6 6 6 6 6 6 6 6 6 6 6 . .
        . . . b 6 6 6 6 6 6 6 6 6 . . .
        . . . b 6 6 6 6 6 6 6 6 6 . . .
        . . . . b 6 6 6 6 6 6 6 . . . .
        . . . . b 6 6 6 6 6 6 6 . . . .
        . . . . . b 6 8 8 6 6 . . . . .
        . . . . . b 6 8 8 6 6 . . . . .
        . . . . . . b 8 8 6 . . . . . .
        . . . . . . b 6 6 6 . . . . . .
        . . . . . . . b 6 . . . . . . .
        . . . . . . . b 6 . . . . . . .
        . . . . . . . b 6 . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `;

    constructor(mov: Movement) {
        super(GrayPlane.image, mov, 2);
        this.subKind = EnemySubKind.GrayPlane
        this.shoot();
    }

    private shoot(): void {
        if (isRelativeMovement(this.movement)) {
            let vx = 50 * Math.sign(this.sprite.vx);
            let vy = 50 * Math.sign(this.sprite.vy);
            let ax = 200 * Math.sign(this.sprite.vx);
            let ay = 200 * Math.sign(this.sprite.vy);

            const projectile = sprites.createProjectile(
                rotate(GrayPlane.projectileImage, this.movement.direction),
                vx,
                vy,
                SpriteKind.EnemyProjectile,
                this.sprite
            );
            projectile.ax = ax;
            projectile.ay = ay;

            // Make sure the projectile is on the screen so
            // that it does not get auto destoryed immediately
            let x = projectile.x, y = projectile.y;
            switch (this.movement.direction) {
                case Direction.DOWN: y = 1; break;
                case Direction.UP: y = scene.screenHeight(); break;
                case Direction.LEFT: x = scene.screenWidth(); break;
                case Direction.RIGHT: x = 0; break;
            }
            projectile.setPosition(x, y);
        }
    }

    public getScore(): number {
        return this.hits*5*4;
    }
}

class BigPlane extends Plane implements Enemy {
    private static readonly projectileImage: Image = img`
        5 2 5
        2 4 2
        5 2 5
    `;
    private static readonly image: Image = img`
        ...........777..........
        ........777777777.......
        ........bbb777bbb.......
        ...........777..........
        ...........777..........
        ...........777..........
        ...........777..........
        ...........777..........
        ..........b727d.........
        ........bb72727dd.......
        .....bbb777777777ddd....
        .bbbb777777777777777ddd.
        b777777bbbb777dddd77777d
        ......7777777777777.....
        .......7...272...7......
        .....b9991.727.b9991....
        ...........272..........
        ............2...........
    `;

    constructor(mov: Movement) {
        super(BigPlane.image, mov, 3);
        this.subKind = EnemySubKind.BigPlane
        this.sprite.z = cloudZ //- 15; // below the clouds
        this.shoot();
        this.onUpdateInterval(1500, () => {
            this.shoot();
        });
    }

    private shoot(): void {
        let vx = 70 * Math.sign(this.sprite.vx);
        let vy = 70 * Math.sign(this.sprite.vy);
        const projectile = sprites.createProjectile(BigPlane.projectileImage, vx, vy, SpriteKind.EnemyProjectile, this.sprite);
        projectile.setPosition(Math.max(projectile.x, 0), Math.max(projectile.y, 0));
    }

    public getScore(): number {
        return this.hits * 5 * 2;
    }
}

class BomberPlane extends Plane implements Enemy {
    private static readonly projectileImage: Image = img`
        5 2 5
        2 4 2
        5 2 5
    `;
    private static readonly image: Image = img`
        .......................22.......................
        ..................bbbddcdddddd..................
        .................bdd4ddcddd4ddd.................
        ...................bdddcddddd...................
        ......................d6dd......................
        ......................d6dd......................
        ......................d6dd......................
        ......................d6dd......................
        ......................d6dd......................
        ......................d6dd......................
        ......................d6dd......................
        .....................bdddd3.....................
        .................bbbbdddddd3333.................
        ............bbbbbdddddddddddddd33333............
        .......bbbbbdddddddddddddddddddddddd33333.......
        .bbbbbbdddddddddddddddddddddddddddddddddd333333.
        bddddddd6dddd6dddddddddddddddddddd6dddd6dddddddd
        bdddd44ddd44ddd44dddddddddddddd44ddd44ddd44ddddd
        bdddd44ddd44ddd44ddddd8dd8ddddd44ddd44ddd44ddddd
        .bddddddddddddddddddddd88dddddddddddddddddddddd.
        ......dd.......dd.....dddd.....dd.......dd......
        ......dd.......dd.....d88d.....dd.......dd......
        ....b6666c...b6666c...d88d...b6666c...b6666c....
        ......................dddd......................
        ......................6226......................
        ......................2dd2......................
        ......................d22d......................
        ......................2dd2......................
        .......................22.......................
        ................................................
    `;

    constructor(mov: Movement) {
        super(BomberPlane.image, mov, 20);
        this.subKind = EnemySubKind.BomberPlane
        this.sprite.z = cloudZ - 20; // below the clouds
        this.shoot();
        this.onUpdateInterval(800, () => {
            this.shoot();
        });
    }

    public shoot(): void {
        sprites.createProjectile(BomberPlane.projectileImage, 0, 100, SpriteKind.EnemyProjectile, this.sprite);
        sprites.createProjectile(BomberPlane.projectileImage, -50, 87, SpriteKind.EnemyProjectile, this.sprite);
        sprites.createProjectile(BomberPlane.projectileImage, 50, 87, SpriteKind.EnemyProjectile, this.sprite);
    }


    public getScore(): number {
        return this.hits * 5 * 2;
    }
}

class Frigate extends Ship implements Enemy {
    private static readonly projectileImage: Image = img`
        5 4 5
        4 f 4
        5 4 5
    `;
    private static readonly image: Image = img`
        . . . . 1 . 1 . 1 . 1 . . . . .
        . . . . . 1 . 1 . 1 . . . . . .
        . . . . c c c c c c c . . . . .
        . . . . c 6 6 6 6 6 c . . . . .
        . . . . c 6 e e e 6 c . . . . .
        . . . . c 6 e e e 6 c . . . . .
        . . . . c 6 b b b 6 c . . . . .
        . . . . c 6 b f b 6 c . . . . .
        . . . . c 6 b f b 6 c . . . . .
        . . . . c 6 b b b 6 c . . . . .
        . . . . c 6 8 8 8 6 c . . . . .
        . . . . c 6 6 6 6 6 c . . . . .
        . . . . c c 6 6 6 c c . . . . .
        . . . . . c 6 6 6 c . . . . . .
        . . . . . c 6 6 6 c . . . . . .
        . . . . . . c c c . . . . . . .
    `;

    constructor(mov: Movement) {
        super(Frigate.image, mov);
        this.subKind = EnemySubKind.Frigate
        this.onUpdateInterval(3000, () => {
            this.shoot();
        });
    }

    private shoot(): void {
        const a = angleBetween(this.sprite, Players.randomPlayer().getSprite());

        const v = vComponents(30, a);
        sprites.createProjectile(Frigate.projectileImage, v.vx, v.vy, SpriteKind.EnemyProjectile, this.sprite);
    }


    public getScore(): number {
        return this.hits * 5 * 2;
    }
}

class BattleShip extends Ship implements Enemy {
    private static readonly projectileImage: Image = img`
        5 4 5
        4 f 4
        5 4 5
    `;
    private static readonly image: Image = img`
        ........1.1.1..............1.1.1........
        .......1.1.1.1............1.1.1.1.......
        ........1.1.1..............1.1.1........
        .......1.1.1.1............1.1.1.1.......
        ........1.1.1..............1.1.1........
        .......1.1.1.1............1.1.1.1.......
        ........1.1.1..............1.1.1........
        .......1.1.1.1............1.1.1.1.......
        ........1.1.1..............1.1.1........
        ...1...66666666666666666666666666..1....
        .....166d6666666666666666666666d661.....
        ......66dddddddddddddddddddddddd66......
        ....1.66d66cbbbbbbbbbbbbbbbbc66d66.1....
        .....166d66cdddddffddffdddddc66d661.....
        ......66d66cddddddddddddddddc66d66......
        ....1.66d66cdd2dd111111dd2ddc66d66.1....
        ...1.166d66cdddd1dddddd1ddddc66d661.1...
        ....1666d66cddd1dddddddd1dddbc66d661....
        .....66d66cbdd1ddd1dd1ddd1ddbc66d66.....
        ...1.66d66cbdd1ddd1dd1ddd1dddc66d66.1...
        ....166d66cddd1ddd1111ddd1dddc66d661....
        .....66d66cddd1ddd1111ddd1dddc66d66.....
        ...1.66d66cdfd1ddd1dd1ddd1dfdc66d66.1...
        ....166d66cdfd1ddd1dd1ddd1dfdc66d661....
        .....66d66cdddd1dddddddd1ddddc66d66.....
        ...1.66d66cddddd1dddddd1dddddc66d66.1...
        ....166d66cddd2dd111111dd2dddc66d661....
        ..1.666d66cddddddddddddddddddc66d666.1..
        ...166d66cbddabbbbbbbbbbbb6ddbc66d661...
        ....66d66cbdabbbbbbbbbbbbbb6dbc66d66....
        ..1.66d66cddab313bbbbbb313b6ddc66d66.1..
        ...166d66cddab111bb22bb111b6ddc66d661...
        ....66d66cddab313bbbbbb313b6ddc66d66....
        ..1.66d66cddabbbbb1b1bbbbbb6ddc66d66.1..
        ...166d66cddabb2bbb1b1bb2bb6ddc66d661...
        ....66d66cddabb2bb1b1bbb2bb6ddc66d66....
        ..1.66d66cddabbbbbb1b1bbbbb6ddc66d66.1..
        ...166d66cddab373bbbbbb373b6ddc66d661...
        ....66d66cddab777bb22bb777b6ddc66d66....
        ..1.66d66cddab373bbbbbb373b6ddc66d66.1..
        ...166d66cddabbbbbbbbbbbbbb6ddc66d661...
        ....66d66cdddabbbbbbbbbbbb6dddc66d66....
        ..1.66d66cd7dddddddddddddddd7dc66d66.1..
        ...166d66cdddddfdfdfdfdfdfddddc66d661...
        ....66d66cde4dfdfdfdfdfdfdde4dc66d66....
        ....66d66cdeeddfdfdfdfdfdfde4dc66d66....
        ..1.66d66cde4dfdfdfdfdfdfddeedc66d66.1..
        ...166d66cde4ddfdfdfdfdfdfde4dc66d661...
        ....66d66cde4dddddddddddddde4dc66d66....
        ..1.66d66cde4ddabbbbbbbb6dde4dc66d66.1..
        ...166d66cdeedab66666666b6deedc66d661...
        ....66d66cde4dab66666666b6de4dc66d66....
        ..1.66d66cde4dab6ff66ff6b6de4dc66d66.1..
        ....66d66cde4dab6ff66ff6b6de4dc66d66....
        ...166d66cdeedabbffbbffbb6deedc66d661...
        ..1.66d66cde4dabbffbbffbb6de4dc66d66.1..
        .1.166d66cde4dabbffbbffbb6de4dc66d661.1.
        ..1.66d66cde4dabb22bb22bb6de4dc66d66.1..
        .1.166d66cdeedabbbbbbbbbb6deedc66d661.1.
        ..1.66d66cde4dab88888888b6de4dc66d66.1..
        .1.166d66cde4ddabbbbbbbb6dde4dc66d661.1.
        ..1.66d66cde4dddddddddddddde4dc66d66.1..
        .1.166d66cdeeddbddabb6ddbddeedc66d661.1.
        1.1.66d66cde4ddbddbffbddbdde4dc66d66.1.1
        .1.166d66cde4ddbddbffbddbdde4dc66d661.1.
        1.1.66d66cde4dddddabb6ddddde4dc66d66.1.1
        .1.1.6d66cddddddddddddddddddddc66d6.1.1.
        1.1.16d66cbdde4dbdabb6dbde4ddbc66d61.1.1
        .1.1.6d66cbddeedbdbffbdbdeeddbc66d6.1.1.
        1.1.166d66cdde4dbdbffbdbde4ddc66d661.1.1
        .1.1.66d66cddeedddabb6dddeeddc66d66.1.1.
        ..1.1.6d66cbde4dddddddddde4dbc66d6.1.1..
        ...1.166d66cddddddddddddddddc66d661.1...
        ....1.66d66cbddbfbdabdbfbddbc66d66.1....
        .....1.6d66cbddddddabddddddbc66d6.1.....
        ....1.166d66cddddddddddddddc66d661.1....
        .....1.66d66cbddddddddddddbc66d66.1.....
        ......1.66d66cdddbdabdbdddc66d66.1......
        ........66d66cbddddabddddbc66d66........
        .......1.66d66cddddddddddc66d66.1.......
        .........66d66cbddddddddbc66d66.........
        ........1.66d66cdddbbdddc66d66.1........
        ..........66d66cbddddddbc66d66..........
        .........1.66d66cddbbddc66d66.1.........
        ...........66dd6cbddddbc66d66...........
        ..........1.66d66cddddc66d66.1..........
        ............66d66cbddbc66d66............
        ...........1.66d66cddc66d66.1...........
        .............66d66cbbc66d66.............
        ............1.66d66cc66d66.1............
        ..............66d66cc66d66..............
        .............1.66d6666d66.1.............
        ...............66d6666d66...............
        ..............1.66d66d66.1..............
        ................66d66d66................
        ...............1.66dd66.1...............
        .................66dd66.................
        ..................6666..................
        ..................6666..................
    `;

    constructor(mov: Movement, level = 1) {
        super(BattleShip.image, mov, 30);
        this.subKind = EnemySubKind.BattleShip
        // this.onUpdateInterval(2000, () => this.shoot());
        this.sprite.z = 1
        const parkingOffset = 28

        let baby: BaseEnemy
        let babyCount=0
        let spawnStep = -6
        if (isRelativeMovement(mov)) {
           spawnStep -= 80/ (mov as RelativeMovement).v / .1
        }
        this.onUpdateInterval(100, () => {
            if (babyCount >= level * 5) {
            } else {
                spawnStep++
                if (spawnStep == -3) {
                    const movBaby = {
                        startX: this.sprite.x, startY: this.sprite.y, vx: this.sprite.vx,
                        vy: this.sprite.vy,
                    }
                    
                    if (isRelativeMovement(mov)) {
                        mov = mov as RelativeMovement
                        switch (mov.direction) {
                            case Direction.UP:
                                movBaby.startY += parkingOffset
                                break
                            case Direction.LEFT:
                                movBaby.startX += parkingOffset
                                break
                            case Direction.DOWN:
                                movBaby.startY -= parkingOffset
                                break
                            case Direction.RIGHT:
                                movBaby.startX -= parkingOffset
                                break
                        }
                    }
                    baby = new CombatHelicopter(movBaby)
                    baby.sprite.scale = 0.5
                } else if (spawnStep == 15) {
                    baby.sprite.vx = Math.randomRange(-10, 10)
                    baby.sprite.vy = Math.randomRange(10, 40)
                    spawnStep = -6
                    babyCount++
                } else if (spawnStep > 0) {
                    baby.sprite.scale = 0.5 + 0.5 / 15 * spawnStep
                }
            }
        });
    }

    private shoot(): void {
        const a = angleBetween(this.sprite, Players.randomPlayer().getSprite());
        const v = vComponents(100, a);
        sprites.createProjectile(BattleShip.projectileImage, v.vx, v.vy, SpriteKind.EnemyProjectile, this.sprite);
    }

    public getScore(): number {
        return 600;
    }
}

class Carrier extends Ship implements Enemy{
    private static readonly image: Image = img`
        ............66666666666666666666666..........
        ..........166ddddddddddddddddddddd661........
        ...........66d66cbbbbbbbbbbbbbc66d66.1.......
        .........1.66d66cdddddddddddddc66d661........
        ..........166d66cd1dddd5dddd1dc66d66.1.......
        .........1.66d66cd1dddd5dddd1dc66d661.1......
        ..........166d66cd1dddd5dddd1dc66d66..1......
        ...........66d66cdddddddddddddc66d66.1.......
        ..........166d66cd1dddd5dddd1dc66d661.1......
        ...........66d66cd1dddd5dddd1dc66d66.1.......
        .........1.66d66cd1dddd5dddd1dc66d661.1......
        ..........166d66cdddddddddddddc66d666..1.....
        .........1.66d66cd1dddd5dddd1dc66d666.1......
        .........1.66d66cd1dddd5dddd1dc66d666.1......
        ..........666d66cd1dddd5dddd1dc666d661.......
        ..........666d66cdddddddddddddc666d66.1......
        ..........66d666cd1dddd5dddd1ddc66d66..1.....
        ........1.66d666cd1dddd5dddd1ddc66d661.......
        ..........66d66cdd1dddd5dddd1ddc66d66.11.....
        ..........66d66cdddddddddddddddc66d66.1.1....
        ........1.66d66cdd1dddd5dddd1ddc66d661.1.....
        .........166d66cdd1dddd5dddd1ddc66d66...1....
        .......1..66d66cdd1dddd5dddd1ddc66d666.1.....
        .........166d66cdddddddddddddddc66d666.1.1...
        ........1.66d66cdd1dddd5dddd1ddc66d6666.1....
        .....1.1.666d66cdd1dddd5dddd1ddc666d6666.1...
        ......1.666d666cdd1dddd5dddd1ddcc66d66661....
        ....1..6666d66cdddddddddddddddddcc66d666.1...
        .....16666d66cdddd1dddd5dddd1ddddc666d666.1..
        ..1.1.6666d66cdddd1dddd5dddd1dddddc666d66.1..
        ...1.6666d66cddddd1dddd5dddd1ddddddc66d661...
        ..1.6666d66cdddddddddddddddddddddddc66d66.1..
        .1.1666d666ddddbdd1dddd5dddd1ddddedc66d661...
        .1.666d666cddddbdd1dddd5dddd1ddddddc66d661.1.
        1.1666d66cdddddbdd1dddd5dddd1ddddedc66d66.1..
        .1666d66cddddddddddddddddddddddddddc66d661.1.
        1.66d666cddd5dddbd1dddd5dddd1ddddedc66d66....
        1.66d66cdddd5dddbd1dddd5dddd1ddddddc66d66.1.1
        .166d66cdddd5dddbd1dddd5dddd1ddddedc66d661.1.
        1.66d66cdddd5ddddddddddddddddddddddc66d66.1.1
        .166d66cdddddddddb1dddd5dddd1ddddddc66d661.1.
        .166d66cbdddd5dddb1dddd5dddd1ddddddc66d661...
        1.66d66cbdddd5dddb1dddd5dddd1ddddddc66d66.1.1
        .166d66cbdddd5dddddddddddddddddbdddc66d661.1.
        1.66d66cbdddd5dddd1dddd5dddd1ddbdbdc66d66.1..
        1.66d66cddddddddddbdddd5dddd1dbbbbdc66d66.1.1
        .166d66cdbdddd5ddd1dddd5dddd1ddbdbdc66d661.1.
        1.66d66cdbdddd5ddddddddddddddddbdddc66d66.1.1
        .166d66cdbdddd5ddd1bddd5dddd1dddbddc66d661.1.
        1.66d66cdddddddddd1bddd5dddd1dddbdbc66d661.1.
        1.66d66cddbdddd5dd1dddd5dddd1ddbbbbc66d66.1..
        .166d66cddbdddd5ddddddddddddddddbdbc66d66.1.1
        1.66d66cddbdddd5dd1dbdd5dddd1dddbddc66d661.1.
        .166d66cddbddddddd1dbdd5dddd1ddddddc66d66.1.1
        .166d66cdddddddddd1dbdd5dddd1ddddddc66d661.1.
        1.66d66cdddbdddd5ddddddddddddddddddc66d66.1..
        .166d66cdddbdddd5d1ddbd5dddd1dddcccc66d66.1.1
        ..66d66cdddbdddd5d1ddbd5dddd1ddccccc66d661.1.
        ..66d66cdddddddddddddbd5dddd1ddcbbcc66d66.1.1
        1.66d66cddddbddddd1ddddddddddddcbbbc66d661.1.
        ..66d66cddddbdddd51dddd5dddd1ddcbbbc66d66.1..
        .166d66cddddbdddd51dddb5dddd1ddcbbbc66d66.1.1
        .166d66cddddbdddddddddb5dddd1ddcbbcc66d661.1.
        1.66d66cdddddddddddddddddddddddccccc66d66.1.1
        ..66d66cdddddbdddd5dddd5dddd1ddccfcc66d661...
        .166d66cdddddbdddd5ddddbdddd1ddccfcc66d66.1.1
        .166d66cdddddbdddd5dddd5dddd1ddccccc66d661.1.
        1.66d66cdddddddddddddddddddddddcbbcc66d66.1..
        ..66d66cddddddbddd15ddd5bddd1ddcbbbc66d66.1.1
        ..66d66cddbdddbddd15ddd5bddd1ddcbbbc66d661.1.
        ..66d66cbbbbbdbddd1dddd5dddd1ddcbbbc66d66.1.1
        .166d66cddbdddbddddd5ddddbdddddcbbcc66d661.1.
        1.66d66cdbbbdddddd1d5dd5dbdd1ddccccc66d66.1..
        ..66d66cdddddddbdd1d5dd5dbdd1ddccccc66d66.1.1
        ..66d66cdddbdddbdd1d5dd5dddd1ddccfcc66d661.1.
        .166d66cdbbbbbdbddddd5ddddbddddccfcc66d66.1.1
        1.66d66cdddbdddddd1dd5d5ddbd1ddccccc66d661.1.
        ..66d66cddbbbdddbd1dd5d5dddd1dddcccc66d66.1..
        .166d66cddddddddbd1dddd5dddd1ddddddc66d661.1.
        .166d66cddddbddddddddddddddddddddddc66d66.1.1
        1.66d66cddbbbbbddd1dddd5dddd1ddddddc66d66.1..
        ..66d66cddddbddddd1dddd5dddd1ddbdddc66d661.1.
        .166d66cdddbbbdddd1dddd5dddd1ddbdbdc66d66.1.1
        .166d66ccdddddddddddddddddddddbbbbdc66d661.1.
        1.66d6666cccdddddd1dddd5dddd1ddbdbdc66d66.1.1
        ..666d66666cdddddd1dddd5dddd1ddbdddc66d66.1..
        ...666d6666cdddddd1dddd5dddd1ddddddc66d661...
        ....666d666cdddddddddddddddddddddddc66d66.1.1
        ...1.666d66cdddddd1dddd5dddd1ddddddc66d661.1.
        .....666d66cbddddd1dddd5dddd1dddddbc66d66.1.1
        ....1.66d66cbddddd1dddd5dddd1dddddbc66d661.1.
        ....1.66d66cbdddddddddddddddddddddbc66d66.1..
        ...1..66d666cddddd1dddd5dddd1dddddc666d66.1.1
        .....166d666cddddd1dddd5dddd1dddddc66d6661.1.
        ....1.66d666cddddd1dddd5dddd1dddddc66d666.1.1
        ....1.66d666cdddddddddddddddddddddc66d66.1.1.
        ......666d66cddddd1dddd5dddd1dddddc66d66..1.1
        .....1666d66cdfddd1dddd5dddd1dddfdc66d661.1..
        ....1.666d66cdfddd1dddd5dddd1dddfdc66d66.1.1.
        ....1..66d66cdfdddddddddddddddddfdc66d66.11.1
        .......66d66cddddd1dddd5dddd1dddddc66d66.1.1.
        .....1.66d66cddddd1dddd5dddd1dddddc66d661.1..
        ....1..66d66cbdddd1dddd5dddd1dddddc66d66.1...
        .......66d66cbdddddddddddddddddddbc6d6661....
        .......66d66cbdddd1dddd5dddd1ddddb66d666.1...
        .....1.666d66cdddd1dddd5dddd1ddddb66d6661....
        ....1.1666d66cdddd1dddd5dddd1ddddc66d666.1...
        .....1.666d66cdddddddddddddddddddc66d6661....
        .....1.666d66cdddddddddddddddddddc66d66.1....
        ........66d66cdddddddddddddddddddc66d66......
        ......1.66d66cdddddddddddffddddddc66d661.....
        .....1..66d66cbbbbbbbbbbbbbbbbbbbc66d66.1....
        .....1..66d66cbbbbbbbbbbbbbbbbbbbc66d66.1....
        ........66d6666666666666666666666666d66......
        ......1.66d6666666666666666666666666d661.....
        ....1...66ddddddddddddddddddddddddddd66.1....
        ....1...6666666666666666666666666666666.1....
        ......1..66666666666666666666666666666.......
        ...........1.1.1.11.........11.1.1.1..1......
        ............1.1.1.............1.1.1..........
        ............1.1.1.............1.1.1..........
        ...........1.1.1.11.........11.1.1.1.........
        ............1.1.1.............1.1.1..........
        ...........1.1.1.11.........11.1.1.1.........
        ...........1.1.1.11.........11.1.1.1.........
        ............1.1.1.............1.1.1..........
    `;
    
    constructor(mov: Movement, level = 1) {
        super(Carrier.image, mov, 100);
        this.subKind = EnemySubKind.Carrier
        this.sprite.setFlag(SpriteFlag.Ghost, true);
        this.sprite.z = 0

        let baby: BaseEnemy
        let babyCount = 0
        let spawnStep = -45 //-50
        const takeoffStep = 15
        
        // this.sprite.onDestroyed(()=>baby.sprite.destroy())
        
        this.onUpdateInterval(100, () => {
            if (babyCount >= level * 5) {
                this.sprite.setFlag(SpriteFlag.Ghost, false);
                this.sprite.setFlag(SpriteFlag.AutoDestroy, true);
                this.sprite.vy = 5
                this.sprite.ay = 15
                this.sprite.fy = 0
            } else {
                spawnStep++
                if (spawnStep == 0) {
                    const mov = {
                        startX: this.sprite.x, startY: (this.sprite.y + this.sprite.bottom) >> 1, vx: this.sprite.vx,
                        vy: -22
                    }
                    if (level == 1)
                        baby = new GreenPlane(mov)
                    else if (level == 2)
                        baby = new RedPlane(mov)
                    else if (level == 3)
                        baby = new GrayPlane(mov)
                    baby.sprite.scale = 0.5
                    baby.sprite.ay = -56
                    baby.sprite.setFlag(SpriteFlag.AutoDestroy, false);
                    baby.sprite.setFlag(SpriteFlag.Ghost, true);
                    const img = baby.sprite.image.clone()
                    img.flipY()
                    baby.sprite.setImage(img)
                } else if (0 < spawnStep && spawnStep < takeoffStep) {
                    baby.sprite.scale = 0.2 + 0.8 / takeoffStep * spawnStep
                } else if (spawnStep == takeoffStep) {
                    const img = baby.sprite.image
                    img.flipY()
                    baby.sprite.setImage(img)
                    baby.sprite.setFlag(SpriteFlag.Ghost, false);
                    baby.sprite.ay = 0
                    baby.sprite.vx = Math.randomRange(-10, 10)
                    baby.sprite.vy = Math.randomRange(20, 40)
                } else if (spawnStep == 25) {
                    babyCount++
                    baby.sprite.setFlag(SpriteFlag.AutoDestroy, true);
                    spawnStep = -1
                }
            }
        });
    }

    public getScore(): number {
        return 1000;
    }
}

class Cloud extends BaseObject implements Element {
    private static readonly cloud1: Image = img`
        . . . . d 1 1 1 . . . . . . . 1 1 1 1 . . d 1 1 1 . . . . . . .
        . . . . 1 1 1 1 1 . . . . . d 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . .
        . . d 1 1 1 1 1 1 1 . 1 1 1 d 1 1 d 1 1 1 1 1 1 1 1 1 1 1 1 . .
        . d 1 1 1 d d 1 1 1 d 1 1 1 1 1 1 1 1 1 1 1 1 d d 1 1 1 1 1 1 .
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d 1 1 d 1 1 1 1 1 .
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 d d d d 1 1 1 1 1 1 1 1 1 1 1 1 1 .
        1 1 1 1 1 1 1 1 1 1 1 1 1 d 1 1 1 1 d 1 1 1 1 1 1 1 1 1 1 1 . .
        1 1 1 1 d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . .
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d 1 1 1 1 1 d 1 1 1 . . .
        . 1 1 1 1 1 1 1 1 d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . .
        . . 1 1 d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . .
        . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d 1 1 1 1 1 1 1 1 1 1 . . . .
        . . . . 1 1 1 1 1 1 1 1 1 1 d 1 1 1 1 1 1 1 . . . . . . . . . .
        . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . . . . . . .
        . . . . . . . . 1 1 1 1 1 1 1 1 1 1 . . . . . . . . . . . . . .
    `;
    private static readonly cloud2: Image = img`
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 . . . . 1 1 1 1 1 d . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 d . . . . .
        . . . . . . . . . . . . d d d . . . . . . . . . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . .
        . . . . . . . . . . 1 1 1 1 1 1 1 . . . . . . . . . d 1 1 1 1 1 1 1 1 1 1 1 1 1 . . 1 1 1 1 1 1 . .
        . . . . . . . . . . 1 1 1 1 1 1 1 . . . . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . .
        . . . . . . . . . . 1 1 1 1 1 1 1 . . 1 1 d . . . . 1 1 1 1 d 1 1 1 1 d . 1 1 1 1 d 1 d 1 1 d 1 1 .
        . . . . . . d . . . . . 1 1 1 1 1 1 1 1 1 1 d . . . 1 1 1 d 1 d 1 1 1 1 . 1 1 1 d 1 1 1 1 . 1 d 1 .
        . . . . . 1 1 1 d . . . 1 1 . . 1 1 1 1 1 1 1 d . . 1 1 1 1 1 1 1 1 1 d . 1 1 1 1 1 1 . . . 1 1 1 .
        . . . . 1 1 1 1 1 1 1 1 1 1 . . 1 1 1 1 1 1 1 1 . . . 1 1 1 1 1 1 1 1 d . 1 1 1 1 1 1 . . 1 1 1 1 .
        . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . 1 1 1 1 1 1 1 1 . . 1 1 1 1 1 1 1 1 1 1 1 1 .
        . . 1 1 1 1 1 1 1 1 d d 1 1 1 1 1 d d d 1 1 1 1 1 . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d 1 d 1 1 1 1 .
        . . 1 1 1 1 d d 1 1 1 1 1 1 1 1 . . . 1 1 1 1 1 1 1 . . . d 1 1 1 1 1 1 1 . . 1 d 1 1 1 1 1 1 1 1 .
        . . 1 1 1 . . 1 1 1 1 1 1 1 1 . . . . 1 1 1 1 1 1 1 d . . . 1 1 1 1 1 1 . . . 1 1 1 1 1 1 1 d 1 1 .
        . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . 1 1 1 1 1 1 1 1 d . . . d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . .
        . . 1 1 1 1 1 1 1 d 1 1 1 d d 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . 1 1 1 d . . . . . . . . . . . . .
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . 1 1 1 d d d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . 1 1 1 1 1 1 1 1 1 . . 1 1 1 1 1 1 1 1 1 d . . . . . 1 d d d . . . . . . . . . . . . . . . . . . .
        . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d d 1 1 1 . . . . 1 1 1 1 1 1 1 1 1 1 1 d . . . . . . . . . . . . .
        . . . . . 1 1 1 1 1 1 1 . . . 1 1 1 1 1 1 . . . . 1 1 1 1 1 d 1 1 1 1 1 1 1 . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . 1 1 1 1 . . . . 1 1 1 1 1 . . d 1 1 1 1 1 1 d . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . 1 1 d 1 1 1 1 1 1 1 1 1 1 1 1 1 d . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . d 1 1 1 1 1 1 1 1 1 1 . . d 1 1 1 1 . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 d . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 1 1 1 1 1 1 1 1 1 d 1 1 1 d . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 1 1 1 1 . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    `;

    constructor(mov: Movement, cloud: number) {
        super(cloud === 1 ? Cloud.cloud1 : Cloud.cloud2, mov);
        this.sprite.setFlag(SpriteFlag.Ghost, true);
        this.sprite.z = cloudZ;
    }
}

class Island extends BaseObject implements Element {
    private static readonly island: Image = img`
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . d d d d d d d d d d d d . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d . . . . . . . . . . . . . . . . . . . . . .
        . . . . d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d . . . . . . . . . . . . . . . . . . .
        . . . d d d d d d d 7 7 7 7 7 7 7 7 7 d d d d d d d d d d d d d d d d d d d d d d d d d d d d . . . . . . . . . . . . . . . . .
        . . . d d d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d d d d d d d d d d d . . . . . . . . . . . . . . .
        . . d d d d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d d d d d d d d d . . . . . . . . . . . . . .
        . . d d d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 e 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d d d d d d . . . . . . . . . . . . .
        . d d d d d 7 7 7 7 7 7 7 e 7 6 7 7 7 6 7 5 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d d d . . . . . . . . . . . . .
        . d d d d 7 7 7 7 7 6 7 7 7 7 7 7 7 7 7 6 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 e 7 7 7 7 7 7 7 7 7 7 7 d d d d d . . . . . . . . . . .
        . d d d d d 7 7 7 7 7 7 7 7 7 7 6 7 7 7 7 7 7 7 7 8 7 7 7 6 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d . . . . . . . . . .
        . d d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 2 6 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d . . . . . . . . .
        . d d d d 7 7 7 7 7 6 7 7 7 e 7 7 7 6 7 e 6 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 e 7 7 7 7 e 7 7 7 7 7 7 d d d d d . . . . . . . .
        . d d d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 6 7 7 7 8 7 7 7 6 6 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 e 7 7 7 d d d d . . . . . . . .
        . . d d d d 7 7 7 7 7 7 6 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 e 7 7 7 7 7 7 7 6 7 7 7 7 7 7 7 7 7 7 d d d d . . . . . . .
        . . d d d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 6 7 2 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 6 7 7 6 7 7 7 7 7 7 7 7 7 d d d . . . . . . .
        . . d d d d d 7 7 6 7 7 7 7 7 7 7 7 7 6 7 7 7 7 7 7 7 e 7 7 7 7 7 7 7 8 7 7 7 7 7 7 7 7 7 8 7 7 7 8 7 7 7 7 7 d d d . . . . . .
        . . d d d d d 7 7 7 7 7 6 7 7 7 6 7 7 7 7 7 7 7 7 7 7 7 7 7 6 7 7 7 7 7 7 7 e 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d . . . . .
        . . . d d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 5 7 7 6 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d d . . . .
        . . . d d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 7 8 7 7 d d d d d d . . .
        . . . . d d d d 7 7 7 7 e 7 7 7 7 7 7 7 7 7 7 7 7 6 7 7 7 7 7 7 7 7 7 7 6 7 7 7 7 7 7 7 7 7 7 7 2 7 7 e 7 7 7 d d d d d d . . .
        . . . . . d d d 7 7 7 7 7 7 7 7 2 7 7 e 7 7 7 7 7 7 7 7 7 7 7 2 7 7 7 7 7 7 7 7 7 6 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d d d . . .
        . . . . . d d d 7 7 7 7 7 6 7 7 7 7 7 7 7 7 7 7 7 7 7 e 7 7 7 7 7 7 2 7 7 7 7 e 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d d d . . .
        . . . . . d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 6 7 6 7 7 7 7 7 7 7 7 7 7 7 e 7 7 7 7 7 7 7 7 d d d d d d . . .
        . . . . . d d d d 7 7 7 7 7 7 7 7 7 7 8 7 7 7 e 7 7 7 7 7 7 7 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 5 7 d d d d d d . . .
        . . . . . d d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 2 7 7 7 e 7 7 7 7 7 7 7 6 7 7 7 7 d d d d d d . . .
        . . . . . d d d d 7 7 7 7 7 7 7 7 6 7 7 7 7 7 7 7 7 7 7 7 7 6 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d d . . .
        . . . . . d d d d 7 7 7 7 7 7 e 7 7 7 7 7 7 7 7 7 6 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 e 7 7 7 7 7 7 7 e 7 7 7 d d d d d . . .
        . . . . . d d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 e 7 7 7 7 6 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d . . . .
        . . . . . d d d d 7 7 7 6 7 7 7 7 7 7 7 7 e 7 7 7 7 7 6 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 7 d d d d . . . .
        . . . . . d d d d 7 7 7 7 7 7 7 7 6 7 7 7 7 7 7 7 7 7 7 7 7 7 2 7 7 7 7 7 7 8 7 7 7 7 7 7 7 7 7 7 7 7 7 e 7 7 7 d d d d . . . .
        . . . . . d d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 7 e 7 7 7 7 7 7 7 7 7 7 e 7 7 7 7 7 7 7 7 7 7 d d d d d . . . .
        . . . . . . d d d 7 7 7 7 7 7 7 7 7 7 7 2 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 6 7 7 7 7 7 7 7 7 7 7 6 7 7 7 7 7 d d d d d . . . .
        . . . . . . d d d d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 e 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 2 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d d . . . .
        . . . . . . d d d d d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 e 7 7 7 7 7 7 7 6 7 7 7 7 7 e 7 7 7 7 7 7 7 7 7 7 d d d d . . . . .
        . . . . . . . d d d d d d d 7 7 7 7 7 7 7 6 6 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 7 7 7 7 7 7 7 7 8 7 7 7 7 7 7 d d d d . . . . .
        . . . . . . . d d d d d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 6 7 7 7 7 d d d d d . . . . .
        . . . . . . . . . d d d d d d d d d 7 7 7 7 7 7 7 7 7 7 7 6 7 7 7 7 7 7 e 7 7 7 6 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d d . . . . .
        . . . . . . . . . . . d d d d d d d d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d d . . . . .
        . . . . . . . . . . . . . d d d d d d d d d d 7 7 7 7 7 7 7 7 e 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d 7 7 d d d d d d . . . . .
        . . . . . . . . . . . . . . . . . . d d d d d d d d 7 7 7 7 7 7 7 7 7 7 7 7 7 7 d d d d d d d d d d d d d d d d d d . . . . . .
        . . . . . . . . . . . . . . . . . . . d d d d d d d d d d 7 7 7 7 7 7 7 d d d d d d d d d d d d d d d d d d d d d d . . . . . .
        . . . . . . . . . . . . . . . . . . . . . d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d d . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . d d d d d d d d d d d d d d d d d . . . . . . . d d d d d d d d d d d . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . d d d d d d d d d d d . . . . . . . . . . . . . d d d d d d d d . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . d d d d d d . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . d d . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    `;

    private static islandImg(island: number) {
        switch (island) {
            case 1: return Island.island;
            case 2: return rotate(Island.island, Direction.LEFT);
            case 3: return rotate(Island.island, Direction.RIGHT);
            case 4: return rotate(Island.island, Direction.UP);
            default: return Island.island;
        }
    }

    constructor(mov: Movement, island: number) {
        super(Island.islandImg(island), mov);
        this.sprite.setFlag(SpriteFlag.Ghost, true);
    }
}

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (projectile, enemiesprite) {
    const enemy: Enemy = SpriteWrapper.fromSprite(enemiesprite) as Enemy;
    if (enemy) {
        enemy.gotHitBy(projectile);
    }
})

let elementTypes = [ // :{ color: number, create: (mov: Movement) => void }[]
    [
        Enemies.redPlane,
        Enemies.greenPlane,
        Enemies.grayPlane,
        Enemies.bigPlane,
        Enemies.bomberPlane,
        Enemies.combatHelicopter,
        Enemies.frigate,
    ], [
        Elements.cloud1,
        Elements.cloud2,
        Enemies.tank,
        Elements.island1,
        Elements.island2,
        Elements.island3,
        Elements.island4,
        Enemies.battleShip,
        Enemies.antiAircraftTower,
    ]]
