import Player from '../objetos/player.js';
// import Wall from '../objetos/wall.js';
 import Cat from '../objetos/cat.js';
// import HealthBar from '../HUD/HealthBar.js';
 import EnemyManager from './EnemyManager.js';
// import Pause from './pause.js';
//import Box from '../objetos/box.js';
import WoodBox from '../objetos/WoodBox.js';
import CardBoard from '../objetos/CartBoard.js'
/**
 * Escena principal.
 * @extends Phaser.Scene
 */

export default class level_map extends Phaser.Scene {

	constructor() {
		super({ key: 'level_map' });
	}

	preload() {
		this.load.image('elec','assets/Mapa/caja electricidad_.png')
		this.load.spritesheet('cat', 'assets/personajes/Gato.png', { frameWidth: 34, frameHeight: 34 });
		this.load.image('fondo', 'assets/Mapa/boceto_interiorTren.png');
		this.load.spritesheet('personaje', 'assets/personajes/Estudiante_1.png', { frameWidth: 32, frameHeight: 48 });
		 this.load.image('cuchillo', 'assets/survival kit/Sprite-0004.png');
		// this.load.image('mask', 'assets/enviroment/mask1.png');
		this.load.spritesheet('cartBoard', 'assets/objects/cajaCarton.png', { frameWidth: 64, frameHeight: 64 });
		this.load.spritesheet('woodBox', 'assets/objects/cajaMadera.png', { frameWidth: 64, frameHeight: 64 });
		this.load.spritesheet('persecutor', 'assets/personajes/Anciana.png', { frameWidth: 32, frameHeight: 48 });		
		this.load.spritesheet('lanzador', 'assets/personajes/Estudiante 2.png', { frameWidth: 32, frameHeight: 48 });

        this.load.image("tiles","assets/Mapa/boceto_interiorTren.png");
		this.load.image("a","assets/Mapa/metro_1_asientos_4_pack.png");
        this.load.tilemapTiledJSON('map',"mapas/level01.json");
      
		//this.load.spritesheet('box', 'assets/Box/box.png', {frameWidth: 64, frameHeight: 64})
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		
        //const f = this.add.image(0, 0, 'elec').setOrigin(0, 0);
        //console.log(this.cache.tilemap.get('map').data);
		const map = this.make.tilemap({ key: "map"});
		const tiles = map.addTilesetImage("tren","tiles");
	   
    	var layer = map.createLayer('suelo', tiles, 0, 0);
    	var objlayer=map.createLayer('colision',tiles,0,0);
	   
    	objlayer.setCollisionBetween(0,628);

		this.gato = new Cat(this, 200, 400, 30, 30, 4, 4, 140);
		// Jugador a centro segun eje Y 
		
		let cartBoardBoxes = this.physics.add.group();
		//let cartBoard1 = new CardBoard(this, 300, 300, cartBoardBoxes);
		let woodBoxes = this.physics.add.group();
		//let woodBox1 = new WoodBox(this, 600, 300, woodBoxes);
		var cartBoardContainer=this.add.container(this);
		var woodBoxesContainer=this.add.container(this);
		var EmenyPersecutorContainer=this.add.container(this);
		var EmenyLanzadorContainer=this.add.container(this);

		var objetos=map.createFromObjects('objeto',[
		{
			gid:639,
			//classType:  CardBoard
			container: cartBoardContainer
		},
		{
			gid:640,
			container: woodBoxesContainer
		},
		{
			gid:644,
			container: EmenyPersecutorContainer
		},
		{
			gid:645,
			container: EmenyLanzadorContainer

		}
		]);
		for(let i=0;i<cartBoardContainer.list.length;i++){
			cartBoardContainer.list[i]=new CardBoard(this,cartBoardContainer.list[i].x,cartBoardContainer.list[i].y,cartBoardBoxes);
		}
		for(let i=0;i<woodBoxesContainer.list.length;i++){
			woodBoxesContainer.list[i]=new WoodBox(this,woodBoxesContainer.list[i].x,woodBoxesContainer.list[i].y,woodBoxes);
		}

		let player = new Player(this, 50, this.cameras.main.centerY, 15, 15, 8, 30, 140);
		player.setScale(2.5);
		let enemyManager = new EnemyManager(this);
		console.log(EmenyPersecutorContainer);
		for(let i=0;i<EmenyPersecutorContainer.list.length;i++){
			EmenyPersecutorContainer.list[i]=enemyManager.CreateEnemy(EmenyPersecutorContainer.list[i].x, EmenyPersecutorContainer.list[i].y,'persecutor', player);
			EmenyPersecutorContainer.list[i].setScale(2);
		}
		
		// this.persecutor = enemyManager.CreateEnemy(20, this.sys.game.canvas.height / 2,'persecutor', player);
		// this.persecutor.setScale(2);
		// this.lanzador = enemyManager.CreateEnemy(20, this.sys.game.canvas.height / 2,'lanzador', player);
		// this.lanzador.setScale(2);
		console.log(EmenyPersecutorContainer);
		for(let i=0;i<EmenyLanzadorContainer.list.length;i++){
			EmenyLanzadorContainer.list[i]=enemyManager.CreateEnemy(EmenyLanzadorContainer.list[i].x, EmenyLanzadorContainer.list[i].y,'lanzador', player);
			EmenyLanzadorContainer.list[i].setScale(2);
		}


		// var elec=map.createFromObjects('objeto',{
		// 	gid:630,
		// 	key:'elec'
		// });
		// console.log(cartBoardContainer)

		
		//player.body.onCollide = true; // Activamos onCollide para poder detectar la colisión del caballero con el suelo


        this.physics.add.collider(player,objlayer);
		this.physics.add.collider(cartBoardBoxes,objlayer);
		this.physics.add.collider(cartBoardBoxes, cartBoardBoxes);
		this.physics.add.collider(this.gato,objlayer);

		this.physics.add.collider(player, this.gato);

		this.physics.add.collider(woodBoxes, cartBoardBoxes);

		this.physics.add.collider(player, cartBoardBoxes);

		this.physics.add.collider(player, woodBoxes);
		

		let scene = this; // Nos guardamos una referencia a la escena para usarla en la función anidada que viene a continuación
		let hud=this.scene.launch('hudAux');
		//this.healthBar = new HealthBar(this, 30, 20, 180, 20, 10);
		//this.hud=new HUD();
		//this.physics.add.collider(floor, boxes);
	

		//Menu de pausa
		this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);



		//camara que sigue a jugador (movimiento suave)
		this.cameras.main.startFollow(player,this.cameras.FOLLOW_LOCKON, 0.1, 0.1);

		//espacio de camara (si jugador sale de este espacio,la camara le sigue)
		this.cameras.main.setDeadzone (0,this.cameras.main.centerY*3);
	}
	

	DecreaseLife(){
		if(!player.hasColided){
			this.healthBar.decrease();
			this.player.decreaseHP();
		}
	}


	update(t, dt){

		this.deltaTime = dt;
		this.gato.update();
		if(this.keyP.isDown){
			this.scene.launch('Pause',{me: this.scene});
			this.scene.pause();
		}
	}
}
