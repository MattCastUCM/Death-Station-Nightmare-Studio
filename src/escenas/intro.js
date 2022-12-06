/**
 * Escenas introductorias.
 * @extends Phaser.Scene
 */
import Player from '../objetos/player.js';
import LEVEL_BASE from './LEVEL_BASE.js';

 export class intro1 extends LEVEL_BASE {
	constructor() {
		let nextlevel = "level1Map";
		super("intro1", nextlevel, '', 'tiles', 560, true);
	}

	/**
	* Creación de los elementos de la escena
	*/
	create() {
		super.create();

		this.cameras.main.fadeIn(500,0,0,0);

		// Añade la imagen del mapa 
		this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'introOutside').setScale(0.7);
		let pressed = false;

		// Tecla enter
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

		//HUD (y Pausa)
		this.scene.launch('hud', { me: this });
		
        //SoundManager
        this.soundManager = this.scene.get('soundManager');

		//DIALOGMANAGER
		this.scene.launch('dialogManager');
		this.dialogueManager = this.scene.get('dialogManager');

		this.player.setPosition(-50, 350)
		this.player.setScale(1.8);


		// Al pulsar el enter, comienza el fadeOut
		this.enterKey.on('down', ()=> {
			if(!pressed){
				this.cameras.main.fadeOut(500,0,0,0);
			}
			pressed = true;
	    });
		// Al terminar el fade out, cambia a la escena del nivel 1
		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam,effect) => {
			this.scene.start('intro2');
		});

		this.timer = 0;
		this.event1 = false;
		this.event2 = false;
		this.event3 = false;
		this.event4 = false;
	}

	update(t,dt){

		if (this.timer < 1000){
			this.player.move(1,0);
		}
		else if (this.timer >= 1200 && this.timer < 1600){
			this.player.setFrame(9);
		}
		else if (this.timer >= 1600 && this.timer < 2000){
			this.player.setFrame(1);
		}
		else if (this.timer >= 2000 && this.timer < 2400){
			this.player.setFrame(13);
		}
		else if (this.timer >= 2400 && this.timer < 2800){
			// Poner exclamación
		}
		else if (!this.event1 && this.timer >= 2800 && this.timer < 2850){
			this.newText(["Menos mal que aún no se ha ido el tren...", "Si me subo ahora, puede que incluso llegue antes de lo previsto."]);
			this.event1 = true;
		}
		this.timer += dt;
	}

	newText(text) {
		this.dialogueManager.Init(text);
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
		this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'introInside');
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
