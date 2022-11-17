import gameObject from './gameObject.js';
export default class Enemy extends gameObject {
	constructor(scene, posX, posY, w, h, offsetX, offsetY, texture, spd, target, life) {
        super(scene, posX, posY, w, h, offsetX, offsetY, texture, spd);
        this.target = target;
        this.life = life;
        this.collidedTime = 0;
        this.hasCollided = false;
        this.body.setImmovable(true); //para que no se mueva 
    }

    // Sigue al jugador moviéndose hacia su posición
	Follow () {
        this.scene.physics.moveToObject(this, this.target, this.speed);
    }

	damage(damagePoints){
        //console.log(this);
        if(!this.hasCollided){
            console.log("daño");
            this.life -= damagePoints;
            this.hasCollided = true;
            if(this.life <= 0) this.Die();
        }
	}

    Die(){
        this.destroy();
    }
	
    preUpdate(t,dt){
        super.preUpdate(t,dt);

        if(this.hasCollided){
            // Aumenta el tiempo que ha pasado desde la colisión
            this.collidedTime += dt;

            // Si ha pasado un cierto tiempo, se indica que ha
            // dejado de colisionar y se popne el temporizador a 0
            if(this.collidedTime >= 500){
                this.hasCollided = false;
                this.collidedTime = 0;
            }
        }
        
    }

}