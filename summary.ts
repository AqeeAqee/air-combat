
namespace summary {
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

        const iCharsScore = 8
        const iCharCount = 6
        //draw score board
        {
            let xPadding = 0

            //header: title
            // img.fillRect(xPadding,0,160-xPadding*2,18,0)
            imgHeader.print(lPadding("Scores", iCharsScore) + lPadding("P1", iCharCount) + lPadding("P2", iCharCount), xPadding, 0, 4)
            imgHeader.drawLine(10, 10, imgHeader.width - 20, 10, 4)

            //items
            const total = [0, 0]
            let y = 0
            enemyKillList.forEach((item, i) => {
                imgItems.drawTransparentImage(enemyIcons[i], xPadding + 5, y - 1)
                let s = lPadding(item[1].toString(), iCharsScore) + lPadding("x" + item[2], iCharCount) + lPadding("x" + item[3], iCharCount)
                imgItems.print(s, xPadding, y + 1, fontColor)
                total[0] += item[1] * item[2]
                total[1] += item[1] * item[3]
                y += 13
            })

            //footer: total
            imgFooter.drawLine(10, 0, imgFooter.width - 20, 0, 4)
            imgFooter.print(lPadding(total[0] + "", iCharsScore + iCharCount) + lPadding(total[1] + "", iCharCount), xPadding, 4, fontColor)

            //star
            if (total[0] != total[1])
                music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
            if (total[0] != total[1]) {
                imgHeader.drawTransparentImage(imgStar, xPadding + (iCharsScore + iCharCount + (total[0] > total[1] ? 0 : iCharCount)) * 6 - 28, -1)
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
    const iconPlane =
        img`. . . . . . . . . . . . 
            . . . . . . . . . . . . 
            . . f 2 c . . . . c 4 . 
            . . c 4 4 2 2 c c 4 2 . 
            . 9 9 2 2 2 2 2 2 2 f . 
            2 2 1 1 9 2 2 c c c c 2 
            2 2 2 2 2 2 2 2 2 c f f 
            . f 2 2 2 c f 4 2 2 . . 
            . . . . f c f f 2 2 c . 
            . . . . . c 2 f f . . . 
            . . . . . . . . . . . . 
            . . . . . . . . . . . . 
            `
    for (let i = 0; i < 11; i++) {
        enemyKillList.push([
            Math.pickRandom(EnemySubKind.enemySubKinds),
            Math.randomRange(1, 20) * 50,
            Math.randomRange(0, 15),
            Math.randomRange(0, 15)])
        enemyIcons.push(iconPlane.clone())
        enemyIcons[i].replace(2, Math.randomRange(3, 15))
    }
    scene.setBackgroundImage(sprites.background.cityscape)
    // show()
    clear()
    /*
    */
}