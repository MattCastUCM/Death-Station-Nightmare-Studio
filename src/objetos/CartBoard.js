import gameObject from './gameObject.js';

export default class CardBoard extends gameObject {
	/**
	 * Constructor de Caja de cartón
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} posX - coordenada x
	 * @param {number} posY - coordenada y
	 */

	constructor(scene, posX, posY, colliderGroup) {
		super(scene, posX, posY, 56,32,0, 32, 'cartBoard', 0);

	    //añadir al grupo de cajas
		colliderGroup.add(this);
	}

	/**
	 * Bucle principal de la caja, comprobamos la velocidad para reducirla y setearla a 0 en ciertos umbrales
	 * Así no se movera de manera infinita cuando la golpeemos
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */
	preUpdate(t, dt) {

		//fuerza de rozamiento 
		if (this.body.velocity.x > 5) {
			this.body.velocity.x -= 5;
		} else if (this.body.velocity.x < -5) {
			this.body.velocity.x += 5;
		}

		if (this.body.velocity.y > 5) {
			this.body.velocity.y -= 5;
		} else if (this.body.velocity.y < -5) {
			this.body.velocity.y += 5;
		}
		if (this.body.velocity.x <= 5 && this.body.velocity.x > 0 || this.body.velocity.x >= -5 && this.body.velocity.x < 0) {
			this.body.velocity.x = 0;
		}
		if (this.body.velocity.y <= 5 && this.body.velocity.y > 0 || this.body.velocity.y >= -5 && this.body.velocity.y < 0) {
			this.body.velocity.y = 0;
		}

	}

}