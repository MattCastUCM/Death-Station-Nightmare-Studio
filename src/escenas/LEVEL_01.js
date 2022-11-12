import Player from '../objetos/player.js';
import Wall from '../objetos/wall.js';
import Cat from '../objetos/cat.js';
import HealthBar from '../HUD/HealthBar.js';
import EnemyManager from './EnemyManager.js';
import Pause from './pause.js';
/**
 * Escena principal.
 * @extends Phaser.Scene
 */

export default class LEVEL_01 extends Phaser.Scene {

	constructor() {
		super({ key: 'LEVEL_01' });
	}

	preload() {
		this.load.spritesheet('personaje', 'assets/personajes/Estudiante_1.png', { frameWidth: 32, frameHeight: 48 });
		this.load.spritesheet('cat', 'assets/personajes/Gato.png', { frameWidth: 34, frameHeight: 34 });

		this.load.image('cuchillo', 'assets/survival kit/Sprite-0004.png');
		this.load.spritesheet('persecutor', 'assets/personajes/Anciana.png', { frameWidth: 32, frameHeight: 48 });		
		this.load.spritesheet('lanzador', 'assets/personajes/Estudiante 2.png', { frameWidth: 32, frameHeight: 48 });

        this.load.image("tiles","assets/Mapa/boceto_interiorTren.png");
        this.load.tilemapTiledJSON('map',"mapas/level01.json");
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {

		// Jugador
		let player = new Player(this, 50, 400, 15, 15, 8, 30, 140);
		player.setScale(2.5);

		// Gato
		let gato = new Cat(this, 200, 400, 30, 30, 4, 4, 140);
	
		player.body.onCollide = true; // Activamos onCollide para poder detectar la colisión del caballero con el suelo
		
		let scene = this; // Nos guardamos una referencia a la escena para usarla en la función anidada que viene a continuación
		let hud=this.scene.launch('hudAux');
		this.healthBar = new HealthBar(this, 30, 20, 180, 20, 10);
		
		this.physics.add.collider(player, gato);
		

		//CREACION DE ENEMIGO PERSECUTOR Y TOPO
		let enemyManager = new EnemyManager(this);
		this.persecutor = enemyManager.CreateEnemy(20, this.sys.game.canvas.height / 2,'persecutor', player);
		this.persecutor.setScale(2);
		this.lanzador = enemyManager.CreateEnemy(20, this.sys.game.canvas.height / 2,'lanzador', player);
		this.lanzador.setScale(2);
		this.physics.add.collider(player,this.persecutor);	
		this.physics.add.collider(player,this.lanzador);	
		

		//Menu de pausa
		this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
		//camara que sigue a jugador (movimiento suave)
		this.cameras.main.startFollow(player,this.cameras.FOLLOW_LOCKON, 0.1, 0.1);
		//espacio de camara (si jugador sale de este espacio,la camara le sigue)
		//this.cameras.main.setDeadzone (0,this.cameras.main.centerY*2);
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
