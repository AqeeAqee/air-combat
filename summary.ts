
namespace summary {
    // game.showLongText("test content", DialogLayout.Bottom)
    // game.splash("test","content")

    /*
SubKinds:
    RedPlane.prototype,
    GreenPlane,
    GrayPlane,
    BigPlane,
    BomberPlane,
    CombatHelicopter,
    Frigate,
    BattleShip,
    Tank,
    AntiAircraftTower,
    AntiAircraftMissile
    */

    let enemyKillList: number[][] = []  // [[subKind, score, countByPlayer1, countByPlayer2], ...]
    let enemyIcons: Image[] = []
    const imgStar = img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . b . . . . . . .
        . . . . . . . b d b . . . . . .
        . . . . . . b 5 5 5 b . . . . .
        . . . . . b b 5 5 5 b b . . . .
        . . b b b b 5 5 5 1 1 b b b b .
        . . b 5 5 5 5 5 5 1 1 5 5 5 b .
        . . b d d 5 5 5 5 5 5 5 d d b .
        . . . b d d 5 5 5 5 5 d d b . .
        . . . c b 5 5 5 5 5 5 5 b c . .
        . . . c b 5 5 5 5 5 5 5 b c . .
        . . . c 5 5 d d b d d 5 5 c . .
        . . . c 5 d d c c c d d 5 c . .
        . . . c c c c . . . c c c c . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `
    export function destroiedEnemy(enemy: BaseEnemy, by: Sprite) {
        let playerNo = by.data["player"]
        if (!playerNo) return
        let item = enemyKillList.find((v) => v[0] == enemy.subKind)
        if (!item) {
            enemyKillList.push([enemy.subKind, enemy.getScore(), 0, 0])
            item = enemyKillList[enemyKillList.length - 1]

            const icon = image.create(12, 12)
            // icon.fill(1)
            enemyIcons.push(icon)
            const img = enemy.sprite.image
            if (img)
                icon.blit(0, 0, 12, 12, img, 0, 0, img.width, img.height, true, false)
        }
        item[(playerNo as number) + 1] += 1
    }

    function lPadding(s: string, length: number): string {
        while (s.length < length)
            s = " " + s
        return s
    }

    function rPadding(s: string, length: number): string {
        while (s.length < length)
            s += " "
        return s
    }
 
    export function show() {
        const imgHeader = image.create(140, 13)
        const imgItems = image.create(140, enemyKillList.length * 13)
        const imgFooter = image.create(140, 12)
        const fontColor = 15

        const iCharsScore = 7
        const iCharCount = 6
        //draw score board
        {
            let img: Image
            let xPadding = 0, y = 0

            //header: title
            // img.fillRect(xPadding,0,160-xPadding*2,18,0)
            img = imgHeader
            img.print(lPadding("Scores", iCharsScore) + lPadding("P1", iCharCount) + lPadding("P2", iCharCount), xPadding, 0, 4)
            img.drawLine(10, 10, img.width - 20, 10, 4)
            y += 16

            y = 0
            img = imgItems
            //items
            enemyKillList.forEach((item, i) => {
                img.drawTransparentImage(enemyIcons[i], xPadding + 5, y - 1)
                let s = lPadding(item[1].toString(), iCharsScore) + lPadding("x" + item[2], iCharCount) + lPadding("x" + item[3], iCharCount)
                img.print(s, xPadding, y + 1, fontColor)
                y += 13
            })

            //footer: total
            y = 0
            img = imgFooter
            img.drawLine(10, y, img.width - 20, y, 4)
            y += 4
            let total = enemyKillList.reduce((p, c, i) => {
                p[0] += c[1] * c[2]
                p[1] += c[1] * c[3]
                return p
            }, [0, 0])
            img.print(lPadding(total[0] + "", iCharsScore + iCharCount) + lPadding(total[1] + "", iCharCount), xPadding, y, fontColor)

            //star
            y = 0
            img = imgHeader
            if (total[0] != total[1])
                music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
            if (total[0] != total[1]) {
                img.drawTransparentImage(imgStar, xPadding + (iCharsScore + iCharCount + (total[0] > total[1] ? 0 : iCharCount)) * 6 - 28, -1)
            }

            game.setDialogFrame(sprites.dialog.largeStar)
            game.showImageDialog(DialogLayout.Full, imgItems, imgHeader, imgFooter)
        }
    }

    export function clear() {
        enemyKillList = []
        enemyIcons = []
    }

    //for test
    enemyKillList.push([EnemySubKind.RedPlane, 150, 1, 12])
    enemyKillList.push([EnemySubKind.GreenPlane, 150, 11, 12])
    enemyKillList.push([EnemySubKind.GrayPlane, 150, 11, 12])
    enemyKillList.push([EnemySubKind.BigPlane, 150, 11, 12])
    enemyKillList.push([EnemySubKind.BomberPlane, 150, 11, 12])
    enemyKillList.push([EnemySubKind.CombatHelicopter, 150, 11, 12])
    enemyKillList.push([EnemySubKind.Frigate, 150, 11, 12])
    enemyKillList.push([EnemySubKind.BattleShip, 150, 11, 1])
    enemyKillList.push([EnemySubKind.Tank, 150, 1, 12])
    enemyKillList.push([EnemySubKind.AntiAircraftTower, 150, 11, 123])
    enemyKillList.push([EnemySubKind.AntiAircraftMissile, 150, 111, 134])
    for (let i = 0; i < 11; i++) {
        const icon = image.create(12, 12)
        enemyIcons.push(helpers.getImageByName("iconPlane"))
        icon.fill(13)
        icon.print(i.toString(), 0, 0, 2)
    }
    // scene.setBackgroundImage(sprites.background.cityscape)
    // show()
    clear()
    /*
    */
}