export default class Bullet  extends Phaser.GameObjects.Sprite {
    
	 constructor(scene, x, y, vectorX, vectorY, target) {
        super(scene, x, y,'roca');
        
        this.lifetime = 0;

        // Referencia al objeto
        let self = this;

        // Se aade a sí misma a la escena
        scene.add.existing(this); 
        scene.physics.add.existing(this);
      
        this.body.onCollide = true; 
        // Cambia su velocidad
        this.body.setVelocityX(vectorX);
        this.body.setVelocityY(vectorY);
        this.body.velocity.normalize().scale(150);

        // Añade un triggr. Si choca con el jugador, le baja la vida y se destruye

        this.scene.physics.add.overlap(this, target, function(self){ 
            target.decreaseHP()
            scene.DecreaseLife(target);
            self.destroy();
        });
        
        this.scene.physics.add.overlap(this, scene.cartBoardBoxes, function(self){ 
           

            self.destroy();
        });
        this.scene.physics.add.overlap(this, scene.woodBoxes, function(self){ 
            self.destroy();
        });
        this.scene.physics.add.overlap(this, scene.colisionlayer, function(self){ 
            self.destroy();
        });

		

    }
    preUpdate(t, dt){
        super.preUpdate(t, dt);

        // Si el tiempo de vida pasa de los 5 segundos, se destruye
        if(this.lifetime > 5000) this.destroy();

        // Actualiza el tiempo de vida
        this.lifetime += dt;
    }
}