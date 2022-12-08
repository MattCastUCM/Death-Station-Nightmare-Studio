import LEVEL_BASE from './LEVEL_BASE.js';

/**
 * Escenas introductorias
 * @extends LEVEL_BASE
 */

export class intro1 extends LEVEL_BASE {
	constructor() {
		let nextlevel = "intro2";
		super("intro1", nextlevel, '', '', 560, true);
	}


	// Creación de los elementos de la escena
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

		// DialogManager
		this.scene.launch('dialogManager');
		this.dialogManager = this.scene.get('dialogManager');

		// Jugador (con input desactivado)
		this.player.setPosition(-50, 350)
		this.player.setScale(1.8);
		this.input.keyboard.enabled = false;

		// Imagen de la exclamación
		this.exclamation = this.add.image(158, 290, 'exclamation').setScale(0.15);
		this.exclamation.visible = false;

		// Array de eventos (inicialmente a false)
		this.events = [];
		for(let i = 0; i < 6; i++) this.events[i] = false;


		// Al terminar el fade out, cambia a la escena del nivel 1
		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
			this.scene.start('intro2');
		});

	}

	// Secuencia de eventos marcados por tiempo
	update(t, dt) {
		if (this.player.x < 159) {
			this.player.move(1, 0);
		}
		else if (!this.events[0]) {
			this.player.move(0,0);
			setTimeout( ()=>{this.events[0] = true}, 500);
		}
		else if(!this.events[1]){
			this.player.setFrame(1);
			setTimeout( ()=>{this.events[1] = true}, 700);
		}
		else if(!this.events[2]){
			this.player.setFrame(13);
			setTimeout( ()=>{this.events[2] = true}, 700);
		}
		else if(!this.events[3]){
			this.exclamation.visible = true;
			setTimeout( ()=>{this.events[3] = true}, 500);
		}
		else if(!this.events[4]){
			this.exclamation.visible = false;
			setTimeout( ()=>{this.events[4] = true}, 500);
		}
		else if(!this.events[5]){
			this.newText(["Menos mal que aún no se ha ido el tren...", "Si me subo ahora, puede que incluso llegue antes de lo previsto."]);
			setTimeout( ()=>{this.events[5] = true}, 100);
		}
		else if(this.player.y > 160){
			this.player.move(0,-1);
		}
		else if(!this.events[6] && this.player.y <= 160){
			this.events[6] = true;
			setTimeout( ()=>{this.cameras.main.fadeOut(500, 0, 0, 0);}, 1000);
		}

		if(this.events[2] && this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0){
			this.player.setFrame(13);
		}
	}

	newText(text) {
		this.dialogManager.initDialog(text);
	}
}


export class intro2 extends LEVEL_BASE {
	constructor() {
		let nextlevel = "level1Map";
		super("intro2", nextlevel, '', '', 560, true);
	}
	

	// Creación de los elementos de la escena
	create() {
		super.create();

		this.cameras.main.fadeIn(500, 0, 0, 0);
		this.cameras.main.shake(20000, 0.001);
		

		// Añade la imagen del fondo 
		this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'introInside');

		//HUD (y Pausa)
		this.scene.launch('hud', { me: this });
		this.hud = this.scene.get('hud');
		this.scene.sleep(this.hud);

		// SoundManager
		this.soundManager = this.scene.get('soundManager');


		// DialogManager
		this.scene.launch('dialogManager');
		this.dialogManager = this.scene.get('dialogManager');

		// Jugador (con input desactivado)
		this.player.setPosition(350, 230)
		this.player.setScale(3.4);
		this.input.keyboard.enabled = false;

		// Array de eventos (inicialmente a false)
		this.events = [];
		for(let i = 0; i < 6; i++) this.events[i] = false;

	}

	// Secuencia de eventos marcados por tiempo
	update(t, dt) {
		this.player.setFrame(0);
		
		if(!this.events[0]){
			this.events[0] = true;
			this.events[1] = true;
			this.events[2] = true;
			this.events[3] = true;
			this.events[4] = true;

			setTimeout( ()=>{
				this.cameras.main.fadeOut(500, 0, 0, 0);
				
				setTimeout( ()=>{
					this.cameras.main.fadeIn(500,0,0,0);
					setTimeout( ()=>{this.events[1] = false;}, 1500);
				}, 1000);
			}, 2000);
		}
		else if(!this.events[1]){
			this.events[1] = true;
			this.events[2] = false;
			this.newText(["Qué sueño..."]);
		}
		else if(!this.events[2]){
			this.events[2] = true;
			this.events[3] = true;
			setTimeout( ()=>{
				this.cameras.main.fadeOut(500, 0, 0, 0);
				
				setTimeout( ()=>{
					this.cameras.main.fadeIn(500,0,0,0);
					setTimeout( ()=>{this.events[3] = false;}, 1500);
				}, 1000);
			}, 2000);
		}
		else if(!this.events[3]){
			this.events[3] = true;
			this.events[4] = false;
			this.newText(["Aún me queda un rato para llegar, no creo que importe si me duermo..."]);
		}
		else if(!this.events[4]){
			this.events[4] = true;
			this.cameras.main.fadeOut(500, 0, 0, 0);
			setTimeout( ()=>{
				this.soundManager.play("trainHorn");
				this.soundManager.playWithListener("accident", ()=>{
					this.soundManager.stopBGM("ambient")
					this.scene.start("level1Map");
				});
			}, 2000);
		}
	}

	newText(text) {
		this.dialogManager.initDialog(text);
	}

}
