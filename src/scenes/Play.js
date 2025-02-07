class Play extends Phaser.Scene {
    constructor() {
      super("playScene")
    }
    
    create() {
     // green UI background
     this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)
     
      
  
this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)
this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)
this.ship01 = new Spaceship(this, Phaser.Math.Between(60,580),0, 'spaceship', 0, 1,Phaser.Math.Between(3,10)/10).setOrigin(0, 0)
this.ship01.anims.play('spaceshipanim')
this.ship02 = new Spaceship(this, Phaser.Math.Between(60,580), -50 , 'spaceship', 0, 1,Phaser.Math.Between(3,10)/10).setOrigin(0,0)
this.ship02.anims.play('spaceshipanim')
//this.ship03 = new Spaceship(this, Phaser.Math.Between(60,580), -20 , 'spaceship', 0, 1,Phaser.Math.Between(3,10)/10).setOrigin(0,0)
keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

// add spaceships (x3)
// initialize score
this.p1Score = 0
let scoreConfig = {
    fontFamily: 'Courier',
    fontSize: '28px',
    backgroundColor: '#F3B141',
    color: '#843605',
    align: 'right',
    padding: {
      top: 3,
      bottom: 3,
    },
    fixedWidth: 100
  }
  this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)
// GAME OVER flag
this.gameOver = false
this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
  
}, null, this)

// 60-second play clock

    }
    update() {
     
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          this.scene.start("menuScene")
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          this.scene.restart()
        }
        
        if(!this.gameOver) {               
            this.p1Rocket.update()         // update rocket sprite
            this.ship01.update()           // update spaceships (x3)
            this.ship02.update() 
           // this.ship03.update() 
        } 
          
         
          if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.ship01.movespeed=Phaser.Math.Between(3,10)/10
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
            
            this.ship01.reset()
    
          }
          if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.ship02.movespeed=Phaser.Math.Between(3,10)/10
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
          
            this.ship02.reset()
    
          }
          // if (this.checkCollision(this.p1Rocket, this.ship03)) {
          //   //this.ship03.movespeed=Phaser.Math.Between(3,10)/10
          //   this.p1Rocket.reset()
          //   this.shipExplode(this.ship03)
            
          //   this.ship03.reset()
    
          // }
          
          
          this.gameend(this.ship01)
          this.gameend(this.ship02)
          //this.gameend(this.ship03)
          if(!this.gameOver) {      
           
            this.starfield.tilePositionY -= 4         
            this.p1Rocket.update()         // update rocket sprite
            this.ship01.update()           // update spaceships (x3)
            this.ship02.update() 
            //this.ship03.update() 
            this.scoreLeft.text = this.clock.getElapsedSeconds()
        } 
      }
      checkCollision(rocket, ship) {
        // simple AABB checking
        if (  rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
          return true
        } else {
          return false
        }
        
      }
      gameend(ship){
        if(ship.y>=480){
          this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER').setOrigin(0.5)
    this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press right or (R) to Restart or ← for Menu').setOrigin(0.5)
          this.gameOver=true
        }
      }
      
      shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.angle =270
        boom.anims.play('explode')             // play explode animation
        boom.on('animationcomplete', () => {   // callback after anim completes

          ship.x=Phaser.Math.Between(60,580)
          ship.reset()                         // reset ship position
          ship.alpha = 1                       // make ship visible again

          boom.destroy()                       // remove explosion sprite
          this.sound.play('sfx-explosion')
        })       
        // score add and text update
  this.p1Score += ship.points
  this.scoreLeft.text = this.p1Score       
      }
  }