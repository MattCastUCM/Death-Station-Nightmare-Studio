import Personaje from '../src/objetos/personaje.js';
import Wall from '../src/objetos/wall.js';
import Cat from '../src/objetos/Cat.js';
import CardBoard from './CartBoard.js'
import WoodBox from './WoodBox.js'

/**
 * Escena principal.
 * @extends Phaser.Scene
 */

export default class Scene_Nanxi extends Phaser.Scene {

	constructor() {
		super({ key: 'level_aux' });
	}
	preload() {
		this.load.image('fondo', 'assets/Mapa/boceto_interiorTren.png');
		this.load.spritesheet('personaje', 'assets/personajes/Estudiante_1.png', { frameWidth: 32, frameHeight: 48 });
		this.load.spritesheet('cat', 'assets/personajes/Gato.png', { frameWidth: 34, frameHeight: 34 });
		this.load.spritesheet('cartBoard', 'assets/objects/cajaCarton.png', {frameWidth: 64, frameHeight: 64});
		this.load.spritesheet('woodBox', 'assets/objects/cajaMadera.png', {frameWidth: 64, frameHeight: 64})

	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		let scene = this; // Nos guardamos una referencia a la escena para usarla en la función anidada que viene a continuación

		//Imagen de fondo
		this.add.image(0, 0, 'fondo').setOrigin(0, 0);
		this.personaje = new Personaje(this, 20, this.sys.game.canvas.height / 2);
		this.personaje.setScale(2);
		this.gato = new Cat(this, 200, this.sys.game.canvas.height / 2)
		this.wall1 = new Wall(this, this.sys.game.canvas.height - 50);
		this.personaje.body.onCollide = true; 
		
		this.physics.add.collider(this.personaje, this.wall1);
		//this.physics.add.collider(this.personaje, this.gato,this.DecreaseLife.bind(this),null);
		
		//Menu de pausa
		this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

		//CAJAS DE CARTÓN
		let cartBoardBoxes = this.physics.add.group();
		let cartBoard1 = new CardBoard(this, 300,300, cartBoardBoxes);

		let woodBoxes = this.physics.add.group();
		let woodBox1 = new WoodBox(this, 600,300, woodBoxes);

		this.physics.add.collider(this.personaje,woodBoxes);	
		this.physics.add.collider(this.personaje,cartBoardBoxes);	
		this.physics.add.collider(woodBoxes,cartBoardBoxes);	

		
		scene.physics.world.on('collide', function(gameObject1, gameObject2, body1, body2) {
		console.log(gameObject1 );	
		//console.log(woodBoxes.contains(gameObject2));	
			if(gameObject1 == this.personaje && gameObject2===woodBox1){

					woodBox1.destroyMe();
							
			}
		});
		//HUD
		this.scene.launch('hudAux');
		this.hud = this.scene.get('hudAux');
		//this.healthBar = new HealthBar(this, 30, 20, 180, 20, 10);
		this.life=100;
	}
	
	DecreaseLife(){
		if(!this.personaje.hasColided){
			this.life=this.life-5;
			this.hud.changeLifeValue(this.life);
			this.personaje.DecreaseLife();
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
