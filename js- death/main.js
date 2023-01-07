const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576
c.fillRect(0,0,canvas.width,canvas.height)
const gravity = 0.7

const background = new Sprite({
    position:{x:0,y:0},
    imageSrc:'./img/background.png'
})

const shop = new Sprite({
    position:{x:600,y:128},
    imageSrc:'./img/shop.png',
    scale:2.75,
    framesMax:6,
})


const player = new Fighter({
    position:{x:0,y:0},
    velocity:{x:0,y:10},
    color:'red',
    imageSrc:'./img/samuraiMack/Idle.png',
    framesMax:8,
    scale:2.5,
    offset:{x:215,y:157},
    sprites:{
        idle:{
            imageSrc:'./img/samuraiMack/Idle.png',
            framesMax:8,
        },
        run:{
            imageSrc:'./img/samuraiMack/Run.png',
            framesMax:8,
        },
        jump:{
            imageSrc:'./img/samuraiMack/Jump.png',
            framesMax:2,
        },
        fall:{
            imageSrc:'./img/samuraiMack/Fall.png',
            framesMax:2,
        },
        attack1:{
            imageSrc:'./img/samuraiMack/Attack1.png',
            framesMax:6,
        },
        takeHit:{
            imageSrc:'./img/samuraiMack/Take Hit - white silhouette.png',
            framesMax:4,
        },
    },
    attackBox:{
        offset:{x:100,y:50},
        width:160,
        height:50,
    }
})

const enemy = new Fighter({
    position:{x:400,y:100},
    velocity:{x:0,y:0},
    color:'blue',
    imageSrc:'./img/kenji/Idle.png',
    framesMax:4,
    scale:2.5,
    offset:{x:215,y:167},
    sprites:{
        idle:{
            imageSrc:'./img/kenji/Idle.png',
            framesMax:4,
        },
        run:{
            imageSrc:'./img/kenji/Run.png',
            framesMax:8,
        },
        jump:{
            imageSrc:'./img/kenji/Jump.png',
            framesMax:2,
        },
        fall:{
            imageSrc:'./img/kenji/Fall.png',
            framesMax:2,
        },
        attack1:{
            imageSrc:'./img/kenji/Attack1.png',
            framesMax:4,
        },
        takeHit:{
            imageSrc:'./img/kenji/Take hit.png',
            framesMax:3,
        },
    },
    attackBox:{
        offset:{x:-180,y:50},
        width:160,
        height:50,
    }
})

const keys = {
    a:{pressed:false},
    d:{pressed:false},
    ArrowLeft:{pressed:false},
    ArrowRight:{pressed:false},
}


function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
    background.update()
    shop.update()
    player.update()
    enemy.update()

    player.velocity.x = 0   //default velcolity 
    //player movement
    if(keys.a.pressed && player.lastkey === 'a'){
        player.velocity.x = -5
        player.switchSprite('run')
    }else if(keys.d.pressed && player.lastkey === 'd'){
        player.velocity.x = 5
        player.switchSprite('run')
    }else{
        player.switchSprite('idle') //default animation ie idle
    }
    //player jumping
    if(player.velocity.y < 0){
        player.switchSprite('jump')
    }else if(player.velocity.y > 0){
        player.switchSprite('fall')
    }
    
    enemy.velocity.x = 0   //default velcolity 
    //enemey movement
    if(keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft'){
        enemy.velocity.x = -5
        enemy.switchSprite('run')
    }else if(keys.ArrowRight.pressed && enemy.lastkey === 'ArrowRight'){
        enemy.velocity.x = 5
        enemy.switchSprite('run')
    }else{
        enemy.switchSprite('idle') //default animation ie idle
    }
    //enemy jumping
    if(enemy.velocity.y < 0){
        enemy.switchSprite('jump')
    }else if(enemy.velocity.y > 0){
        enemy.switchSprite('fall')
    }

    // player attack collosion (4 frame)
    if(rectungularCollision({rect1:player,rect2:enemy}) && player.isAttacking && player.frameCurrent === 4){
        player.isAttacking=false
        enemy.health -= 20
        enemy.switchSprite('takeHit') //hit amimation
        document.querySelector('#enemyHealth').style.width = enemy.health + "%"
    }

    if(player.isAttacking && player.frameCurrent === 4){
        player.isAttacking=false
    }
    

    // enemey attack collosion (4 frame)
    if(rectungularCollision({rect1:enemy,rect2:player}) && enemy.isAttacking && enemy.frameCurrent === 2){
        enemy.isAttacking=false
        player.health -= 20
        player.switchSprite('takeHit') //hit amimation
        document.querySelector('#playerHealth').style.width = player.health + "%"
    }
    if(enemy.isAttacking && enemy.frameCurrent === 2){
        enemy.isAttacking=false
    }

    //end game based on health
    if(enemy.health <=0 || player.health <=0){
        determineWinner({player,enemy,timerId})
    }
}

animate()
decreaseTimer()


window.addEventListener('keydown',(event)=>{
    switch(event.key){
        case 'd':
            keys.d.pressed = true;
            player.lastkey = 'd';
            break;
        case 'a':
            keys.a.pressed = true;
            player.lastkey = 'a';
            break;
        case 'w':
            player.velocity.y = -20
            break;
        case ' ':
            player.attack()
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastkey = "ArrowRight"
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastkey = "ArrowLeft"
            break;
        case 'ArrowUp':
            enemy.velocity.y = -20
            break;
        case 'ArrowDown':
            enemy.attack()
            break;
        
    }
})

window.addEventListener('keyup',(event)=>{
    switch(event.key){
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }
})