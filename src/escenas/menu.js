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
		
		this.soundManager.playBGM("menu");

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

		// Escuchamos los eventos del ratón cuando interactual con nuestro sprite de "Start"
	    sprite.on('pointerdown', pointer => {
	    	console.log("pulsando");
			this.soundManager.play("click");
	    });
		
		// Al pulsar el botón, hace un fade out
	    sprite.on('pointerup', pointer => {
			this.soundManager.stopBGM("menu");
			sprite.disableInteractive();
			this.cameras.main.fadeOut(500,0,0,0);
	    });
		// Al terminar el fade out, cambia a la escena del nivel 1
		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam,effect) => {
			this.scene.start('level1Map');
		});


	}
}