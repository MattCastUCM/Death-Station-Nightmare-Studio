export default class Bullet  extends Phaser.GameObjects.Sprite {
    
	 constructor(scene, x, y, vectorX, vectorY, target) {
        super(scene, x, y,'cuchillo');
        this.vectorX = vectorX;
        this.vectorY = vectorY;
        this.lifetime = 0;
        self = this;
        scene.add.existing(this); 
        scene.physics.add.existing(this);
        this.scene.physics.add.overlap(this, target, function(self){ 
            scene.DecreaseLife(target);
            self.destroy();
        });
    }
    
    preUpdate(t, dt){
        super.preUpdate(t, dt);
            this.body.setVelocityX(this.vectorX);
            this.body.setVelocityY(this.vectorY);
            this.body.velocity.normalize().scale(500);

            if(this.lifetime > 5000) {
                this.destroy();
            }
            this.lifetime+=dt;
    }
}