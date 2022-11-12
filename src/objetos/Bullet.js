export default class Bullet  extends Phaser.GameObjects.Sprite {
    
	 constructor(scene, x, y, vectorX, vectorY, target) {
        super(scene, x, y,'cuchillo');
        
        this.lifetime = 0;

        // Referencia al objeto
        self = this;

        // Se aade a sí misma a la escena
        scene.add.existing(this); 
        scene.physics.add.existing(this);

        // Cambia su velocidad
        this.body.setVelocityX(vectorX);
        this.body.setVelocityY(vectorY);
        this.body.velocity.normalize().scale(500);

        // Añade un triggr. Si choca con el jugador, le baja la vida y se destruye
        this.scene.physics.add.overlap(this, target, function(self){ 
            scene.DecreaseLife(target);
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