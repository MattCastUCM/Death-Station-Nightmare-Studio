import Player from '../objetos/player.js';
import Cat from '../objetos/Cat.js';
import EnemyManager from '../objetos/EnemyManager.js';
import CardBoard from '../objetos/CartBoard.js'
import WoodBox from '../objetos/WoodBox.js'
import Trigger from '../objetos/Trigger.js'
/**
 * Escena principal.
 * @extends Phaser.Scene
 */

export default class LEVEL_01 extends Phaser.Scene {

	constructor() {
		super({ key: 'LEVEL_01' });
	}

	preload() {
		//gameObjects
		this.load.spritesheet('personaje', 'assets/personajes/Estudiante_1.png', { frameWidth: 32, frameHeight: 48 });
		this.load.spritesheet('cat', 'assets/personajes/Gato.png', { frameWidth: 34, frameHeight: 34 });
		this.load.spritesheet('persecutor', 'assets/personajes/Anciana.png', { frameWidth: 32, frameHeight: 48 });
		this.load.spritesheet('lanzador', 'assets/personajes/Estudiante 2.png', { frameWidth: 32, frameHeight: 48 });
		this.load.image('cuchillo', 'assets/survival kit/Sprite-0004.png');
		this.load.spritesheet('topo', 'assets/personajes/Dig.png', { frameWidth: 34, frameHeight: 31 });
		this.load.spritesheet('woodBox', 'assets/objects/cajaMadera.png', { frameWidth: 64, frameHeight: 64 })
		this.load.spritesheet('cartBoard', 'assets/objects/cajaCarton.png', { frameWidth: 64, frameHeight: 64 });

		//otros
		this.load.spritesheet('dialogBox', 'assets/HUD/textBox.png', { frameWidth: 600, frameHeight: 300 });
        //tile map
        this.load.image("tiles","assets/Mapa/mapa2.png");
        this.load.tilemapTiledJSON('map',"mapas/LEVEL_01.json");
      

	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {

		let scene = this; // Nos guardamos una referencia a la escena para usarla en la función anidada que viene a continuación

        //TILE MAP
        const map = this.make.tilemap({ key: "map"});
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
		//

		// Jugador
		let player = new Player(this, 7000, this.cameras.main.centerY, 15, 15, 8, 30, 140);
		player.body.onCollide = true; // Activamos onCollide para poder detectar la colisión del player
		player.setScale(2.5);

		// Gato
		let gato = new Cat(this, 200, 400, 30, 30, 4, 4, 140);
		gato.body.onCollide = true;

		//CAJAS
		let cartBoardBoxes = this.physics.add.group();
		let woodBoxes = this.physics.add.group();

        //CREACION DE ENEMIGOS
		let enemyManager = new EnemyManager(this);
		this.enemies = this.physics.add.group();

       

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
			cartBoardContainer.list[i]=new CardBoard(this,cartBoardContainer.list[i].x,cartBoardContainer.list[i].y,cartBoardBoxes);
		}
		for(let i=0;i<woodBoxesContainer.list.length;i++){
			woodBoxesContainer.list[i]=new WoodBox(this,woodBoxesContainer.list[i].x,woodBoxesContainer.list[i].y,woodBoxes);
		}
        //enemigos
        for(let i=0;i<EmenyPersecutorContainer.list.length;i++){
			EmenyPersecutorContainer.list[i]=enemyManager.CreateEnemy(EmenyPersecutorContainer.list[i].x, EmenyPersecutorContainer.list[i].y,'persecutor', player);
			EmenyPersecutorContainer.list[i].setScale(2);
		}
		for(let i=0;i<EmenyLanzadorContainer.list.length;i++){
			EmenyLanzadorContainer.list[i]=enemyManager.CreateEnemy(EmenyLanzadorContainer.list[i].x, EmenyLanzadorContainer.list[i].y,'lanzador', player);
			EmenyLanzadorContainer.list[i].setScale(2);
		}




        //colisión con tile map
        this.physics.add.collider(player,colisionlayer);
		this.physics.add.collider(cartBoardBoxes,colisionlayer);
		this.physics.add.collider(cartBoardBoxes, cartBoardBoxes);
		this.physics.add.collider(gato,colisionlayer);
		this.physics.add.collider(this.enemies,colisionlayer);


		//colisión player-cajas,cajas-cajas
		this.physics.add.collider(woodBoxes, cartBoardBoxes);
		this.physics.add.collider(player, cartBoardBoxes);
		this.physics.add.collider(player, woodBoxes);
		//enemigos caja
		this.physics.add.collider(this.enemies, cartBoardBoxes);
		this.physics.add.collider(this.enemies, woodBoxes);

		
		this.physics.add.collider(this.enemies, this.enemies);


		//Prueba, en la escena, hay q hacerlo en arma (hacha)
		this.physics.add.collider(gato, woodBoxes);

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
		this.physics.add.overlap(player, trigger1, function () { scene.newText(["Dónde estoy", "Soy idiota"]); trigger1.destroy(); }); //array de strings

		// Grupo de paredes (estático)
		
		this.physics.add.collider(player, gato);

		//Colisión enemigo
		this.physics.add.collider(player, this.enemies, ()=>player.decreaseHP(), null);
		

		//camara que sigue a jugador (movimiento suave)
		this.cameras.main.startFollow(player, this.cameras.FOLLOW_LOCKON, 0.1, 0.1);
		//espacio de camara (si jugador sale de este espacio,la camara le sigue)
		this.cameras.main.setDeadzone (0,this.cameras.main.centerY*2);
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

	}
}
