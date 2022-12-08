import gameObject from '../gameObject.js';

export default class Enemy extends gameObject {
    /**
     * Clase base para los enemigos
     * @extends gameObject
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
     * @param {number} w - ancho
     * @param {number} h - alto
     * @param {number} offsetX - distancia entre la x del sprite y la x de su collider
     * @param {number} offsetY - distancia entre la y del sprite y la y de su collider
     * @param {number} offsetY - distancia entre la y del sprite y la y de su collider
     * @param {number} spd - velocidad
     * @param {number} life - vida
     */
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

    // Recibe daño si ha acabado el periodo de gracia
	damage(damagePoints){
        if(!this.hasCollided){
            this.life -= damagePoints;
            this.emit('damaged');
            this.hasCollided = true;
            if(this.life <= 0) this.destroy();
            for(let i= 0; i<5; i= i+2){
                setTimeout(()=>{ this.setTint(0xff0000);}, i * 200);
                setTimeout(()=>{ this.clearTint();}, (i + 1) * 200);
            }
           
        }
	}

    
    preUpdate(t,dt){
        super.preUpdate(t,dt);

        if(this.hasCollided){
            // Aumenta el tiempo que ha pasado desde la colisión
            this.collidedTime += dt;

            // Si ha pasado un cierto tiempo, se indica que ha
            // dejado de colisionar y se popne el temporizador a 0
            if(this.collidedTime >= 300){
                this.hasCollided = false;
                this.collidedTime = 0;
            }
        }
        
    }

}