/**
 * Escena de Restart.
 * @extends Phaser.Scene
 */
 export default class Restart extends Phaser.Scene {
	constructor() {
		super({ key: 'restart' });
	}

	/*
	* Creación de los elementos de la escena
	*/
	create() {
		this.cameras.main.fadeIn(500,0,0,0);

		// Pintamos el fondo
		var back = this.add.image(0, 0, 'fondoRestart').setOrigin(0, 0);
		back.setScale(1.01);


		//Pintamos el botón de reiniciar
		var sprite = this.add.image(this.scale.width/2, this.scale.height - 100 , 'restartButton')
		sprite.setScale(0.9);
		sprite.setInteractive(); // Hacemos el sprite interactivo para que lance eventos

		// Hace que parpadee el botón
        for(let i= 0; i<300; i= i+2){
            setTimeout(()=>{  sprite.setTint(0xff0000);}, i * 150);
            setTimeout(()=>{  sprite.clearTint();}, (i + 1) * 150);
        }

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