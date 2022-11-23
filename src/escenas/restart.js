/**
 * Escena de Menú.
 * @extends Phaser.Scene
 */
 export default class Restart extends Phaser.Scene {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'restart' });
	}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
		
		this.load.image('restartButton', 'assets/Mapa/restart.png');
		this.load.image('fondoRestart', 'assets/Mapa/restartFondo.png');
		
		//this.load.spritesheet('personaje', 'assets/personajes/Estudiante_1.png', {frameWidth: 32, frameHeight: 48})
		//this.load.spritesheet('box', 'assets/Box/box.png', {frameWidth: 64, frameHeight: 64})
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		//Pintamos un fondo
        
		var back = this.add.image(0, 0, 'fondoRestart').setOrigin(0, 0);
		back.setScale(1.01);
		
		//var blood = this.add.image(this.sys.game.canvas.width - 340, this.sys.game.canvas.height - 140 , 'sangre')
		//blood.setScale(0.29);

	
		//Pintamos un botón de Empezar
		var sprite = this.add.image(this.scale.width/2, this.scale.height - 100 , 'restartButton')
		sprite.setScale(0.9);
		sprite.setInteractive(); // Hacemos el sprite interactivo para que lance eventos
        for(let i= 0; i<300; i= i+2){
            setTimeout(()=>{  sprite.setTint(0xff0000);}, i * 150);
            setTimeout(()=>{  sprite.clearTint();}, (i + 1) * 150);
        }

		// Escuchamos los eventos del ratón cuando interactual con nuestro sprite de "Start"
	    sprite.on('pointerdown', pointer => {
	    	console.log("pulsando");
	    });

	    sprite.on('pointerup', pointer => {
			this.scene.start('LEVEL_01'); //Cambiamos a la escena de juego
	    });

		sprite.on('pointerover', () => {
			console.log("hola")
			sprite.setTint(0xff0000);
			
		
	    });

	    sprite.on('pointerout', () => {
			console.log("adios")
			sprite.clearTint();
			
	    });

	}
}