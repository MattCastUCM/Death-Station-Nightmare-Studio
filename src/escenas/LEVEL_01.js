import Player from '../objetos/player.js';
import Cat from '../objetos/Cat.js';
import EnemyManager from '../objetos/EnemyManager.js';
import CardBoard from '../objetos/CartBoard.js'
import WoodBox from '../objetos/WoodBox.js'
import Trigger from '../objetos/Trigger.js'
import gameObject from '../objetos/gameObject.js';
/**
 * Escena principal.
 * @extends Phaser.Scene
 */

export default class LEVEL_01 extends Phaser.Scene {

	constructor() {
		super({ key: 'LEVEL_01' });
	}
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {

		let scene = this; // Nos guardamos una referencia a la escena para usarla en la función anidada que viene a continuación

        //TILE MAP
        const map = this.make.tilemap({ key: "level1"});
        const tiles = map.addTilesetImage("mapa","tiles");
        var fondolayer = map.createLayer('fondo', tiles, 0, 0);
        var colisionlayer=map.createLayer('colision',tiles,0,0);
        //poner colision a layer
        colisionlayer.setCollisionBetween(0,560);

        
		//DIALOGMANAGER
		this.scene.launch('dialogManager');
		this.dialogManager = this.scene.get('dialogManager');

		//HUD (y Pausa)
		this.scene.launch('hud', { me: this });
		this.hud = this.scene.get('hud');

		// Grupos
		this.enemies = this.physics.add.group();
		this.cartBoardBoxes = this.physics.add.group();
		this.woodBoxes = this.physics.add.group();

		// Jugador
		this.player = new Player(this, 7000, this.cameras.main.centerY, 15, 15, 8, 30, 140);
		this.player.body.onCollide = true; // Activamos onCollide para poder detectar la colisión del player
		this.player.setScale(2.5);

		 this.nextlevel=new Phaser.GameObjects.Sprite(this,7200,300,'selected');
		this.add.existing(this.nextlevel);
		this.physics.add.existing(this.nextlevel);

		// this.physics.add.overlap(this.player,this.nextlevel,function(){
		// 	console.log(this);
			
		// },this);
		

		// Gato
		let gato = new Cat(this, 200, 400, 30, 30, 4, 4, 140);
		gato.body.onCollide = true;

        //CREACION DE ENEMIGOS
		let enemyManager = new EnemyManager(this);

        //crea objetos de mapa
        var cartBoardContainer=this.add.container(this);
		var woodBoxesContainer=this.add.container(this);
		var EmenyPersecutorContainer=this.add.container(this);
		var EmenyLanzadorContainer=this.add.container(this);

		var objetos=map.createFromObjects('objetos',[
		{gid:561, container: cartBoardContainer},//classType:  CardBoard
		{gid:562, container: woodBoxesContainer},
		{gid:564, container: EmenyPersecutorContainer},
		{gid:565, container: EmenyLanzadorContainer}
		]);
        //cajas
		for(let i=0;i<cartBoardContainer.list.length;i++){
			cartBoardContainer.list[i]=new CardBoard(this,cartBoardContainer.list[i].x,cartBoardContainer.list[i].y,this.cartBoardBoxes);
		}
		for(let i=0;i<woodBoxesContainer.list.length;i++){
			woodBoxesContainer.list[i]=new WoodBox(this,woodBoxesContainer.list[i].x,woodBoxesContainer.list[i].y,this.woodBoxes);
		}
        //enemigos
        for(let i=0;i<EmenyPersecutorContainer.list.length;i++){
			enemyManager.CreateEnemy(EmenyPersecutorContainer.list[i].x, EmenyPersecutorContainer.list[i].y,'persecutor', this.player);
			//EmenyPersecutorContainer.list[i].setScale(2);
		}
		for(let i=0;i<EmenyLanzadorContainer.list.length;i++){
			enemyManager.CreateEnemy(EmenyLanzadorContainer.list[i].x, EmenyLanzadorContainer.list[i].y,'lanzador', this.player);
			//EmenyLanzadorContainer.list[i].setScale(3);
		}






        //colisión con tile map
        this.physics.add.collider(this.player,colisionlayer);
		this.physics.add.collider(this.cartBoardBoxes,colisionlayer);
		this.physics.add.collider(this.cartBoardBoxes, colisionlayer);
		this.physics.add.collider(gato,colisionlayer);
		this.physics.add.collider(this.enemies,colisionlayer);


		//colisión player-cajas,cajas-cajas
		this.physics.add.collider(this.woodBoxes, this.cartBoardBoxes);
		this.physics.add.collider(this.woodBoxes, this.cartBoardBoxes);
		this.physics.add.collider(this.player, this.cartBoardBoxes);
		this.physics.add.collider(this.player, this.woodBoxes);
		//enemigos caja
		this.physics.add.collider(this.enemies, this.cartBoardBoxes);
		this.physics.add.collider(this.enemies, this.woodBoxes);

		
		//this.physics.add.collider(this.enemies, this.enemies);


		//Prueba, en la escena, hay q hacerlo en arma (hacha)
		this.physics.add.collider(gato, this.woodBoxes);

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
		// Grupo de paredes (estático)
		
		this.physics.add.collider(this.player, gato);

		//Colisión enemigo
		this.physics.add.overlap(this.player, this.enemies, ()=>this.player.decreaseHP(), null);
		

		//camara que sigue a jugador (movimiento suave)
		this.cameras.main.startFollow(this.player, this.cameras.FOLLOW_LOCKON, 0.1, 0.1);
		//espacio de camara (si jugador sale de este espacio,la camara le sigue)
		this.cameras.main.setDeadzone (0,this.cameras.main.centerY*2);

		
	}

	Next(){
		this.scene.start('level_aux');
	}

	/*Mandarle a dialogManager el texto que tiene que printear*/
	newText(text) {
		this.dialogManager.Init(text);
	}


	/*Informa al player y al hud*/
	DecreaseLife(player) {
		this.hud.changeLifeValue(player.GetHP());
		
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
