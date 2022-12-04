/**
 * Escenas introductorias.
 * @extends Phaser.Scene
 */
 import Player from '../objetos/player.js';

 export class intro1 extends Phaser.Scene {
	constructor() {
		super({ key: 'intro1' });
	}

	/**
	* Creación de los elementos de la escena
	*/
	create() {
		this.cameras.main.fadeIn(500,0,0,0);

		// Añade la imagen del mapa 
		this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'introOutside');

		let player = new Player(this, 20, 20);



		this.cameras.main.fadeOut(500,0,0,0);
		// Al terminar el fade out, cambia a la escena del nivel 1
		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam,effect) => {
			this.scene.start('intro2');
		});
	}

}


export class intro2 extends Phaser.Scene {
	constructor() {
		super({ key: 'intro2' });
	}

	/**
	* Creación de los elementos de la escena
	*/
	create() {
		this.cameras.main.fadeIn(500,0,0,0);

		// Añade la imagen del mapa 
		this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'map1');
		let pressed = false;

		// Tecla enter
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		
		// Al pulsar el enter, comienza el fadeOut
		this.enterKey.on('down', ()=> {
			if(!pressed){
				this.cameras.main.fadeOut(500,0,0,0);
			}
			pressed = true;
	    });

		// Al terminar el fade out, cambia a la escena del nivel 1
		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam,effect) => {
			this.scene.start('level1Map');
		});
	}

}
