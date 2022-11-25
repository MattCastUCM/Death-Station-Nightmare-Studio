/**
 * Escena del Menú.
 * @extends Phaser.Scene
 */
 export class Logo1 extends Phaser.Scene {
	constructor() {
		super({ key: 'logo1' });
	}

	/**
	* Creación de los elementos de la escena
	*/
	create() {

		// Pintamos el fondo
		let logo = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height/2, 'phaserLogo');
		logo.setInteractive(); // Hacemos el sprite interactivo para que lance eventos
		
		// Al pulsar el botón
		logo.on('pointerdown', pointer => {
			logo.disableInteractive();
			console.log("AAA");
			this.cameras.main.fadeOut(500,0,0,0);
		});
		
		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam,effect) => {
			this.scene.start('logo2');
		});
	}

}

export class Logo2 extends Phaser.Scene {
	constructor() {
		super({ key: 'logo2' });
	}

	/**
	* Creación de los elementos de la escena
	*/
	create() {
		this.cameras.main.fadeIn(500,0,0,0);

		// Pintamos el fondo
		let logo = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height/2, 'phaser');
		logo.setInteractive(); // Hacemos el sprite interactivo para que lance eventos
		
		// Al pulsar el botón
		logo.on('pointerdown', pointer => {
			logo.disableInteractive();
			console.log("AAA");
			this.cameras.main.fadeOut(500,0,0,0);
		});
		
		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam,effect) => {
			this.scene.start('menu');
		});

	}
}