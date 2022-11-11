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
		
		this.load.image('start', 'assets/Mapa/Start.png');
		this.load.image('fondo', 'assets/Mapa/boceto_interiorTren.png');
		//this.load.spritesheet('personaje', 'assets/personajes/Estudiante_1.png', {frameWidth: 32, frameHeight: 48})
		//this.load.spritesheet('box', 'assets/Box/box.png', {frameWidth: 64, frameHeight: 64})
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		//Pintamos un fondo
        
		var back = this.add.image(0, 0, 'fondo').setOrigin(0, 0);
       // back.setScale(3,2);

		//Pintamos un botón de Empezar
		var sprite = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'start')
		sprite.setScale(0.25);
		sprite.setInteractive(); // Hacemos el sprite interactivo para que lance eventos

		// Escuchamos los eventos del ratón cuando interactual con nuestro sprite de "Start"
	    sprite.on('pointerdown', pointer => {
	    	console.log("pulsando");
	    });

	    sprite.on('pointerup', pointer => {
			this.scene.start('level_aux'); //Cambiamos a la escena de juego
	    });

		sprite.on('pointerover', () => {
			console.log("hola")
	    });

	    sprite.on('pointerout', () => {
			console.log("adios")
	    });

	}
}