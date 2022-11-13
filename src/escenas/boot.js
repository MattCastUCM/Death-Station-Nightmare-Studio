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

	preload(){
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

	   //HUD
	   this.load.image('heartImg', 'assets/HUD/corazon.png');
	   this.load.image('inventory', 'assets/HUD/inventario.png');
	   this.load.image('pausa', 'assets/HUD/pausa.png');
	   this.load.image('level', 'assets/HUD/level.png');
	   this.load.image('play', 'assets/HUD/play.png');
	   this.load.image('selected', 'assets/HUD/seleccionado.png');

	   //armas
	 this.load.spritesheet('navaja', 'assets/Armas/Cuchillo.png', { frameWidth: 210, frameHeight: 480});
	 this.load.spritesheet('botella', 'assets/Armas/Botella.png', { frameWidth: 140, frameHeight: 380});
	 this.load.spritesheet('barra', 'assets/Armas/Barra.png', { frameWidth: 32, frameHeight: 48 });
	 this.load.spritesheet('hacha', 'assets/Armas/Hacha.png', { frameWidth: 100, frameHeight: 220 });
	}

	
	create() {
		this.scene.start('menu');
	}
}