/**
 * Escena de Menú.
 * @extends Phaser.Scene
 */
export default class Menu extends Phaser.Scene {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'menu' });
	}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
		
		this.load.image('start', 'assets/Mapa/NuevoStart.png');
		this.load.image('fondo', 'assets/Mapa/image.png');
		this.load.image('sangre', 'assets/Mapa/blood.png');
		this.soundManager = this.scene.get('soundManager');
		
		//this.load.spritesheet('personaje', 'assets/personajes/Estudiante_1.png', {frameWidth: 32, frameHeight: 48})
		//this.load.spritesheet('box', 'assets/Box/box.png', {frameWidth: 64, frameHeight: 64})
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		//Pintamos un fondo
		
        this.soundManager.playBGM("menu");
		var back = this.add.image(0, 0, 'fondo').setOrigin(0, 0);
		back.setScale(0.75);
		
		//var blood = this.add.image(this.sys.game.canvas.width - 340, this.sys.game.canvas.height - 140 , 'sangre')
		//blood.setScale(0.29);

	
		//Pintamos un botón de Empezar
		var sprite = this.add.image(this.sys.game.canvas.width - 340, this.sys.game.canvas.height - 190 , 'start')
		sprite.setScale(0.9);
		sprite.setInteractive(); // Hacemos el sprite interactivo para que lance eventos

		// Escuchamos los eventos del ratón cuando interactual con nuestro sprite de "Start"
	    sprite.on('pointerdown', pointer => {
	    	console.log("pulsando");
			this.soundManager.play("click");
	    });

	    sprite.on('pointerup', pointer => {
			this.scene.start('LEVEL_01'); //Cambiamos a la escena de juego
			this.soundManager.stopBGM("menu");
	    });

		sprite.on('pointerover', () => {
			sprite.setTint(0xff0000);
			
		
	    });

	    sprite.on('pointerout', () => {
			sprite.clearTint();
			
	    });

	}
}