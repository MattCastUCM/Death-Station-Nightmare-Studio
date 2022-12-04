import gameObject from './gameObject.js';

export default class Cat extends gameObject {
	/**
	 * Constructor de Knight, nuestro caballero medieval con espada y escudo
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */
	constructor(scene, x, y, w, h, offsetX, offsetY, spd) {
		super(scene, x, y, w, h, offsetX, offsetY, 'cat', spd);
		this.speed = spd; // Nuestra velocidad de movimiento será 140
		this.lastDirTime = 0; //tiempo transcurrido desde la ult vez q se cambió dir
		this.lastColTime = 0; //tiempo transcurrido desde la ult colisión
		this.maxTime = Phaser.Math.Between(1, 3); //tiempo límite para cambiar la dir en s, va a ser aleatorio cada vez
		this.scene.add.existing(this); //Añadimos a la escena
		this.hasChangedDir = false; //ha cambiado la dir recientemente, se usa para que no cambia de dir aleatoriamente si se acaba de cambiar por colisión
		this.body.pushable = false; //para que no lo pueda empujar el player
		this.maxPlayerOffset = 1.5 * scene.sys.game.canvas.width; //la máxima distancia que se puede alejar del player

		this.soundCounter = 0; //contador para emitir sonido
		this.soundMax = 200; //frecuencia de emisión de sonido 
		this.growlSound = ["cat1", "cat2"];
		//Creamos las animaciones
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
		//	this.cursors = scene.input.keyboard.createCursorKeys();
		this.directions = [ //array que contiene la información de las direcciones
			{ dirX: 0, dirY: -1, anim: 'cat_up' },
			{ dirX: 0, dirY: 1, anim: 'cat_down' },
			{ dirX: -1, dirY: 0, anim: 'cat_left' },
			{ dirX: 1, dirY: 0, anim: 'cat_right' }
		]

		// //añadir colisión con el mapa de la escena
		this.scene.physics.add.collider(this, scene.colisionlayer, function (self) {
			self.hasCollided();
			console.log("collided cat");
		});

		this.scene = scene;

	}
	/*Cambia de dir por colisionar con la pared*/
	hasCollided() {
		this.changeDir();
		this.hasChangedDir = true;
	}
	changeDir() {

		this.lastDirTime = 0;
		this.maxTime = Phaser.Math.Between(1, 5); //se inicializa a otro tiempo diferente
		let index = Phaser.Math.Between(0, 3);//aux que sirve como índice para consultarel array
		this.play(this.directions[index].anim); //animación
		this.move(this.directions[index].dirX, this.directions[index].dirY); //llama al padre (gameObject) para cambiar de dirección
	}

	/**
	 * Bucle principal del personaje, actualizamos su posición y ejecutamos acciones según el Input
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */

	preUpdate(t, dt) {
		// Es muy importante llamar al preUpdate del padre (Sprite), sino no se ejecutará la animación
		super.preUpdate(t, dt);
		this.anims.isPlaying = true;
		this.lastDirTime += dt;;
		this.lastColTime += dt;;

		let dist = Phaser.Math.Distance.BetweenPoints(this, this.scene.player)
		if (dist > this.maxPlayerOffset) //si se aleja demasiado del jugador
		{
			//se coloca delante del jugador
			this.x = this.scene.player.x + this.scene.sys.game.canvas.width;
			this.y = this.scene.cameras.main.centerY;
		}
		if (this.lastColTime > 100) {
			this.lastColTime = 0;
			this.hasChangedDir = false;
		}
		//si no se ha cambiado de dir por haber colisionado recientemente
		if (!this.hasChangedDir && this.lastDirTime > this.maxTime * 1000) { //*1000 para pasar de ms a s
			this.changeDir();
		}
		this.moving(); //continua con la dirección

		//gestionar sonido
		this.soundCounter++;
		if (this.soundCounter > this.soundMax) {
			this.soundMax = Phaser.Math.Between(300, 600); //para que la frecuencia sea aleatoria
			this.soundCounter = 0;
			this.scene.soundManager.play(this.growlSound[Phaser.Math.Between(0, 1)]); //elige entre 3 audios diferentes

		}


	}




}