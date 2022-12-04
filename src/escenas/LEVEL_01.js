import Cat from '../objetos/Cat.js';
import CardBoard from '../objetos/CartBoard.js';
import WoodBox from '../objetos/WoodBox.js';
import Persecutor from '../objetos/Persecutor.js';
import Lanzador from '../objetos/Lanzador.js';
import Trigger from '../objetos/Trigger.js';
import gameObject from '../objetos/gameObject.js';
import LEVEL_BASE from './LEVEL_BASE.js';

//A BORRAR
import Topo from '../objetos/Topo.js';
/**
 * Nivel 1
 * @extends LEVEL_BASE
 */
export default class LEVEL_01 extends LEVEL_BASE {
	constructor() {
		let nextlevel = "level2Map";
		super("LEVEL_01", nextlevel, 'level1', 'tiles', 560);
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
		this.cameras.main.setDeadzone (0,this.cameras.main.centerY*2);

		//BGM
		this.soundManager.playBGM("level1");

		let scene = this; // Nos guardamos una referencia a la escena para usarla en la función anidada que viene a continuación
		
		//Gato
		let gato = new Cat(this, 200, 400, 30, 30, 4, 4, 140);
		//this.cats.add(gato);
		let cardBoardArray = this.map.createFromObjects('objetos', [
			{ gid: 561, classType: CardBoard, key: 'cartBoard' }]);


		this.cartBoardBoxes.addMultiple(cardBoardArray);
		let woodBoxesArray = this.map.createFromObjects('objetos', [
			{ gid: 562, classType: WoodBox, key: 'woodBox' }]);
		this.woodBoxes.addMultiple(woodBoxesArray);
		woodBoxesArray.forEach(obj => {
			obj.body.setImmovable();
		});

		let EmenyPersecutorArray = this.map.createFromObjects('objetos', [
			{ gid: 564, classType: Persecutor, key: 'persecutor' }]);
		EmenyPersecutorArray.forEach(element => {
			element.setScale(2);
		});

		this.enemies.addMultiple(EmenyPersecutorArray);
		let EmenyLanzadorArray = this.map.createFromObjects('objetos', [
			{ gid: 565, classType: Lanzador, key: 'lanzador' }]);
		EmenyLanzadorArray.forEach(element => {
			element.setScale(2);
		});
		this.enemies.addMultiple(EmenyLanzadorArray);

		

		//this.add.image(0, 0, 'nose').setOrigin(0, 0);

		// scene.physics.world.on('collide', function(gameObject1, gameObject2, body1, body2) {

		// 	if(gameObject1 === scene.player && scene.cartBoardBoxes.contains(gameObject2)){
		// 		gameObject2.body.setImmovable(false);			
		// 	}
		// 	if( scene.enemies.contains(gameObject1)&& scene.cartBoardBoxes.contains(gameObject2)){
		// 		console.log("algooo");
		// 		gameObject2.setImmovable(true);
		// 	}


		// });	

		//DIALOG
		//EJEMPLO1:al interactuar con un objeto
		// this.physics.world.on('collide', function (gameObject1, gameObject2, body1, body2) {
		// 	if (gameObject1 === gato && gameObject2 === woodBox1) {
		// 		woodBox1.destroyMe();
		// 		scene.newText(["No puede sbiiiiiiiiiiiiiiiiiiiiiiiiiibsaiwfibfjinhfnrnjsnksnfkjnfks< iibvywbrviwyriuwunksnfkjnfks", "Porqué es así"]); //array de strings

		// 	}
		// });

		//EJEMPLO 2: con Trigger
		let trigger1 = new Trigger(scene, 300, 200, 30, 600);
		this.physics.add.overlap(this.player, trigger1, function () { scene.newText(["Dónde estoy", "Soy idiota"]); trigger1.destroy(); }); //array de strings


		
		//obtener una nueva arma
		let nuevaBotella = new gameObject(this, 100, 400, 200, 200, 100, 0, 'botella', 0).setScale(0.2);
		this.physics.add.overlap(this.player, nuevaBotella, () => { this.player.HasNewWeapon('botella'); nuevaBotella.destroy(); });
		let hacha = this.map.createFromObjects('objetos', [{ name: 'hacha',  key: 'hacha' }]);
		scene.physics.add.existing(hacha[0]);
		scene.physics.add.overlap(this.player, hacha[0], () => { this.player.HasNewWeapon('hacha'); hacha[0].destroy(); });
	}

	/*Mandarle a dialogManager el texto que tiene que printear*/
	newText(text) {
		this.dialogManager.Init(text);
	}



	/*Informa al player y al hud*/
	DecreaseLife(player) {
		this.hud.changeLifeValue(player.GetHP());
		if (player.GetHP() <= 0) {
			this.scene.start('restart', { me: this });
			this.soundManager.stopBGM("level1");
		}

	}

	/*Para pausar el dialogManager , llamado por el hud*/
	pauseDialog() {
		this.dialogManager.scene.pause();
	}
	resumeDialog() {
		this.dialogManager.scene.resume();
	}

	update(t, dt) {

		//this.scene.start('menu'); 

	}

}
