import gameObject from './gameobject.js';

export default class CardBoard extends gameObject {

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

		this.friction();

	}

}