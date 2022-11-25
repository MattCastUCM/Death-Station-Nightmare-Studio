/**
 * Escena del Menú.
 * @extends Phaser.Scene
 */
export default class Menu extends Phaser.Scene {
	constructor() {
		super({ key: 'menu' });
	}

	/**
	* Creación de los elementos de la escena
	*/
	create() {
		this.cameras.main.fadeIn(500,0,0,0);
		
		// Pintamos el fondo
		var back = this.add.image(0, 0, 'fondo').setOrigin(0, 0);
		back.setScale(0.75);
		
		// Pintamos el botón de Empezar
		var sprite = this.add.image(this.sys.game.canvas.width - 340, this.sys.game.canvas.height - 190 , 'start')
		sprite.setScale(0.9);
		sprite.setInteractive(); // Hacemos el sprite interactivo para que lance eventos

		// Al poner el cursor encima del botón, cambia de color
		sprite.on('pointerover', () => {
			sprite.setTint(0xff0000);
	    });

		// Al quitar el cursor de encima del botón, vuelve a su color original
	    sprite.on('pointerout', () => {
			sprite.clearTint();
	    });

		// Al pulsar el botón
	    sprite.on('pointerup', pointer => {
			this.scene.start('LEVEL_01'); //Cambiamos a la escena de juego
	    });


	}
}