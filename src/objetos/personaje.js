export default class Personaje extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor de Knight, nuestro caballero medieval con espada y escudo
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */
	constructor(scene, x, y) {
		super(scene, x, y, 'personaje');
		this.speed = 140; // Nuestra velocidad de movimiento será 140
		//this.disableJump(); // Por defecto no podemos saltar hasta que estemos en una plataforma del juego
		//this.isAttacking = false;

		this.hasColided = false;
		this.helathPoints = 100;
		this.elapsedTime = 0;
		this.scene.add.existing(this); //Añadimos el perosnaje a la escena
		//Creamos las animaciones
		this.scene.anims.create({
			key: 'idle',
			frames: scene.anims.generateFrameNumbers('personaje', {start:1, end:1}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'up',
			frames: scene.anims.generateFrameNumbers('personaje', {start:9, end:11}),
			frameRate: 5,
			repeat: -1
		});
        this.scene.anims.create({
			key: 'down',
			frames: scene.anims.generateFrameNumbers('personaje', {start:0, end:2}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'left',
			frames: scene.anims.generateFrameNumbers('personaje', {start:3, end:5}),
			frameRate: 5,
			repeat: -1
		});
        this.scene.anims.create({
			key: 'rigth',
			frames: scene.anims.generateFrameNumbers('personaje', {start:6, end:8}),
			frameRate: 5,
			repeat: -1
		});

		

		// La animación a ejecutar según se genere el personaje será 'idle'
		this.play('idle');

		// Seteamos las teclas para mover al personaje
		this.wKey = this.scene.input.keyboard.addKey('W'); //saltar
		this.aKey = this.scene.input.keyboard.addKey('A'); //izquierda
		this.sKey = this.scene.input.keyboard.addKey('S'); //parar animación
		this.dKey = this.scene.input.keyboard.addKey('D'); //derecha
		this.ctrKey = this.scene.input.keyboard.addKey('SPACE'); //atacar

		// Agregamos el personaje a las físicas para que Phaser lo tenga en cuenta
		scene.physics.add.existing(this);

		// Decimos que el personaje colisiona con los límites del mundo
		this.body.setCollideWorldBounds();
		
		//modificar tamaño box collider
		this.body.setSize(20, 20)
		this.body.setOffset(5, 30);
        

	}

	/**
	 * Bucle principal del personaje, actualizamos su posición y ejecutamos acciones según el Input
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */
    
	preUpdate(t, dt) {
		// Es muy imporante llamar al preUpdate del padre (Sprite), sino no se ejecutará la animación
		super.preUpdate(t, dt);

		// Mientras pulsemos la tecla 'A' movelos el personaje en la X
		if(this.aKey.isDown &&!this.dKey.isDown){
			//this.setFlip(true, false)
			this.anims.isPlaying=true;
			if(this.anims.currentAnim.key !== 'left'){
				this.play('left');
			}
			
			//this.x -= this.speed*dt / 1000;
			this.body.setVelocityX(-this.speed);
		}

		// Mientras pulsemos la tecla 'D' movelos el personaje en la X
		if(this.dKey.isDown &&!this.aKey.isDown){
			//this.setFlip(false, false)
			this.anims.isPlaying=true;
			if(this.anims.currentAnim.key !== 'rigth'){
				this.play('rigth');
			}
			//this.x += this.speed*dt / 1000;
			this.body.setVelocityX(this.speed);
		}

        // Mientras pulsemos la tecla 'A' movelos el personaje en la Y
		if(this.wKey.isDown&&!this.sKey.isDown){
			this.anims.isPlaying=true;
			//this.setFlip(false, false)
			if(this.anims.currentAnim.key !== 'up'&&!this.aKey.isDown&&!this.dKey.isDown ){
				this.play('up');
			}
			//this.x += this.speed*dt / 1000;
			this.body.setVelocityY(-this.speed);
		}

        if(this.sKey.isDown &&!this.wKey.isDown){
			this.anims.isPlaying=true;
			//this.setFlip(false, false)
			if(this.anims.currentAnim.key !== 'down'&&!this.aKey.isDown&&!this.dKey.isDown ){
				this.play('down');
			}
			//this.x += this.speed*dt / 1000;
			this.body.setVelocityY(this.speed);
		}

		// Si dejamos de pulsar 'A' o 'D' volvemos al estado de animación'idle'
		// Phaser.Input.Keyboard.JustUp y Phaser.Input.Keyboard.JustDown nos aseguran detectar la tecla una sola vez (evitamos repeticiones)
		if(Phaser.Input.Keyboard.JustUp(this.aKey) || Phaser.Input.Keyboard.JustUp(this.dKey)){
			// if( this.anims.isPlaying === true){
			// 	this.play('idle');
			// }
			this.anims.isPlaying=false;
			this.body.setVelocityX(0);
		}
        //caso de W S
        if(Phaser.Input.Keyboard.JustUp(this.wKey) || Phaser.Input.Keyboard.JustUp(this.sKey)){
			this.anims.isPlaying=false;
			// if(this.anims.isPlaying === true){
			// 	this.play('idle');
			// }
			this.body.setVelocityY(0);
		}
        this.body.velocity.normalize().scale(this.speed);
		if(this.hasColided){
			this.elapsedTime += dt;
			if(this.elapsedTime >= 500){
				console.log('entra');
				this.hasColided = false;
				this.elapsedTime = 0;	
			}
		}
	
	}

	DecreaseLife(){
		this.helathPoints -= 10;
		this.hasColided = true;

	}
	GetPosX(){return this.x;}
	GetPosY(){return this.y;}


}