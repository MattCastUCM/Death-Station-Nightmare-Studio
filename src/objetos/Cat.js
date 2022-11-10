import gameObject from './gameobject.js';

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
		this.changeDir = false;
		this.lastDirTime = 0; //tiempo transcurrido desde la ult vez q se cambió dir
		this.maxTime = Phaser.Math.Between(50, 100); //tiempo límite para cambiar la dir, va a ser aleatorio cada vez
		this.random = Phaser.Math.Between(50, 100); //prueba
		this.scene.add.existing(this); //Añadimos a la escena
		this.body.setImmovable(true); //no puede ser empujado 

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
			{ dirX: 1, dirY: 1, anim: 'cat_right' }
		]

		// // Agregamos el personaje a las físicas para que Phaser lo tenga en cuenta
		// scene.physics.add.existing(this);

		// // Decimos que el personaje colisiona con los límites del mundo
		// this.body.setCollideWorldBounds();

		// this.body.setImmovable(true); //para que no se mueva 

		// // Ajustamos el "collider"
		// // this.bodyOffset = this.body.width/4;
		// // this.bodyWidth = this.body.width/2;

		// // this.body.setOffset(this.bodyOffset, 0);
		// // this.body.width = this.bodyWidth;
		// this.body.setSize(30, 20)
		// this.body.setOffset(0, 15);


	}

	/**
	 * Bucle principal del personaje, actualizamos su posición y ejecutamos acciones según el Input
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */

	preUpdate(t, dt) {
		// Es muy imporante llamar al preUpdate del padre (Sprite), sino no se ejecutará la animación
		// super.preUpdate(t, dt);
		// this.anims.isPlaying = true;

		// this.lastDirTime += dt;;
		// if (this.lastDirTime > this.maxTime) {
		// 	this.lastDirTime = 0;
		// 	this.maxTime = Phaser.Math.Between(50, 100); //se inicializa a otro tiempo diferente
		// 	let index = Phaser.Math.Between(0, 3);//aux que sirve como índice para consultarel array
		// 	this.play(this.directions[index].anim); //animación
		// 	this.move(this.directions[index].dirX, this.directions[index].dirY) //llama al padre (gameObject) para cambiar de dirección
		// }

		//this.move(); //continua con la dirección

		// if (this.cursors.left.isDown && !this.cursors.right.isDown) {
		// 	//this.setFlip(true, false)
		// 	this.anims.isPlaying = true;
		// 	if (this.anims.currentAnim.key !== 'cat_left') {
		// 		this.play('cat_left');
		// 	}

		// 	//this.x -= this.speed*dt / 1000;
		// 	this.body.setVelocityX(-this.speed);
		// }


		// if (this.cursors.right.isDown && !this.cursors.left.isDown) {
		// 	//this.setFlip(false, false)
		// 	this.anims.isPlaying = true;
		// 	if (this.anims.currentAnim.key !== 'cat_rigth') {
		// 		this.play('cat_rigth');
		// 	}
		// 	//this.x += this.speed*dt / 1000;
		// 	this.body.setVelocityX(this.speed);
		// }

		// if (this.cursors.up.isDown && !this.cursors.down.isDown) {
		// 	this.anims.isPlaying = true;
		// 	//this.setFlip(false, false)
		// 	if (this.anims.currentAnim.key !== 'cat_up' && !this.cursors.left.isDown && !this.cursors.right.isDown) {
		// 		this.play('cat_up');
		// 	}
		// 	//this.x += this.speed*dt / 1000;
		// 	this.body.setVelocityY(-this.speed);
		// }

		// if (this.cursors.down.isDown && !this.cursors.up.isDown) {
		// 	this.anims.isPlaying = true;
		// 	//this.setFlip(false, false)
		// 	if (this.anims.currentAnim.key !== 'cat_down' && !this.cursors.left.isDown && !this.cursors.right.isDown) {
		// 		this.play('cat_down');
		// 	}
		// 	//this.x += this.speed*dt / 1000;
		// 	this.body.setVelocityY(this.speed);
		// }




		// // // Si dejamos de pulsar 'A' o 'D' volvemos al estado de animación'idle'
		// // // Phaser.Input.Keyboard.JustUp y Phaser.Input.Keyboard.JustDown nos aseguran detectar la tecla una sola vez (evitamos repeticiones)
		// // if (Phaser.Input.Keyboard.JustUp(this.cursors.left) || Phaser.Input.Keyboard.JustUp(this.cursors.right)) {
		// // 	// if( this.anims.isPlaying === true){
		// // 	// 	this.play('idle');
		// // 	// }
		// // 	this.anims.isPlaying = false;
		// // 	this.body.setVelocityX(0);
		// // }
		// // //caso de W S
		// // if (Phaser.Input.Keyboard.JustUp(this.cursors.up) || Phaser.Input.Keyboard.JustUp(this.cursors.down)) {
		// // 	this.anims.isPlaying = false;
		// // 	// if(this.anims.isPlaying === true){
		// // 	// 	this.play('idle');
		// // 	// }
		// // 	this.body.setVelocityY(0);
		// // }
		// // this.body.velocity.normalize().scale(this.speed);

	}




}