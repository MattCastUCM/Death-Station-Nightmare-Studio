import perosnaje from '../objetos/personaje.js';
import Wall from '../objetos/wall.js';
import Cat from '../objetos/Cat.js';
//import Box from '../objetos/box.js';
/**
 * Escena principal.
 * @extends Phaser.Scene
 */

export default class level_aux extends Phaser.Scene {
	
	constructor() {
		super({ key: 'level_aux' });
	}
	
	preload(){
		this.load.image('fondo', 'assets/Mapa/boceto_interiorTren.png');
		this.load.spritesheet('personaje', 'assets/personajes/Estudiante_1.png', {frameWidth: 32, frameHeight: 48});
		this.load.spritesheet('cat','assets/personajes/Gato.png', {frameWidth: 34, frameHeight: 34});
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
		
		//Instanciamos nuestro personaje, que es un caballero, y la plataforma invisible que hace de suelo
		let peronaje = new perosnaje(this, 20,this.sys.game.canvas.height/2 );
        peronaje.setScale(2);

		let gato=new Cat(this,200,this.sys.game.canvas.height/2 )
		
		let wall1=new Wall(this,this.sys.game.canvas.height-50);
		// let box1 = new Box(this, 200, 0, boxes);
		// let box2 = new Box(this, 400, 0, boxes);

		peronaje.body.onCollide = true; // Activamos onCollide para poder detectar la colisión del caballero con el suelo

		let scene = this; // Nos guardamos una referencia a la escena para usarla en la función anidada que viene a continuación

		//this.physics.add.collider(floor, boxes);
		this.physics.add.collider(peronaje, wall1);
		this.physics.add.collider(peronaje, gato);

	}

}
