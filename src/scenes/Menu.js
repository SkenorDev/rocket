class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene")
    }
    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png')
        this.load.image('spaceship', './assets/spaceship.png')
        this.load.image('starfield', './assets/starfield.png')
        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
        this.load.audio('sfx-shot', './assets/sfx-shot.wav')
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
            
        })
      }
    create() {
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
           
            frameRate: 30
            
})
      let menuConfig={
        fontFamily:'Courier',
        fontSize:'24px',
        backgroundColor:'#F3B141',
        color: '#843605',
        align: 'right',
        padding: {
            top:5,
            bottom:5,
        },
            fixedWidth:0
            
        }
        
        this.add.text(game.config.width/2, game.config.height/2 -borderUISize-borderPadding, 'ROCKET PATROL',menuConfig).setOrigin(0.5)
       // this.add.text(game.config.width/2/game.config.height/2 + borderUISize+ borderPadding, 'ROCKET PATROL',menuConfig).setOrigin(0.5)
    
        this.add.text(game.config.width/2, game.config.height/2,'Use arrow keys to move (f) to fire',menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor='#00FF00'
        menuConfig.color='#000'
        this.add.text(game.config.width/2,game.config.height/2 + borderUISize+ borderPadding, 'Press L for Novice R for hard',menuConfig).setOrigin(0.5)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
      }


      update() {
          // check key input for restart
  if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
    this.scene.restart()
    console.log("R");
}
if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
  this.scene.start("menuScene")
  console.log("R");
}
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 15000 
          }
          this.sound.play('sfx-select')
          this.scene.start('playScene')    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer:15000  
          }
          this.sound.play('sfx-select')
          this.scene.start('playScene')    
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          this.scene.start("menuScene")
        }
      }
      
    }
  