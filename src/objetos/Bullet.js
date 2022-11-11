import gameObject from './gameObject.js';
export default class Bullet  extends gameObject{
    /**
	 * Constructor de Knight, nuestro caballero medieval con espada y escudo
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */

	 constructor(scene, x, y, vectorX, vectorY) {
        super(scene, x, y,'cuchillo');
        this.vectorX = vectorX;
        this.vectorY = vectorY;
        scene.add.existing(this); 
        scene.physics.add.existing(this);
    }
    
    preUpdate(t, dt){
        super.preUpdate(t, dt);
        this.body.setVelocityX(this.vectorX);
        this.body.setVelocityY(this.vectorY);
        this.body.velocity.normalize().scale(500);
    }
}