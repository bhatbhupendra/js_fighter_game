class Sprite{
    constructor({position,imageSrc,scale = 1,framesMax = 1,offset = {x:0,y:0}}){
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
        this.offset = offset
    }
    draw(){
        c.drawImage(
            this.image,

            this.frameCurrent * (this.image.width/this.framesMax),
            0,
            this.image.width/this.framesMax,
            this.image.height,

            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width/this.framesMax)*this.scale,
            this.image.height*this.scale
        )
    }
    animateFrames(){
        this.framesElapsed++
        if(this.framesElapsed % this.framesHold === 0){
            if(this.frameCurrent < this.framesMax-1){
                this.frameCurrent++
            }else{
                this.frameCurrent = 0
            }
        }
    }
    update(){
        this.draw()
        this.animateFrames()
    }
}

class Fighter extends Sprite{
    constructor({position,velocity,color,imageSrc,scale = 1,framesMax = 1,offset={x:0,y:0},sprites,attackBox = {offset:{},width:undefined,height:undefined}}){
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset,
        })
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastkey
        this.health = 100
        this.frameCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.attackBox = {
            position:{x:this.position.x,y:this.position.y},
            offset:attackBox.offset,
            width:attackBox.width,
            height:attackBox.height,
        }
        this.color = color
        this.isAttacking
        this.sprites = sprites
        for(const sprite in this.sprites){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }
    attack(){
        this.switchSprite('attack1')
        this.isAttacking = true
    }
    update(){
        this.draw()
        this.animateFrames()
        // update the attack box x,y position
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y
        //end

        //display attack box
        // c.fillStyle = 'green'
        // c.fillRect(this.attackBox.position.x,this.attackBox.position.y,this.attackBox.width,this.attackBox.height)
        
        //display player enemy both
        // c.fillStyle = this.color
        // c.fillRect(this.position.x,this.position.y,this.width,this.height)
        

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.position.y + this.height + this.velocity.y >= canvas.height-96){
            this.velocity.y = 0
            this.position.y = 330 //flashing bug //2:57:35
        }else{
            this.velocity.y += gravity
        }
    }
    switchSprite(sprite){
        //overridding all other animation with the attack animation
        if(this.image === this.sprites.attack1.image && this.frameCurrent < this.sprites.attack1.framesMax-1) return
        //overridding all when fighter gets hit
        if(this.image === this.sprites.takeHit.image && this.frameCurrent < this.sprites.takeHit.framesMax-1) return

        switch (sprite) {
            case 'idle':
                if(this.image !== this.sprites.idle.image){
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax    //setting the maxframe ie 8 for jump
                    this.frameCurrent = 0       
                }
                break;
            case 'run':
                if(this.image !== this.sprites.run.image){
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax    //setting the maxframe ie 8 for jump
                    this.frameCurrent = 0
                }
                break;
            case 'jump':
                if(this.image !== this.sprites.jump.image){
                    this.image = this.sprites.jump.image            //changing to jump animation
                    this.framesMax = this.sprites.jump.framesMax    //setting the maxframe ie 2 for jump
                    this.frameCurrent = 0
                }
                break;
            case 'fall':
                if(this.image !== this.sprites.fall.image){
                    this.image = this.sprites.fall.image            //changing to jump animation
                    this.framesMax = this.sprites.fall.framesMax    //setting the maxframe ie 2 for jump
                    this.frameCurrent = 0
                }
                break;
            case 'attack1':
                if(this.image !== this.sprites.attack1.image){
                    this.image = this.sprites.attack1.image            //changing to jump animation
                    this.framesMax = this.sprites.attack1.framesMax    //setting the maxframe ie 2 for jump
                    this.frameCurrent = 0
                }
                break;
            case 'takeHit':
                if(this.image !== this.sprites.takeHit.image){
                    this.image = this.sprites.takeHit.image            //changing to jump animation
                    this.framesMax = this.sprites.takeHit.framesMax    //setting the maxframe ie 2 for jump
                    this.frameCurrent = 0
                }
                break;
        }
    }
}