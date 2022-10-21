
export default class Cat extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor de Knight, nuestro caballero medieval con espada y escudo
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */
	constructor(scene, x, y) {
		super(scene, x, y, 'cat');
		this.speed = 140; // Nuestra velocidad de movimiento será 140
		//this.disableJump(); // Por defecto no podemos saltar hasta que estemos en una plataforma del juego
		//this.isAttacking = false;

		this.scene.add.existing(this); //Añadimos el perosnaje a la escena

		//Creamos las animaciones
		this.scene.anims.create({
			key: 'cat_idle',
			frames: scene.anims.generateFrameNumbers('cat', {start:1, end:1}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'cat_up',
			frames: scene.anims.generateFrameNumbers('cat', {start:9, end:11}),
			frameRate: 5,
			repeat: -1
		});
        this.scene.anims.create({
			key: 'cat_down',
			frames: scene.anims.generateFrameNumbers('cat', {start:0, end:2}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'cat_left',
			frames: scene.anims.generateFrameNumbers('cat', {start:3, end:5}),
			frameRate: 5,
			repeat: -1
		});
        this.scene.anims.create({
			key: 'cat_rigth',
			frames: scene.anims.generateFrameNumbers('cat', {start:6, end:8}),
			frameRate: 5,
			repeat: -1
		});

		

		// La animación a ejecutar según se genere el personaje será 'idle'
		this.play('cat_idle');
        this.cursors = scene.input.keyboard.createCursorKeys();


		// Agregamos el personaje a las físicas para que Phaser lo tenga en cuenta
		scene.physics.add.existing(this);

		// Decimos que el personaje colisiona con los límites del mundo
		this.body.setCollideWorldBounds();

		this.body.setImmovable(true); //para que no se mueva 

		// Ajustamos el "collider"
		// this.bodyOffset = this.body.width/4;
		// this.bodyWidth = this.body.width/2;
		
		// this.body.setOffset(this.bodyOffset, 0);
		// this.body.width = this.bodyWidth;
        


	}

	/**
	 * Bucle principal del personaje, actualizamos su posición y ejecutamos acciones según el Input
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */
    
	preUpdate(t, dt) {
		// Es muy imporante llamar al preUpdate del padre (Sprite), sino no se ejecutará la animación
		super.preUpdate(t, dt);

		
		if(this.cursors.left.isDown &&!this.cursors.right.isDown){
			//this.setFlip(true, false)
			this.anims.isPlaying=true;
			if(this.anims.currentAnim.key !== 'cat_left'){
				this.play('cat_left');
			}
			
			//this.x -= this.speed*dt / 1000;
			this.body.setVelocityX(-this.speed);
		}

	
		if(this.cursors.right.isDown &&!this.cursors.left.isDown){
			//this.setFlip(false, false)
			this.anims.isPlaying=true;
			if(this.anims.currentAnim.key !== 'cat_rigth'){
				this.play('cat_rigth');
			}
			//this.x += this.speed*dt / 1000;
			this.body.setVelocityX(this.speed);
		}

		if(this.cursors.up.isDown&&!this.cursors.down.isDown){
			this.anims.isPlaying=true;
			//this.setFlip(false, false)
			if(this.anims.currentAnim.key !== 'cat_up'&&!this.cursors.left.isDown&&!this.cursors.right.isDown ){
				this.play('cat_up');
			}
			//this.x += this.speed*dt / 1000;
			this.body.setVelocityY(-this.speed);
		}

        if(this.cursors.down.isDown &&!this.cursors.up.isDown){
			this.anims.isPlaying=true;
			//this.setFlip(false, false)
			if(this.anims.currentAnim.key !== 'cat_down'&&!this.cursors.left.isDown&&!this.cursors.right.isDown ){
				this.play('cat_down');
			}
			//this.x += this.speed*dt / 1000;
			this.body.setVelocityY(this.speed);
		}




		// Si dejamos de pulsar 'A' o 'D' volvemos al estado de animación'idle'
		// Phaser.Input.Keyboard.JustUp y Phaser.Input.Keyboard.JustDown nos aseguran detectar la tecla una sola vez (evitamos repeticiones)
		if(Phaser.Input.Keyboard.JustUp(this.cursors.left) || Phaser.Input.Keyboard.JustUp(this.cursors.right)){
			// if( this.anims.isPlaying === true){
			// 	this.play('idle');
			// }
			this.anims.isPlaying=false;
			this.body.setVelocityX(0);
		}
        //caso de W S
        if(Phaser.Input.Keyboard.JustUp(this.cursors.up) || Phaser.Input.Keyboard.JustUp(this.cursors.down)){
			this.anims.isPlaying=false;
			// if(this.anims.isPlaying === true){
			// 	this.play('idle');
			// }
			this.body.setVelocityY(0);
		}
        this.body.velocity.normalize().scale(this.speed);
	
	}
	

}