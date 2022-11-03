import Personaje from '../objetos/personaje.js';
import Wall from '../objetos/wall.js';
import Cat from '../objetos/Cat.js';
import HealthBar from '../HUD/HealthBar.js';
import Pause from './pause.js';

//import Box from '../objetos/box.js';
/**
 * Escena principal.
 * @extends Phaser.Scene
 */

export default class level_aux extends Phaser.Scene {

	constructor() {
		super({ key: 'level_aux' });
	}
	preload() {
		this.load.image('fondo', 'assets/Mapa/boceto_interiorTren.png');
		this.load.spritesheet('personaje', 'assets/personajes/Estudiante_1.png', { frameWidth: 32, frameHeight: 48 });
		this.load.spritesheet('cat', 'assets/personajes/Gato.png', { frameWidth: 34, frameHeight: 34 });
		//this.load.spritesheet('box', 'assets/Box/box.png', {frameWidth: 64, frameHeight: 64})
		this.load.image('v','assets/enviroment/mask1.png');
		// this.load.tilemapTiledJSON('maps','mapas/qqq.json');
		// this.load.image('tile','assets/enviroment/map07_2.png')
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {

		//Imagen de fondo
		const f=this.add.image(0, 0, 'fondo').setOrigin(0, 0);
		//back.setScale(2);
		//this.add.image(0, 0, 'fondo').setOrigin(0, 0);
		//let wall = this.physics.add.group();

		//this.ShowLife()
		//Instanciamos nuestro personaje, que es un caballero, y la plataforma invisible que hace de suelo
		this.personaje = new Personaje(this, 20, this.sys.game.canvas.height / 2);
		this.personaje.setScale(2);

		this.gato = new Cat(this, 200, this.sys.game.canvas.height / 2)

		this.wall1 = new Wall(this, this.sys.game.canvas.height - 50);
		// let box1 = new Box(this, 200, 0, boxes);
		// let box2 = new Box(this, 400, 0, boxes);
	
		this.personaje.body.onCollide = true; // Activamos onCollide para poder detectar la colisión del caballero con el suelo
		
		let scene = this; // Nos guardamos una referencia a la escena para usarla en la función anidada que viene a continuación
		let hud=this.scene.launch('hudAux');
		this.healthBar = new HealthBar(this, 30, 20, 180, 20, 10);
		//this.hud=new HUD();
		//this.physics.add.collider(floor, boxes);
		this.physics.add.collider(this.personaje, this.wall1);
		this.physics.add.collider(this.personaje, this.gato,this.DecreaseLife.bind(this),null);
		
		//Menu de pausa
		this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

		
		const width = this.scale.width
		const height = this.scale.height
		const rt = this.make.renderTexture({
			width,
			height
		}, true)
		//rt.setDepth(4);
		// poner fondo a negro
		rt.fill(0x000000, 1)
		// dibuja la escena vacia 
		rt.draw(f)
		//poner un toque de azul a mapa 
		rt.setTint(0x5050b0)
		//0x0a2948
		//0x5050b0


		// var vision = this.make.sprite({
		// 	x: this.personaje.x,
		// 	y: this.personaje.y,
		// 	key: 'v',
		// 	add: false
		// })
		

		// vision.scale =4;
		//vision.startFollow(this.personaje);
		rt.mask = new Phaser.Display.Masks.BitmapMask(this, this.personaje.vision);
		rt.mask.invertAlpha = true;


		//camara que sigue a jugador (movimiento suave)
		this.cameras.main.startFollow(this.personaje,this.cameras.FOLLOW_LOCKON, 0.1, 0.1);
		//espacio de camara (si jugador sale de este espacio,la camara le sigue)
		//this.cameras.main.setDeadzone (0,this.cameras.main.centerY*2);
		

		// const map = this.make.tilemap({key: 'maps'});
		// const tileset=map.addTilesetImage('ooo','tile');
		// map.createLayer('ground',tileset);
		
	}
	
	DecreaseLife(){
		if(!this.personaje.hasColided){
			this.healthBar.decrease();
			this.personaje.DecreaseLife();
		}
	}
	update(t, dt){
		this.personaje.update(t,dt);
		this.deltaTime = dt;
		if(this.keyP.isDown){
			//this.scene.launch('Pause',{me: this.scene});
			//this.scene.pause();
			
		}
		// if(this.personaje.vision){
		// 	this.personaje.vision.setOrigin(this.personaje.x,this.personaje.y);
		// }
	}
}
