import Player from '../objetos/player.js';
// import Wall from '../objetos/wall.js';
// import Cat from '../objetos/cat.js';
// import HealthBar from '../HUD/HealthBar.js';
// import EnemyManager from './EnemyManager.js';
// import Pause from './pause.js';
//import Box from '../objetos/box.js';
/**
 * Escena principal.
 * @extends Phaser.Scene
 */

export default class level_map extends Phaser.Scene {

	constructor() {
		super({ key: 'level_map' });
	}

	preload() {
		this.load.image('fondo', 'assets/Mapa/boceto_interiorTren.png');
		this.load.spritesheet('personaje', 'assets/personajes/Estudiante_1.png', { frameWidth: 32, frameHeight: 48 });
		// this.load.spritesheet('cat', 'assets/personajes/Gato.png', { frameWidth: 34, frameHeight: 34 });
		// this.load.image('cuchillo', 'assets/survival kit/Sprite-0004.png');
		// this.load.spritesheet('personaje', 'assets/personajes/Estudiante_1.png', { frameWidth: 32, frameHeight: 48 });
		// this.load.spritesheet('persecutor', 'assets/personajes/Anciana.png', { frameWidth: 32, frameHeight: 48 });		
		// this.load.spritesheet('lanzador', 'assets/personajes/Estudiante 2.png', { frameWidth: 32, frameHeight: 48 });
		// this.load.image('mask', 'assets/enviroment/mask1.png');
        this.load.image("tiles","assets/Mapa/boceto_interiorTren.png");
		//this.load.image("a","assets/Mapa/metro_1_asientos_4_pack.png");
        this.load.tilemapTiledJSON('map',"mapas/level01.json");
      
		//this.load.spritesheet('box', 'assets/Box/box.png', {frameWidth: 64, frameHeight: 64})
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
       
        //const f = this.add.image(0, 0, 'tiles').setOrigin(0, 0);
        //console.log(this.cache.tilemap.get('map').data);
        const map = this.make.tilemap({ key: "map"});
       const tiles = map.addTilesetImage("tren","tiles");
	   //const obj=map.addTilesetImage("obj","a")
       var layer = map.createLayer('suelo', tiles, 0, 0);
       var objlayer=map.createLayer('objetos',tiles,0,0);
	   //var c=map.createLayer('p',obj,0,0);
       objlayer.setCollisionBetween(0,628);


		// Jugador a centro segun eje Y 
		let player = new Player(this, 50, this.cameras.main.centerY, 15, 15, 8, 30, 140);
		player.setScale(2.5);
		player.body.onCollide = true; // Activamos onCollide para poder detectar la colisión del caballero con el suelo
		
        this.physics.add.collider(player,objlayer);



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
		

		if(this.keyP.isDown){
			this.scene.launch('Pause',{me: this.scene});
			this.scene.pause();
		}
	}
}
