import Cat from '../objetos/Cat.js';
import CardBoard from '../objetos/CartBoard.js';
import WoodBox from '../objetos/WoodBox.js';
import Persecutor from '../objetos/Persecutor.js';
import Lanzador from '../objetos/Lanzador.js';
import Trigger from '../objetos/Trigger.js';
import gameObject from '../objetos/gameObject.js';
import LEVEL_BASE from './LEVEL_BASE.js';

import InteractiveObjects from '../objetos/InteractiveObjects.js';


/**
 * Nivel 1
 * @extends LEVEL_BASE
 */
export default class LEVEL_01 extends LEVEL_BASE {
	constructor() {
		let nextlevel = "level2Map";
		super("LEVEL_01", nextlevel, 'level1', 'tiles', 560, false);

	}
	/**
	 * Creación de los elementos de la escena principal de juego
	 */
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
		let EmenyPersecutorArray = this.map.createFromObjects('objetos', [{ gid: 564, classType: Persecutor, key: 'persecutor' }]);
		EmenyPersecutorArray.forEach(obj => {
			obj.setScale(2);
		});
		this.enemies.addMultiple(EmenyPersecutorArray);

		// Lanzadores
		let EmenyLanzadorArray = this.map.createFromObjects('objetos', [{ gid: 565, classType: Lanzador, key: 'lanzador' }]);	
		this.enemies.addMultiple(EmenyLanzadorArray);
		EmenyLanzadorArray.forEach(obj => {
			obj.setScale(2.5);
			obj.body.setImmovable();
		});


		//EJEMPLO 2: con Trigger
		let trigger1 = new Trigger(scene, 300, 200, 30, 600);
		this.physics.add.overlap(this.player, trigger1, function () { scene.newText(["Dónde estoy", "Soy idiota"]); trigger1.destroy(); }); //array de strings

		//obtener una nueva arma
		let hacha = this.map.createFromObjects('objetos', [{ name: 'hacha', key: 'hacha' }]);
		scene.physics.add.existing(hacha[0]);
		scene.physics.add.overlap(this.player, hacha[0], () => { this.newText(["Hay un hacha, quizás pueda usarlo para romper las cajas de madera..."]);this.player.HasNewWeapon('hacha'); hacha[0].destroy(); });


		
		let pruebaInteractiveObject = new InteractiveObjects(this, 200, 400, 20, 20, 0, 0, 'rataInmunda', 0, ["Prueba de rata"], this.player);
	}


	/*Mandarle a dialogManager el texto que tiene que printear*/
	newText(text) {
		this.dialogManager.Init(text);
	}



	/*Informa al player y al hud*/
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

	/*Para pausar el dialogManager , llamado por el hud*/
	pauseDialog() {
		this.dialogManager.scene.pause();
	}
	resumeDialog() {
		this.dialogManager.scene.resume();
	}


}

