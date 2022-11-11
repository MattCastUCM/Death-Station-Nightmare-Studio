import gameObject from './gameObject.js';
export default class Enemy extends gameObject {
	constructor(scene, posX, posY, w, h, offsetX, offsetY, texture, spd, target, life) {
        super(scene, posX, posY, w, h, offsetX, offsetY, texture, spd);
        this.target = target;
        this.life = life;
        this.elapsedTime = 0;
        this.hasCollided = false;
        this.body.setImmovable(true); //para que no se mueva 
    }
	damage(damagePoints){
        console.log("intento daño");
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
	
    preupdate(t,dt){
        super.preupdate(t,dt);
        if(this.hasCollided){

            // Aumenta el tiempo que ha pasado desde la colisión
            this.elapsedTime += dt;

            // Si ha pasado un cierto tiempo, se indica que ha
            // dejado de colisionar y se popne el temporizador a 0
            if(this.elapsedTime >= 500){
                this.hasCollided = false;
                this.elapsedTime = 0;
            }
        }
        
    }

}