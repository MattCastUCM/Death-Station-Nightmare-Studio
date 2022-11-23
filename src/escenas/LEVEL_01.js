import Cat from '../objetos/Cat.js';
import CardBoard from '../objetos/CartBoard.js';
import WoodBox from '../objetos/WoodBox.js';
import Persecutor from '../objetos/Persecutor.js';
import Lanzador from '../objetos/Lanzador.js';
import Trigger from '../objetos/Trigger.js';
import gameObject from '../objetos/gameObject.js';
import LEVEL_BASE from './LEVEL_BASE.js';
import EnemyManager from '../objetos/EnemyManager.js';
/**
 * Escena principal.
 * @extends LEVEL_BASE
 */
export default class LEVEL_01 extends LEVEL_BASE {
	constructor() {
		let nextlevel="level_aux";
		super("LEVEL_01",nextlevel,'level1','tiles',560);
	}
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		super.create();
		let scene = this; // Nos guardamos una referencia a la escena para usarla en la función anidada que viene a continuación
        //this.colisionlayer.setCollisionBetween(0,560);
		this.nextlevel=new Phaser.GameObjects.Sprite(this,7200,300,'selected');
		this.add.existing(this.nextlevel);
		this.physics.add.existing(this.nextlevel);
		//this.CreateMap();
		
		// this.physics.add.overlap(this.player,this.nextlevel,function(){
		// 	console.log(this);
		// },this);
		let enemyManager = new EnemyManager(this);
		let persecutor = enemyManager.CreateEnemy(40, 200, 'persecutor', this.player);
		persecutor.setScale(2);
		let lanzador = enemyManager.CreateEnemy(80, 300, 'lanzador', this.player);
		lanzador.setScale(2);

		// Gato
		//let gato = new Cat(this, 200, 400, 30, 30, 4, 4, 140);
		//this.cats.add(gato);
		//console.log(this.map);
        //crea objetos de mapa
		var cardBoardArray=this.map.createFromObjects('objetos',[
			{gid:561, classType: CardBoard,key: 'cartBoard'}]);

		
		this.cartBoardBoxes.addMultiple(cardBoardArray);
		var woodBoxesArray=this.map.createFromObjects('objetos',[
			{gid:562, classType: WoodBox,key: 'woodBox'}]);
		this.woodBoxes.addMultiple(woodBoxesArray);
		woodBoxesArray.forEach(obj => {
			obj.body.setImmovable();
		});
		// var EmenyPersecutorArray=this.map.createFromObjects('objetos',[
		// 	{gid:562, classType: Persecutor}]);
		// var EmenyLanzadorArray=this.map.createFromObjects('objetos',[
		// 	{gid:562, classType: Lanzador}]);
		//this.AddColision();

		//DIALOG
		//EJEMPLO1:al interactuar con un objeto
		// this.physics.world.on('collide', function (gameObject1, gameObject2, body1, body2) {
		// 	if (gameObject1 === gato && gameObject2 === woodBox1) {
		// 		woodBox1.destroyMe();
		// 		scene.newText(["No puede sbiiiiiiiiiiiiiiiiiiiiiiiiiibsaiwfibfjinhfnrnjsnksnfkjnfks< iibvywbrviwyriuwunksnfkjnfks", "Porqué es así"]); //array de strings

		// 	}
		// });

		//EJEMPLO 2: con Trigger
		let trigger1 = new Trigger(this, 300, 200, 30, 600);
		this.physics.add.overlap(this.player, trigger1, function () { scene.newText(["Dónde estoy", "Soy idiota"]); trigger1.destroy(); }); //array de strings

		
		//obtener una nueva arma
		let nuevaBotella = this.botella = new gameObject(this,7200, 400,200,200,100,0, 'botella',0).setScale(0.2);
		this.physics.add.overlap(this.player, nuevaBotella,()=>{this.player.HasNewWeapon('botella');nuevaBotella.destroy();});

		
	}

	/*Mandarle a dialogManager el texto que tiene que printear*/
	newText(text) {
		this.dialogManager.Init(text);
	}


	/*Informa al player y al hud*/
	DecreaseLife(player) {
		this.hud.changeLifeValue(player.GetHP());
		if(player.GetHP()<=0){
			this.scene.start('restart'); 

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
