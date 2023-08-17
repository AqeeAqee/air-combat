
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
    export function show() {
        controller._setUserEventsEnabled(false);
        game.pushScene();
        game.currentScene().flags |= scene.Flag.SeeThrough;
        scene.setBackgroundImage(null); // GC it
        let done = false

        let maxScollY= 32+ enemyKillList.length*10 -120
        let scrollY=0

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
            for(let item of enemyKillList){
                screen.print((item[0]-1000)+ " "+ item[1] +" x "+ item[2]+"       "+item[3], x,y)
                y+=10
            }
            y+=2
            screen.drawLine(20, y, 140, y, 4)
            y+=4
            let total= enemyKillList.reduce((p, c, i)=>{
                console.log(p.join())
                p[0]+=c[1]*c[2]
                p[1]+=c[1]*c[3]
                return p
            }, [0,0])
            screen.print("          ".substr(0, 11 - total[0].toString().length) + total[0] + "        ".substr(0, 9 - total[1].toString().length) + total[1], x, y)

            
            screen.fillRect(0,0,160,18,0)
            screen.printCenter("Scores    P1      P2", 6, 4)
            screen.drawLine(20, 16, 140, 16, 4)
            if (scrollY == maxScollY - 1 && total[0] != total[1])  //once
                music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
            if (scrollY == maxScollY && total[0] != total[1]){ //always
                screen.drawTransparentImage(imgStar, (total[0] > total[1]) ? 89 : 112, 3)
            }


        })

        controller.A.onEvent(SYSTEM_KEY_UP, () => {
            done = true
        })

        pauseUntil(()=>done)
        controller._setUserEventsEnabled(true);
        game.popScene();

    }

    export function destroiedEnemy(enemy: BaseEnemy, by: Sprite) {
        console.log(typeof (enemy))
        console.log(typeof (enemy).getScore())
        let playerNo= by.data["player"]
        if(!playerNo) return
        let item = enemyKillList.find((v) => v[0] == enemy.subKind)
        if(!item){
            enemyKillList.push([enemy.subKind, enemy.getScore(), 0, 0])
            item=enemyKillList[enemyKillList.length-1]
        }
        item[(playerNo as number)+1] += 1
    }

    export function clear() {
        enemyKillList=[]
    }

    //for test
    enemyKillList.push([EnemySubKind.RedPlane, 150, 111, 12])
    enemyKillList.push([EnemySubKind.GreenPlane, 150, 11, 12])
    enemyKillList.push([EnemySubKind.GrayPlane, 150, 11, 12])
    enemyKillList.push([EnemySubKind.BigPlane, 150, 11, 12])
    enemyKillList.push([EnemySubKind.BomberPlane, 150, 11, 12])
    enemyKillList.push([EnemySubKind.CombatHelicopter, 150, 11, 12])
    enemyKillList.push([EnemySubKind.Frigate, 150, 11, 12])
    enemyKillList.push([EnemySubKind.BattleShip, 150, 11, 12])
    enemyKillList.push([EnemySubKind.Tank, 150, 11, 12])
    enemyKillList.push([EnemySubKind.AntiAircraftTower, 150, 11, 12])
    enemyKillList.push([EnemySubKind.AntiAircraftMissile, 150, 11, 12])
    show()
    clear()
}