/**
 * E
 * @extends Phaser.Scene
 */
export default class Boot extends Phaser.Scene {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'boot' });
	}

	preload() {
		this.load.scripts('PostProcess', [
			'src/hud/healthBar.js',
			'src/hud/TextMessage.js',
			'src/hud/hudManager.js',
			'src/objetos/Bullet',
			'src/objetos/gameObject.js',
			'src/objetos/Enemy.js',
			'src/objetos/Lanzador.js',
			'src/objetos/Persecutor.js',
			'src/objetos/Topo.js',
			'src/objetos/player.js',
			'src/objetos/Cat.js',

		]);

		 //tile map
		 this.load.image("tiles","assets/Mapa/mapa2.png");
		 this.load.tilemapTiledJSON('level1',"mapas/LEVEL_01.json");
		 
		//HUD
		this.load.image('heartImg', 'assets/HUD/corazon.png');
		this.load.image('inventory', 'assets/HUD/inventario.png');
		this.load.image('pausa', 'assets/HUD/pausa.png');
		this.load.image('level', 'assets/HUD/level.png');
		this.load.image('play', 'assets/HUD/play.png');
		this.load.image('selected', 'assets/HUD/seleccionado.png');

		//dialog
		this.load.script('WebFont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
		this.load.image('dialogBox', 'assets/HUD/textBox.png');

		//player
		this.load.spritesheet('personaje', 'assets/personajes/Estudiante_1.png', { frameWidth: 32, frameHeight: 48 });
	
		//enemies
		this.load.spritesheet('cat', 'assets/enemigos/Gato.png', { frameWidth: 34, frameHeight: 34 });
		this.load.spritesheet('persecutor', 'assets/enemigos/Persecutor.png', { frameWidth: 64, frameHeight: 64 });
		this.load.spritesheet('lanzador', 'assets/enemigos/Lanzador.png', { frameWidth: 48, frameHeight: 48 });
		this.load.spritesheet('topo', 'assets/enemigos/Topo.png', { frameWidth: 36, frameHeight: 32 });
		
		//bullet
		this.load.image('roca', 'assets/enemigos/Roca.png');
		
		//objetos
		this.load.spritesheet('woodBox', 'assets/objects/cajaMadera.png', { frameWidth: 64, frameHeight: 64 })
		this.load.spritesheet('cartBoard', 'assets/objects/cajaCarton.png', { frameWidth: 64, frameHeight: 64 });

		//ilumination
		this.load.image('mask', 'assets/enviroment/mask1.png');

		//weapons
		this.load.spritesheet('navaja', 'assets/Armas/Cuchillo.png', { frameWidth: 210, frameHeight: 480 });
		this.load.spritesheet('botella', 'assets/Armas/Botella.png', { frameWidth: 140, frameHeight: 380 });
		this.load.spritesheet('barra', 'assets/Armas/Barra.png', { frameWidth: 32, frameHeight: 48 });
		this.load.spritesheet('hacha', 'assets/Armas/Hacha.png', { frameWidth: 100, frameHeight: 220 });
	}


	create() {
		this.scene.start('menu');
	}
}