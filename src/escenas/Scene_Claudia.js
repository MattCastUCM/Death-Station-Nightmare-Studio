//import Personaje from '/src/objetos/personaje.js';
import Wall from '/src/objetos/wall.js';
import Cat from '/src/objetos/Cat.js';
import HealthBar from '../HUD/HealthBar.js';
import Pause from './pause.js';
import EnemyManager from './EnemyManager.js';

/**
 * Escena principal.
 * @extends Phaser.Scene
 */

export default class Scene_Claudia extends Phaser.Scene {
	
	constructor() {
		super({ key: 'scene_clau' });
	}
	preload() {
		this.load.image('fondo', 'assets/Mapa/boceto_interiorTren.png');
		this.load.image('cuchillo', 'assets/survival kit/Sprite-0004.png');
		this.load.spritesheet('personaje', 'assets/personajes/Estudiante_1.png', { frameWidth: 32, frameHeight: 48 });
		this.load.spritesheet('cat', 'assets/personajes/Gato.png', { frameWidth: 34, frameHeight: 34 });
		this.load.spritesheet('persecutor', 'assets/personajes/Anciana.png', { frameWidth: 32, frameHeight: 48 });		
		this.load.spritesheet('lanzador', 'assets/personajes/Estudiante 2.png', { frameWidth: 32, frameHeight: 48 });

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
		this.life=100;
		
		this.gato = new Cat(this, 200, this.sys.game.canvas.height / 2)
		this.wall1 = new Wall(this, this.sys.game.canvas.height - 50);
		this.personaje.body.onCollide = true; 
		
		this.physics.add.collider(this.personaje, this.wall1);

		//CREACION DE ENEMIGO PERSECUTOR Y TOPO
		let enemyManager = new EnemyManager(this);
		this.persecutor = enemyManager.CreateEnemy(20, this.sys.game.canvas.height / 2,'persecutor', this.personaje);
		this.persecutor.setScale(2);
		this.lanzador = enemyManager.CreateEnemy(20, this.sys.game.canvas.height / 2,'lanzador', this.personaje);
		this.lanzador.setScale(2);
		this.physics.add.collider(this.personaje,this.persecutor, this.DecreaseLife.bind(this),null);	
		this.physics.add.collider(this.personaje,this.lanzador, this.DecreaseLife.bind(this),null);	
		

	    
		//HUD
		let hud=this.scene.launch('hudAux');
		this.healthBar = new HealthBar(this, 30, 20, 180, 20, 10);
		
		this.physics.add.collider(this.personaje, this.wall1);
		this.physics.add.collider(this.personaje, this.gato,this.DecreaseLife.bind(this),null);
		
		
		//Menu de pausa
		this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

	}
	
	DecreaseLife(){
		if(!this.personaje.hasColided){
			this.healthBar.decrease();
			this.personaje.DecreaseLife();
		}
	}
	
		
}
