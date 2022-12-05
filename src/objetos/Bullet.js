import gameObject from './gameObject.js';
export default class Bullet  extends gameObject {
    
	 constructor(scene, x, y, vectorX, vectorY, target) {
        super(scene, x, y, 30,30,0, 0, 'roca', 150);
        this.lifetime = 0;
        this.body.onCollide = true; 
       
        this.move(vectorX,vectorY);

        // Añade un trigger. Si choca con el jugador, le baja la vida y se destruye
        this.scene.physics.add.overlap(this, target.fullCollider, function(self){ 
            target.decreaseHP()
            scene.DecreaseLife(target);
            scene.soundManager.play("bulletDestroy")
            self.destroy();
        });
        this.scene.physics.add.overlap(this, scene.cartBoardBoxes, function(self){ 
            self.destroy();
        });
        this.scene.physics.add.overlap(this, scene.woodBoxes, function(self){ 
            scene.soundManager.play("bulletDestroy")
            self.destroy();
        });
        this.scene.physics.add.overlap(this, scene.objects, function(self){ 
            scene.soundManager.play("bulletDestroy")
            self.destroy();
        });
        this.scene.physics.add.collider(this, scene.colisionlayer, function(self){ 
            scene.soundManager.play("bulletDestroy")
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