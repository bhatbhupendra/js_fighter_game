class Sprite{
    constructor({position,imageSrc,scale = 1,framesMax = 1}){
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.frameCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
    }
    draw(){
        c.drawImage(
            this.image,

            this.frameCurrent * (this.image.width/this.framesMax),
            0,
            this.image.width/this.framesMax,
            this.image.height,

            this.position.x,
            this.position.y,
            (this.image.width/this.framesMax)*this.scale,
            this.image.height*this.scale
        )
    }
    update(){
        this.draw()
        this.framesElapsed++
        if(this.framesElapsed % this.framesHold === 0){
            if(this.frameCurrent < this.framesMax-1){
                this.frameCurrent++
            }else{
                this.frameCurrent = 0
            }
        }
    }
}

class Fighter{
    constructor({position,velocity,color,offset}){
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastkey
        this.health = 100
        this.attackbox = {
            position:{x:this.position.x,y:this.position.y},
            offset:offset,//or offset only cze same name
            width:100,
            height:50,
        }
        this.color = color
        this.isAttacking
    }
    draw(){
        c.fillStyle = this.color
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
        //attack box
        if(this.isAttacking){
            c.fillStyle = 'green'
            c.fillRect(this.attackbox.position.x,this.attackbox.position.y,this.attackbox.width,this.attackbox.height)
        }
    }
    attack(){
        this.isAttacking = true
        setTimeout(()=>{
            this.isAttacking = false
        },100)
    }
    update(){
        this.draw()
        // update the attack box x,y position
        this.attackbox.position.x = this.position.x + this.attackbox.offset.x
        this.attackbox.position.y = this.position.y
        //end

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.position.y + this.height + this.velocity.y >= canvas.height-95){
            this.velocity.y = 0
        }else{
            this.velocity.y += gravity
        }
    }
}