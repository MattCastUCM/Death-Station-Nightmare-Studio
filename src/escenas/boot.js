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
			'src/hud/HealthBar.js',
			'src/hud/TextMessage.js',
			'src/objetos/Bullet',
			'src/objetos/gameObject.js',
			'src/objetos/Enemy.js',
			'src/objetos/Lanzador.js',
			'src/objetos/Persecutor.js',
			'src/objetos/Topo.js',
			'src/objetos/player.js',
			'src/objetos/Cat.js',

	   ]);
	}
	
	create() {
		this.scene.start('menu');
	}
}