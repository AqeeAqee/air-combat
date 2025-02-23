
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

        let playerNo:number
        if(enemy.hitsByPlayer[0]>enemy.hitsByPlayer[1]) playerNo=1
        else if (enemy.hitsByPlayer[0] < enemy.hitsByPlayer[1]) playerNo = 2
        else {
            playerNo= by.data["player"]
            if (!playerNo) return
        }
        //debug
        // if (by.data["player"] != playerNo)
        //     console.log([by.data["player"],enemy.hitsByPlayer[0],enemy.hitsByPlayer[1],playerNo].join())
        
        let item = enemyKillList.find((v) => v[0] == enemy.subKind)
        if (!item) {
            enemyKillList.push([enemy.subKind, enemy.getScore(), 0, 0])
            item = enemyKillList[enemyKillList.length - 1]
            enemyIcons.push(enemy.icon)
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
        const iCharsScore = 8
        const iCharsCount = 6
        const W= (iCharsScore+iCharsCount*2)*6 +8
        const imgHeader = image.create(W, 13)
        const imgItems = image.create(W, enemyKillList.length * 13)
        const imgFooter = image.create(W, 12)
        const fontColor = 15

        //draw score board
        {
            let xPadding = 0

            //header: title
            // img.fillRect(xPadding,0,160-xPadding*2,18,0)
            imgHeader.print(lPadding("Scores", iCharsScore) + lPadding("P1", iCharsCount) + lPadding("P2", iCharsCount), xPadding, 0, 4)
            imgHeader.drawLine(10, 10, imgHeader.width - 10, 10, 4)

            //items
            const total = [0, 0]
            let y = 0
            enemyKillList.forEach((item, i) => {
                imgItems.drawTransparentImage(enemyIcons[i], xPadding + 5, y)
                let s = lPadding(item[1].toString(), iCharsScore) + lPadding("x" + item[2], iCharsCount) + lPadding("x" + item[3], iCharsCount)
                imgItems.print(s, xPadding, y + 1, fontColor)
                total[0] += item[1] * item[2]
                total[1] += item[1] * item[3]
                y += 13
            })

            //footer: total
            imgFooter.drawLine(10, 2, imgFooter.width - 10, 2, 4)
            imgFooter.print(lPadding(total[0] + "", iCharsScore + iCharsCount) + lPadding(total[1] + "", iCharsCount), xPadding, 4, fontColor)

            //star
            if (total[0] != total[1])
                music.playSound(' a5:1 c6:1 e6:3')
            if (total[0] != total[1]) {
                imgHeader.drawTransparentImage(imgStar, xPadding + (iCharsScore + iCharsCount + (total[0] > total[1] ? 0 : iCharsCount)) * 6 - 28, -1)
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
    // scene.setBackgroundImage(sprites.background.cityscape)
    // show()
    clear()
    /*
    */
}