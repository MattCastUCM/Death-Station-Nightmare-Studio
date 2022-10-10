export class Game extends Phaser.Scene{

    constructor(){
        super({key: 'game'});
    }

    preload()
    {
        this.load.image('background', 'assets/background.png');
        this.load.image('spider','assets/Spider2.png');
    }
    
    create()
    {
        this.add.image(300, 300, 'background');
        this.spider = this.physics.add.image(400, 300,'spider');
        this.spider.body.allowGravity = false;
        this.spider.setCollideWorldBounds(true);
        this.spider.body.onWorldBounds=true;
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    }
    
    
    update()
    {

        if(this.keyA.isDown){
            this.spider.setVelocityX(-200,0);
        }
        else if(this.keyD.isDown){
            this.spider.setVelocityX(200,0);
        }
        else{
            this.spider.setVelocityX(0);
        }
        if(this.keyW.isDown){
            this.spider.setVelocityY(-200,0);
        }
        else if(this.keyS.isDown){
            this.spider.setVelocityY(200,0)
        }
        else{
            this.spider.setVelocityY(0,0);
            }
    }
}



