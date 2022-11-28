import gameObject from './gameObject.js';

export default class WoodBox extends gameObject {
	/**
	 * Constructor de Caja de cartón
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} posX - coordenada x
	 * @param {number} posY - coordenada y
	 */
	constructor(scene, posX, posY) {
		super(scene, posX, posY, 56,32,0, 35, 'woodBox', 0);
		scene.physics.add.existing(this);
	}


	// Destrucción de la caja, llamado por arma
	destroyMe() {
		this.setActive(false).setVisible(false);
		this.destroy();
	}

	preUpdate(t,dt){
		super.preUpdate(t,dt);
	}
}