import Personaje from '../src/objetos/personaje.js';
import Wall from '../src/objetos/wall.js';
import Cat from '../src/objetos/Cat.js';
import CardBoard from '../src/objetos/CartBoard.js'
import WoodBox from '../src/objetos/WoodBox.js'
import DialogManager from '../src/hud/DialogManager.js';

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
		this.load.spritesheet('dialogBox', 'assets/HUD/textBox.png', { frameWidth: 600, frameHeight: 300});
		this.load.spritesheet('personaje', 'assets/personajes/Estudiante_1.png', { frameWidth: 32, frameHeight: 48 });
		this.load.spritesheet('cat', 'assets/personajes/Gato.png', { frameWidth: 34, frameHeight: 34 });
		this.load.spritesheet('cartBoard', 'assets/objects/cajaCarton.png', { frameWidth: 64, frameHeight: 64 });
		this.load.spritesheet('woodBox', 'assets/objects/cajaMadera.png', { frameWidth: 64, frameHeight: 64 })

	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		let scene = this; // Nos guardamos una referencia a la escena para usarla en la función anidada que viene a continuación

		//Imagen de fondo
		this.add.image(0, 0, 'fondo').setOrigin(0, 0);
		//IMPORTANTE de actualizarlo en main : let personaje y let gato
		let personaje = new Personaje(this, 20, this.sys.game.canvas.height / 2);
		personaje.setScale(2);
		let gato = new Cat(this, 400, this.sys.game.canvas.height / 2)
		this.wall1 = new Wall(this, this.sys.game.canvas.height - 50);
		personaje.body.onCollide = true;
		gato.body.onCollide = true;

		this.physics.add.collider(personaje, this.wall1);

		//Menu de pausa
		this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

		//CAJAS DE CARTÓN
		let cartBoardBoxes = this.physics.add.group();
		let cartBoard1 = new CardBoard(this, 300, 300, cartBoardBoxes);
		let woodBoxes = this.physics.add.group();
		let woodBox1 = new WoodBox(this, 600, 300, woodBoxes);

		//a borrar
		this.life = 100;
		this.physics.add.collider(personaje, gato, function () {
			if (!personaje.hasColided) {
				scene.life = scene.life - 5;
				scene.hud.changeLifeValue(scene.life);
				personaje.DecreaseLife();
			}
		});
		//............................................................
		this.physics.add.collider(woodBoxes, cartBoardBoxes);

		this.physics.add.collider(personaje, cartBoardBoxes);

		this.physics.add.collider(personaje, woodBoxes);

		this.dialogManager = new DialogManager(this);


		//Prueba, en la escena, hay q hacerlo en arma (hacha)
		this.physics.add.collider(gato, woodBoxes);
		scene.physics.world.on('collide', function (gameObject1, gameObject2, body1, body2) {
			if (gameObject1 === gato && gameObject2 === woodBox1) {

				woodBox1.destroyMe();
				scene.newText(["No puede sbiiiiiiiiiiiiiiiiiiiiiiiiiibsaiwfibfjinhfnrnjsnksnfkjnfks< iibvywbrviwyriuwunksnfkjnfks", "Porqué es así"]); //array de strings

			}
		});
		//....................................................

		//HUD
		this.scene.launch('hudAux');
		this.hud = this.scene.get('hudAux');



	}

	newText(text) {
		this.dialogManager.Init(text);
	}


	//BORRAR y trasladarlo a player
	DecreaseLife() {
		if (!personaje.hasColided) {
			this.life = this.life - 5;
			this.hud.changeLifeValue(this.life);
			this.personaje.DecreaseLife();
		}
	}
	update(t, dt) {
		this.deltaTime = dt;
		if (this.keyP.isDown) {
			this.scene.launch('Pause', { me: this.scene });
			this.scene.pause();
		}
	}
}
