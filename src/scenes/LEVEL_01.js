import LEVEL_BASE from './LEVEL_BASE.js';
import CardBoard from '../gameObjects/cardBoard.js';
import WoodBox from '../gameObjects/woodBox.js';
import Cat from '../gameObjects/enemies/cat.js';
import Persecutor from '../gameObjects/enemies/persecutor.js';
import Lanzador from '../gameObjects/enemies/shooter.js';
import Trigger from '../gameObjects/trigger.js';
import InteractiveObjects from '../gameObjects/interactiveObjects.js';

export default class LEVEL_01 extends LEVEL_BASE {	
	/**
	 * Nivel 1
	 * @extends LEVEL_BASE
	 */
	constructor() {
		let nextlevel = "level2Map";
		super("LEVEL_01", nextlevel, 'level1', 'tiles', 560, false);
	}


	// Creación de los elementos de la escena
	create() {
		super.create();

		//DIALOGMANAGER
		this.scene.launch('dialogManager');
		this.dialogManager = this.scene.get('dialogManager');

		//HUD (y Pausa)
		this.scene.launch('hud', { me: this });
		this.hud = this.scene.get('hud');

		//CAMARA
		this.cameras.main.setDeadzone(0, this.cameras.main.centerY * 2);

		//BGM
		this.soundManager.playBGM("level1");

		this.player.weaponManager.nextLevel(false, false, false);

		let scene = this; // Nos guardamos una referencia a la escena


		//Gato
		let gato = new Cat(this, 200, 400);
		gato.setScale(1.2);
		//this.cats.add(gato);30, 30,

		// Cajas de cartón
		let cardBoardArray = this.map.createFromObjects('objetos', [{ gid: 561, classType: CardBoard, key: 'cartBoard' }]);
		this.cartBoardBoxes.addMultiple(cardBoardArray);
		cardBoardArray.forEach(obj => {
			obj.body.setImmovable();
		});

		// Cajas de madera
		let woodBoxesArray = this.map.createFromObjects('objetos', [{ gid: 562, classType: WoodBox, key: 'woodBox' }]);
		this.woodBoxes.addMultiple(woodBoxesArray);
		woodBoxesArray.forEach(obj => {
			obj.body.setImmovable();
		});

		// Persecutores
		let EnemyPersecutorArray = this.map.createFromObjects('objetos', [{ gid: 564, classType: Persecutor, key: 'persecutor' }]);
		EnemyPersecutorArray.forEach(obj => {
			obj.setScale(2);
		});
		this.enemies.addMultiple(EnemyPersecutorArray);

		// Lanzadores
		let EnemyLanzadorArray = this.map.createFromObjects('objetos', [{ gid: 565, classType: Lanzador, key: 'lanzador' }]);	
		this.enemies.addMultiple(EnemyLanzadorArray);
		EnemyLanzadorArray.forEach(obj => {
			obj.setScale(2.5);
			obj.body.setImmovable();
		});


		//obtener una nueva arma
		let hacha = this.map.createFromObjects('objetos', [{ name: 'hacha', key: 'hacha' }]);
		scene.physics.add.existing(hacha[0]);
		scene.physics.add.overlap(this.player, hacha[0], () => { this.newText(["Hay un hacha, quizás pueda usarlo para romper las cajas de madera..."]);this.player.HasNewWeapon('hacha'); hacha[0].destroy(); });
		
		
		// Monólogo inicial
		this.input.keyboard.enabled = false;
		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, (cam, effect) => {
			setTimeout(()=>{
				this.player.move(1,0);

				setTimeout( ()=>{
					this.player.move(0,-1);
					
					setTimeout( ()=>{
						this.player.move(0,1);

						setTimeout( ()=>{
							this.player.move(0,0);
							this.input.keyboard.enabled = true;
							this.newText(["¿Dónde estoy...?", 
							"Lo último que recuerdo es que me quedé dormido en el tren...",
							"¿Me he pasado de parada...?", "¿Y por qué no hay nadie aquí?",
							"Como sea, tengo que encontrar una manera de salir de aquí."])
						}, 1000);
					}, 1000);
				}, 1000);
			}, 500);	
		});

		
	}


	// Le manda al DialogManager el texto que tiene que imprimir
	newText(text) {
		this.dialogManager.initDialog(text);
	}


	// Informa al jugador y al HUD que ha bajado la vida
	DecreaseLife(player) {
		this.hud.changeLifeValue(player.hp);
		if (player.hp <= 0) {
			this.hud.quitInventory('hacha');
			this.scene.start('restart', { me: this });
			this.soundManager.stopBGM("level1");

		}

	}


	restart() {
		this.hud.quitInventory('hacha');
		this.soundManager.stopBGM("level1");
		this.scene.start('LEVEL_01');
	}
	

	// Pausa el DialogManager (llamado por el HUD)
	pauseDialog() {
		this.dialogManager.scene.pause();
	}
	resumeDialog() {
		this.dialogManager.scene.resume();
	}

}

