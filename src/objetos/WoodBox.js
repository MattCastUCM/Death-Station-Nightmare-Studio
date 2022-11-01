export default class WoodBox extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor de Caja de madera
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */
	constructor(scene, x, y,colliderGroup) {
		super(scene, x, y, 'woodBox');
		//this.setScale(1, .5);
		
		//BORRAR cuando tenga la clase gameObject------------
		scene.physics.add.existing(this);
		this.body.setCollideWorldBounds();
		//-------------------------------------
		this.scene.add.existing(this); //Añadimos la caja a la escena
		colliderGroup.add(this);
		this.body.setImmovable(true); //para que no se mueva (tiene que estar después de group add, o si no no funciona)
	}


	// Destrucción de la caja, llamado por arma
	destroyMe() {
		this.setActive(false).setVisible(false);
		this.destroy();
	}
}