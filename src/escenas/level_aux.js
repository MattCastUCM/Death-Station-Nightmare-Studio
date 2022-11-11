import Player from '../objetos/player.js';
import Wall from '../objetos/wall.js';
import Cat from '../objetos/cat.js';
import EnemyManager from './EnemyManager.js';
import CardBoard from '../objetos/CartBoard.js'
import WoodBox from '../objetos/WoodBox.js'
import Trigger from '../objetos/Trigger.js'
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
		//BG
		this.load.image('fondo', 'assets/Mapa/boceto_interiorTren.png');
		//gameObjects
		this.load.spritesheet('personaje', 'assets/personajes/Estudiante_1.png', { frameWidth: 32, frameHeight: 48 });

		this.load.spritesheet('cat', 'assets/personajes/Gato.png', { frameWidth: 34, frameHeight: 34 });
		this.load.spritesheet('persecutor', 'assets/personajes/Anciana.png', { frameWidth: 32, frameHeight: 48 });
		this.load.spritesheet('lanzador', 'assets/personajes/Estudiante 2.png', { frameWidth: 32, frameHeight: 48 });
		this.load.image('cuchillo', 'assets/survival kit/Sprite-0004.png');

		this.load.spritesheet('woodBox', 'assets/objects/cajaMadera.png', { frameWidth: 64, frameHeight: 64 })
		this.load.spritesheet('cartBoard', 'assets/objects/cajaCarton.png', { frameWidth: 64, frameHeight: 64 });

		//otros
		this.load.image('mask', 'assets/enviroment/mask1.png');
		this.load.spritesheet('dialogBox', 'assets/HUD/textBox.png', { frameWidth: 600, frameHeight: 300 });

	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {

		let scene = this; // Nos guardamos una referencia a la escena para usarla en la función anidada que viene a continuación

		//Imagen de fondo
		const f = this.add.image(0, 0, 'fondo').setOrigin(0, 0);


		//DIALOGMANAGER
		this.scene.launch('dialogManager');
		this.dialogManager = this.scene.get('dialogManager');

		//HUD (y Pausa)
		this.scene.launch('hudAux', { me: this });
		this.hud = this.scene.get('hudAux');
		//

		// Jugador
		let player = new Player(this, 80, 400, 15, 15, 8, 30, 140);
		player.body.onCollide = true; // Activamos onCollide para poder detectar la colisión del player
		player.setScale(2.5);

		// Gato
		let gato = new Cat(this, 200, 400, 30, 30, 4, 4, 140);
		gato.body.onCollide = true;

		//CAJAS
		let cartBoardBoxes = this.physics.add.group();
		let cartBoard1 = new CardBoard(this, 300, 300, cartBoardBoxes);

		let woodBoxes = this.physics.add.group();
		let woodBox1 = new WoodBox(this, 600, 300, woodBoxes);

		//colisión player-cajas,cajas-cajas
		this.physics.add.collider(woodBoxes, cartBoardBoxes);
		this.physics.add.collider(player, cartBoardBoxes);
		this.physics.add.collider(player, woodBoxes);

		//Prueba, en la escena, hay q hacerlo en arma (hacha)
		this.physics.add.collider(gato, woodBoxes);

		//DIALOG
		//EJEMPLO1:al interactuar con un objeto
		this.physics.world.on('collide', function (gameObject1, gameObject2, body1, body2) {
			if (gameObject1 === gato && gameObject2 === woodBox1) {
				woodBox1.destroyMe();
				scene.newText(["No puede sbiiiiiiiiiiiiiiiiiiiiiiiiiibsaiwfibfjinhfnrnjsnksnfkjnfks< iibvywbrviwyriuwunksnfkjnfks", "Porqué es así"]); //array de strings

			}
		});

		//EJEMPLO 2: con Trigger
		let trigger1 = new Trigger(this, 300, 200, 30, 600);
		this.physics.add.overlap(player, trigger1, function () { scene.newText(["Dónde estoy", "Soy idiota"]); trigger1.destroy(); }); //array de strings

		// Grupo de paredes (estático)
		let walls = this.physics.add.staticGroup();
		walls.add(new Wall(this, 0, 0, this.sys.game.canvas.width + 15, this.sys.game.canvas.height / 2.7));
		walls.add(new Wall(this, 285, 200, 260, 60));
		walls.add(new Wall(this, 710, 200, 140, 60));
		walls.add(new Wall(this, 285, 530, 260, 60));
		walls.add(new Wall(this, 710, 530, 140, 60));

		//colisiones con wall
		this.physics.add.collider(player, walls);
		this.physics.add.collider(player, gato);
		this.physics.add.collider(gato, this.walls);

		//CREACION DE ENEMIGO PERSECUTOR Y TOPO
		let enemyManager = new EnemyManager(this);
		this.persecutor = enemyManager.CreateEnemy(40, this.sys.game.canvas.height / 2, 'persecutor', player);
		this.persecutor.setScale(2);
		this.lanzador = enemyManager.CreateEnemy(80, this.sys.game.canvas.height / 2, 'lanzador', player);
		this.lanzador.setScale(2);

		//Colisión enemigo
		this.physics.add.collider(player, this.lanzador);
		this.physics.add.collider(player, this.persecutor, function () { scene.DecreaseLife(player); });



		// Iluminación
		const width = this.scale.width
		const height = this.scale.height
		const rt = this.make.renderTexture({
			width,
			height
		}, true)
		rt.setDepth(4);
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
		rt.mask = new Phaser.Display.Masks.BitmapMask(this, player.vision);
		rt.mask.invertAlpha = true;


		//camara que sigue a jugador (movimiento suave)
		this.cameras.main.startFollow(player, this.cameras.FOLLOW_LOCKON, 0.1, 0.1);
		//espacio de camara (si jugador sale de este espacio,la camara le sigue)
		//this.cameras.main.setDeadzone (0,this.cameras.main.centerY*2);
	}

	/*Mandarle a dialogManager el texto que tiene que printear*/
	newText(text) {
		this.dialogManager.Init(text);
	}


	/*Informa al player y al hud*/
	DecreaseLife(player) {
		if (!player.HasCollided()) {
			player.decreaseHP();
			this.hud.changeLifeValue(player.GetHP());
		}
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
