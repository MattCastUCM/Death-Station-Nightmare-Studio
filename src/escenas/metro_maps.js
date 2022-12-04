/**
 * Escenas con los mapas de los niveles.
 * @extends Phaser.Scene
 */

 export class level1Map extends Phaser.Scene {
	constructor() {
		super({ key: 'level1Map' });
	}

	/**
	* Creación de los elementos de la escena
	*/
	create() {
		this.cameras.main.fadeIn(500,0,0,0);

		// Añade el logo 
		let img = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'map1');
		img.setInteractive(); // Hacemos el sprite interactivo para que lance eventos
		
		// Al pulsar el botón
		img.on('pointerdown', pointer => {
			img.disableInteractive();
			this.cameras.main.fadeOut(500,0,0,0);
		});
		// Al terminar el fade out, cambia a la escena del nivel 1
		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam,effect) => {
			this.scene.start('LEVEL_01');
		});
	}

}

export class level2Map extends Phaser.Scene {
	constructor() {
		super({ key: 'level2Map' });
	}

	/**
	* Creación de los elementos de la escena
	*/
	create() {
		this.cameras.main.fadeIn(500,0,0,0);

		// Añade el logo 
		let img = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'map2');
		img.setInteractive(); // Hacemos el sprite interactivo para que lance eventos
		
		// Al pulsar el botón
		img.on('pointerdown', pointer => {
			img.disableInteractive();
			this.cameras.main.fadeOut(500,0,0,0);
		});
		// Al terminar el fade out, cambia a la escena del nivel 1
		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam,effect) => {
			this.scene.start('LEVEL_02');
		});
	}

}

export class level3Map extends Phaser.Scene {
	constructor() {
		super({ key: 'level3Map' });
	}

	/**
	* Creación de los elementos de la escena
	*/
	create() {
		this.cameras.main.fadeIn(500,0,0,0);

		// Añade el logo 
		let img = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'map3');
		img.setInteractive(); // Hacemos el sprite interactivo para que lance eventos
		
		// Al pulsar el botón
		img.on('pointerdown', pointer => {
			img.disableInteractive();
			this.cameras.main.fadeOut(500,0,0,0);
		});
		// Al terminar el fade out, cambia a la escena del nivel 1
		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam,effect) => {
			this.scene.start('LEVEL_03');
		});
	}

}

export class level4Map extends Phaser.Scene {
	constructor() {
		super({ key: 'level4Map' });
	}

	/**
	* Creación de los elementos de la escena
	*/
	create() {
		this.cameras.main.fadeIn(500,0,0,0);

		// Añade el logo 
		let img = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'map4');
		img.setInteractive(); // Hacemos el sprite interactivo para que lance eventos
		
		// Al pulsar el botón
		img.on('pointerdown', pointer => {
			img.disableInteractive();
			this.cameras.main.fadeOut(500,0,0,0);
		});
		// Al terminar el fade out, cambia a la escena del nivel 1
		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam,effect) => {
			this.scene.start('LEVEL_04');
		});
	}

}


export class endMap extends Phaser.Scene {
	constructor() {
		super({ key: 'endMap' });
	}

	/**
	* Creación de los elementos de la escena
	*/
	create() {
		this.cameras.main.fadeIn(500,0,0,0);

		// Añade el logo 
		let img = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'map5');
		img.setInteractive(); // Hacemos el sprite interactivo para que lance eventos
		
		// Al pulsar el botón
		img.on('pointerdown', pointer => {
			img.disableInteractive();
			this.cameras.main.fadeOut(500,0,0,0);
		});
		// Al terminar el fade out, cambia a la escena del nivel 1
		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam,effect) => {
			this.scene.start('endGame');
		});
	}

}