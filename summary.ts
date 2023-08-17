
namespace summary {

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
    let enemyIcons:Image[]=[]
    const imgStar= img`
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
        let playerNo= by.data["player"]
        if(!playerNo) return
        let item = enemyKillList.find((v) => v[0] == enemy.subKind)
        if(!item){
            enemyKillList.push([enemy.subKind, enemy.getScore(), 0, 0])
            item=enemyKillList[enemyKillList.length-1]

            const icon= image.create(12,12)
            // icon.fill(1)
            enemyIcons.push(icon)
            const img = enemy.sprite.image
            if(img)
                icon.blit(0, 0, 12, 12, img, 0,0,img.width, img.height, true, false)
        }
        item[(playerNo as number)+1] += 1
    }

    function lPadding(s:string, length:number):string{
        while(s.length<length)
            s=" "+s
        return s
    }

    function rPadding(s:string, length:number):string{
        while(s.length<length)
            s+=" "
        return s
    }

    export function show() {
        controller._setUserEventsEnabled(false);
        game.pushScene();
        game.currentScene().flags |= scene.Flag.SeeThrough;
        scene.setBackgroundImage(null); // GC it
        let done = false

        let maxScollY= 32+ enemyKillList.length*13 -120
        let scrollY=0

        const iCharsScore=6
        const iCharCount=7
        //draw to screen, to save memory
        game.onShade(()=>{
            screen.fill(0)
            
            scrollY += .5
            if (controller.B.isPressed() && scrollY < maxScollY - 3) { //avoid playing sound be skipped
                scrollY += 2
            }
            if (scrollY > maxScollY)
                scrollY = maxScollY

            let x=16, y=2 - scrollY
            y+=10
            y+=3
            //items
            enemyKillList.forEach((item,i)=>{
                screen.drawTransparentImage(enemyIcons[i], 12, y)
                let s = lPadding(item[1].toString(), iCharsScore) + lPadding("x" + item[2], iCharCount) + lPadding("x" + item[3], iCharCount)
                screen.print(s, x,y)
                y+=13
            })
            y+=2
            screen.drawLine(20, y, 140, y, 4)
            y+=4

            //total
            let total= enemyKillList.reduce((p, c, i)=>{
                console.log(p.join())
                p[0]+=c[1]*c[2]
                p[1]+=c[1]*c[3]
                return p
            }, [0,0])
            screen.print(lPadding(total[0] + "", iCharsScore+iCharCount) + lPadding(total[1] + "", iCharCount), x, y)
            
            //title
            screen.fillRect(0,0,160,18,0)
            screen.print(rPadding("Scores",iCharsScore)+lPadding("P1",iCharCount)+lPadding("P2",iCharCount), x, 6, 4)
            screen.drawLine(20, 16, 140, 16, 4)

            //star
            if (scrollY == maxScollY - 1 && total[0] != total[1])  //once
                music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
            if (scrollY == maxScollY && total[0] != total[1]){ //always
                screen.drawTransparentImage(imgStar, x+(iCharsScore+iCharCount+ (total[0] > total[1] ? 0 : iCharCount))*6-28, 4)
            }


        })

        controller.A.onEvent(SYSTEM_KEY_UP, () => {
            done = true
        })

        pauseUntil(()=>done)
        controller._setUserEventsEnabled(true);
        game.popScene();

    }

    export function clear() {
        enemyKillList=[]
        enemyIcons=[]
    }

    //for test
    /*
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
    enemyKillList.push([EnemySubKind.AntiAircraftMissile, 150, 111, 1234])
    for(let i=0;i<11;i++){
        const icon = image.create(12, 12)
        enemyIcons.push(icon)
        icon.fill(1)
        icon.print(i.toString(),0,0,2)
    }
    show()
    clear()
    */
}