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

		// Añade la imagen del mapa 
		this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'map2');
		let pressed = false;

		// Tecla enter
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		
		// Al pulsar el enter, comienza el fadeOut
		this.enterKey.on('down', ()=> {
			if(!pressed){
				this.cameras.main.fadeOut(500,0,0,0);
			}
			pressed = false;
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

		// Añade la imagen del mapa 
		this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'map3');
		let pressed = false;

		// Tecla enter
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		
		// Al pulsar el enter, comienza el fadeOut
		this.enterKey.on('down', ()=> {
			if(!pressed){
				this.cameras.main.fadeOut(500,0,0,0);
			}
			pressed = false;
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

		// Añade la imagen del mapa 
		this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'map4');
		let pressed = false;

		// Tecla enter
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		
		// Al pulsar el enter, comienza el fadeOut
		this.enterKey.on('down', ()=> {
			if(!pressed){
				this.cameras.main.fadeOut(500,0,0,0);
			}
			pressed = false;
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

		// Añade la imagen del mapa 
		this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'map5');
		let pressed = false;

		// Tecla enter
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		
		// Al pulsar el enter, comienza el fadeOut
		this.enterKey.on('down', ()=> {
			if(!pressed){
				this.cameras.main.fadeOut(500,0,0,0);
			}
			pressed = false;
	    });

		// Al terminar el fade out, cambia a la escena del nivel 1
		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam,effect) => {
			this.scene.start('LEVEL_05');
		});
	}

}