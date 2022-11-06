import Player from '../objetos/player.js';
import Wall from '../objetos/wall.js';
import Cat from '../objetos/cat.js';
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
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {

		//Imagen de fondo
		this.add.image(0, 0, 'fondo').setOrigin(0, 0);
		//back.setScale(2);
		//this.add.image(0, 0, 'fondo').setOrigin(0, 0);
		//let wall = this.physics.add.group();

		//this.ShowLife()
		//Instanciamos nuestro personaje, que es un caballero, y la plataforma invisible que hace de suelo
		//this.personaje = new P(this, 20, this.sys.game.canvas.height / 2);
		//this.personaje.setScale(2.5);


		// Jugador
		this.player = new Player(this, 50, 400, 20, 20, 5, 20, 140);
		this.player.setScale(2.5);

		// Gato
		this.gato = new Cat(this, 200, 400, 34, 34, 0, 0, 140);


		// Grupo de paredes (estático)
		this.walls = this.physics.add.staticGroup();
		this.walls.add(new Wall(this, 0, 0, this.sys.game.canvas.width + 15, this.sys.game.canvas.height / 2.7));
		this.walls.add(new Wall(this, 285, 200, 260, 60));
		this.walls.add(new Wall(this, 710, 200, 140, 60));
		this.walls.add(new Wall(this, 285, 530, 260, 60));
		this.walls.add(new Wall(this, 710, 530, 140, 60));


		// let box1 = new Box(this, 200, 0, boxes);
		// let box2 = new Box(this, 400, 0, boxes);
	
		this.player.body.onCollide = true; // Activamos onCollide para poder detectar la colisión del caballero con el suelo
		
		let scene = this; // Nos guardamos una referencia a la escena para usarla en la función anidada que viene a continuación
		let hud=this.scene.launch('hudAux');
		this.healthBar = new HealthBar(this, 30, 20, 180, 20, 10);
		//this.hud=new HUD();
		//this.physics.add.collider(floor, boxes);
		this.physics.add.collider(this.player, this.walls);
		this.physics.add.collider(this.player, this.gato);
		
		//Menu de pausa
		this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

	}

	DecreaseLife(){
		if(!this.player.hasColided){
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
