import gameObject from './gameObject.js';

export default class Cat extends gameObject {
	/**
	 * Gato
	 * @extends gameObject
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */
	constructor(scene, x, y) {
		super(scene, x, y, 17, 17, 8, 16, 'cat', 140);
		this.scene = scene;
		
		this.lastDirTime = 0; 		// Tiempo transcurrido desde la última vez que se cambió de c
		this.lastColTime = 0; 		// Tiempo transcurrido desde la última colisión
		this.maxTime = Phaser.Math.Between(1, 3);		 // Tiempo límite para cambiar la dirección (en s), es aleatorio cada vez que cambia de dirección
		
		this.hasChangedDir = false; 		// Si ha cambiado o no la dirección recientemente. Se usa para que no cambia de dirección aleatoriamente si se acaba de cambiar
		this.body.pushable = false; 		// Para que no lo pueda empujar el player
		this.maxPlayerOffset = 1.5 * scene.sys.game.canvas.width; 		// La máxima distancia que se puede alejar del player

		this.soundCounter = 0; 		// Contador para emitir sonido
		this.soundMax = 300;		// Frecuencia de emisión de sonido 
		this.growlSound = ["cat1", "cat2"];


		// Creamos las animaciones
		this.scene.anims.create({
			key: 'cat_idle',
			frames: scene.anims.generateFrameNumbers('cat', { start: 1, end: 1 }),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'cat_up',
			frames: scene.anims.generateFrameNumbers('cat', { start: 9, end: 11 }),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'cat_down',
			frames: scene.anims.generateFrameNumbers('cat', { start: 0, end: 2 }),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'cat_left',
			frames: scene.anims.generateFrameNumbers('cat', { start: 3, end: 5 }),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'cat_right',
			frames: scene.anims.generateFrameNumbers('cat', { start: 6, end: 8 }),
			frameRate: 5,
			repeat: -1
		});

		// La animación a ejecutar según se genere el personaje será 'idle'
		this.play('cat_idle');

		// Array que contiene la información de las direcciones
		this.directions = [
			{ dirX: 0, dirY: -1, anim: 'cat_up' },
			{ dirX: 0, dirY: 1, anim: 'cat_down' },
			{ dirX: -1, dirY: 0, anim: 'cat_left' },
			{ dirX: 1, dirY: 0, anim: 'cat_right' }
		]


		// Añade las colisiones con el mapa y el jugador
		this.scene.physics.add.collider(this, scene.colisionlayer, function (self) {
			self.hasCollided();
		});
		this.scene.physics.add.collider(this, scene.objects, function (self) {
			self.hasCollided();
		});
		this.scene.physics.add.collider(this, scene.player);
	}

	
	// Cambia de dirección por colisionar con la pared
	hasCollided() {
		this.changeDir();
		this.hasChangedDir = true;
	}


	// Cambia de dirección
	changeDir() {
		this.lastDirTime = 0;
		this.maxTime = Phaser.Math.Between(1, 5); 		// Se inicializa a otro tiempo diferente
		let index = Phaser.Math.Between(0, 3);			// Aux que sirve como índice para consultar el array
		
		// Cambia la animación que se reproduce
		this.play(this.directions[index].anim); 		
		// Llama al padre (gameObject) para cambiar de dirección
		this.move(this.directions[index].dirX, this.directions[index].dirY); 	
	}


	preUpdate(t, dt) {
		// Es muy importante llamar al preUpdate del padre (Sprite), sino no se ejecutará la animación
		super.preUpdate(t, dt);
		this.anims.isPlaying = true;
		this.lastDirTime += dt;;
		this.lastColTime += dt;;

		let dist = Phaser.Math.Distance.BetweenPoints(this, this.scene.player)
		 
		// Si se aleja demasiado del jugador
		if (dist > this.maxPlayerOffset) {
			//se coloca delante de él
			this.x = this.scene.player.x + this.scene.sys.game.canvas.width;
			this.y = this.scene.cameras.main.centerY;
		}
		if (this.lastColTime > 100) {
			this.lastColTime = 0;
			this.hasChangedDir = false;
		}

		// Si no se ha cambiado de dirección por haber colisionado recientemente (1000 para pasar de ms a s)
		if (!this.hasChangedDir && this.lastDirTime > this.maxTime * 1000) { 
			this.changeDir();
		}
		// Continua con la dirección
		this.moving(); 

		// Gestiona el sonido
		this.soundCounter++;
		if (this.soundCounter > this.soundMax) {
			this.soundMax = Phaser.Math.Between(600, 1200); 		// Para que la frecuencia sea aleatoria
			this.soundCounter = 0;
			
			// Elige entre 3 audios diferentes
			this.scene.soundManager.play(this.growlSound[Phaser.Math.Between(0, 1)]); 
		}


	}




}