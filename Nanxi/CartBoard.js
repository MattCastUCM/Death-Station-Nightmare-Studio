export default class CardBoard extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor de Caja de cartón
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */
	constructor(scene, x, y,colliderGroup) {
		super(scene, x, y, 'cartBoard');
		//this.setScale(1, .5);
		this.scene.add.existing(this); //Añadimos la caja a la escena
		
		//BORRAR cuando tenga la clase gameObject------------
		scene.physics.add.existing(this);
		this.body.setCollideWorldBounds();
		//-------------------------------------
		colliderGroup.add(this);
	}

	/**
	 * Bucle principal de la caja, comprobamos la velocidad para reducirla y setearla a 0 en ciertos umbrales
	 * Así no se movera de manera infinita cuando la golpeemos
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */
	preUpdate(t, dt) {
		// //super.preUpdate(t, dt);

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