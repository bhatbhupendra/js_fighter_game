function rectungularCollision({rect1,rect2}){
    return (rect1.attackbox.position.x + rect1.attackbox.width >= rect2.position.x 
        && rect1.attackbox.position.x <= rect2.position.x + rect2.width 
        && rect1.attackbox.position.y + rect1.attackbox.height >= rect2.position.y
        && rect1.attackbox.position.y <= rect2.position.y + rect2.height)
}
function determineWinner({player,enemy,timerId}){
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex'
    if(player.health === enemy.health){
        document.querySelector('#displayText').innerHTML = 'Tie'
    }else if(player.health>enemy.health){
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
    }else if(player.health<enemy.health){
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins'
    }
}

let timer = 60
let timerId
function decreaseTimer(){
    if(timer>0){
        timerId = setTimeout(decreaseTimer,1000)
        timer--
        document.querySelector('#timer').innerHTML=timer
    }
    // if time is out who win condition 
    if(timer === 0){
        determineWinner({player,enemy,timerId})
    }
}