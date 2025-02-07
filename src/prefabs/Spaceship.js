
class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,texture,frame,pointValue,movespeed){
        super(scene,x,y,texture,frame)
        scene.add.existing(this)
        this.points = pointValue
        //this.moveSpeed = game.settings.spaceshipSpeed
        this.angle =270
        this.moveSpeed=movespeed
    }

    update(){
        //move
        this.y += this.moveSpeed

            //wrap
      
    }
    reset(){
        this.moveSpeed=Phaser.Math.Between(3,10)/10
        this.y=0+this.moveSpeed*10
    }
}