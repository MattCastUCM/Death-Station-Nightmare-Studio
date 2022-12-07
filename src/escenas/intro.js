import LEVEL_BASE from './LEVEL_BASE.js';
/**
 * Escenas introductorias.
 * @extends LEVEL_BASE
 */
export class intro1 extends LEVEL_BASE {
	constructor() {
		let nextlevel = "intro2";
		super("intro1", nextlevel, '', '', 560, true);
	}

	/**
	* Creación de los elementos de la escena
	*/
	create() {
		super.create();

		this.cameras.main.fadeIn(500, 0, 0, 0);

		// Añade la imagen del fondo 
		this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'introOutside').setScale(0.7);

		// HUD (y Pausa)
		this.scene.launch('hud', { me: this });
		this.hud = this.scene.get('hud');
		this.scene.sleep(this.hud);

		// SoundManager
		this.soundManager = this.scene.get('soundManager');
		this.soundManager.playBGM("ambient");

		// DialogueManager
		this.scene.launch('dialogManager');
		this.dialogueManager = this.scene.get('dialogManager');

		// Jugador (con input desactivado)
		this.player.setPosition(-50, 350)
		this.player.setScale(1.8);
		this.input.keyboard.enabled = false;

		// Imagen de la exclamación
		this.exclamation = this.add.image(158, 290, 'exclamation').setScale(0.15);
		this.exclamation.visible = false;

		this.timer = 0;
		this.event1 = false;
		this.event2 = false;

		// Al terminar el fade out, cambia a la escena del nivel 1
		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
			this.scene.start('intro2');
		});

	}

	// Secuencia de eventos marcados por tiempo
	update(t, dt) {
		if (this.timer < 1400) {
			this.player.move(1, 0);
		}
		else if (this.timer >= 2400 && this.timer < 3000) {
			this.player.setFrame(1);
		}
		else if (this.timer >= 3400 && this.timer < 3800) {
			this.exclamation.visible = true;
		}
		else if (this.timer >= 3800 && this.timer < 4000) {
			this.exclamation.visible = false;
		}
		else if (!this.event1 && this.timer >= 3800 && this.timer < 4250) {
			this.newText(["Menos mal que aún no se ha ido el tren...", "Si me subo ahora, puede que incluso llegue antes de lo previsto."]);
			this.event1 = true;
		}
		else if (this.timer >= 4250 && this.timer < 5600) {
			this.player.move(0, -1);
		}
		else if (!this.event2 && this.timer >= 6500) {
			this.event2 = true;
			this.cameras.main.fadeOut(500, 0, 0, 0);
		}

		if ((this.timer >= 3000 && this.timer < 4250) || (this.timer >= 5600 && this.timer < 7000)) {
			this.player.setFrame(13);
		}

		this.timer += dt;
	}

	newText(text) {
		this.dialogueManager.Init(text);
	}
}


export class intro2 extends LEVEL_BASE {
	constructor() {
		let nextlevel = "level1Map";
		super("intro2", nextlevel, '', '', 560, true);
	}

	create() {
		super.create();

		this.cameras.main.fadeIn(1000, 0, 0, 0);
		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, (cam, effect) => {
			setTimeout(() => { // se ejecuta al pasar 3s
				this.soundManager.stopBGM("ambient");
				this.soundManager.play("accident");
				this.soundManager.play("trainHorn");
				this.cameras.main.shake(350);
			}, 3000);


		});

		// Añade la imagen del fondo 
		this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'introInside');

		//HUD (y Pausa)
		this.scene.launch('hud', { me: this });
		this.hud = this.scene.get('hud');
		this.scene.sleep(this.hud);

		// SoundManager
		this.soundManager = this.scene.get('soundManager');


		// DialogueManager
		this.scene.launch('dialogManager');
		this.dialogueManager = this.scene.get('dialogManager');

		// Jugador (con input desactivado)
		this.player.setPosition(350, 230)
		this.player.setScale(3.4);
		this.input.keyboard.enabled = false;

		this.timer = 0;
		this.event1 = false;
		this.event2 = false;
		this.cameras.main.on('camerashakecomplete', () => {
			this.cameras.main.fadeOut(3000, 0, 0, 0);
		});




		// Al terminar el fade out, cambia a la escena del nivel 1
		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
			this.scene.start('level1Map');
		});

	}

	// Secuencia de eventos marcados por tiempo
	update(t, dt) {


		this.timer += dt;
	}

	newText(text) {
		this.dialogueManager.Init(text);
	}

}
