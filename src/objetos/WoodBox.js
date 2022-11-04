import gameObject from './gameobject.js';

export default class WoodBox extends gameObject {
	/**
	 * Constructor de Caja de cartón
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} posX - coordenada x
	 * @param {number} posY - coordenada y
	 */
	constructor(scene, posX, posY,colliderGroup) {
		super(scene, posX, posY, 56,32,0, 35, 'woodBox', 0);
		colliderGroup.add(this);
		this.body.setImmovable(true); //para que no se mueva (tiene que estar después de group add, o si no no funciona)
	}


	// Destrucción de la caja, llamado por arma
	destroyMe() {
		this.setActive(false).setVisible(false);
		this.destroy();
	}
}