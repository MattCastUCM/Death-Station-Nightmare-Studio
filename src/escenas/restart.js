/**
 * Escena de Restart.
 * @extends Phaser.Scene
 */
 export default class Restart extends Phaser.Scene {
	constructor() {
		super({ key: 'restart' });
	}
		
	init(level) { //escena de nivel
        this.level = level.me;
    }
	preload(){
		this.soundManager = this.scene.get('soundManager');
	}

	/*
	* Creación de los elementos de la escena
	*/
	create() {
		this.cameras.main.fadeIn(500,0,0,0);

		// Pintamos el fondo
		var back = this.add.image(0, 0, 'fondoRestart').setOrigin(0, 0);

		this.soundManager.playBGM("restart");

		back.setScale(1.01);


		//Pintamos el botón de reiniciar
		var sprite = this.add.image(this.scale.width/2, this.scale.height - 100 , 'restartButton')
		sprite.setScale(0.9);
		sprite.setInteractive(); // Hacemos el sprite interactivo para que lance eventos

		// Al poner el cursor encima del botón, cambia de color
		sprite.on('pointerover', () => {
			sprite.setTint(0xff0000);
			this.soundManager.play("click");

	    });

		// Al quitar el cursor de encima del botón, vuelve a su color original
	    sprite.on('pointerout', () => {
			sprite.clearTint();
	    });

		// Al pulsar el botón
	    sprite.on('pointerup', pointer => {
			this.soundManager.stopBGM("restart");
			this.scene.start(this.level); //Cambiamos a la escena de juego
	    });

		sprite.on('pointerover', () => {
			sprite.setTint(0xff0000);
			
		
	    });

	    sprite.on('pointerout', () => {
			sprite.clearTint();
			
	    });

	}
}