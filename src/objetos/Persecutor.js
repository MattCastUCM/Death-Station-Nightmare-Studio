import Enemy from './Enemy.js';
export default class Persecutor extends Enemy {
	/**
	 * Constructor de Knight, nuestro caballero medieval con espada y escudo
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */
	constructor(scene, x, y,target) {
		super(scene, x, y, 'Persecutor');
		this.speed = 40;
		this.target = target;
		this.scene.add.existing(this); //Añadimos el personaje a la escena
        
		// Agregamos el personaje a las físicas para que Phaser lo tenga en cuenta
		scene.physics.add.existing(this);
		// Decimos que el personaje colisiona con los límites del mundo
		//this.body.setCollideWorldBounds();
		this.body.setImmovable(true); //para que no se mueva 
		//Creamos las animaciones
		this.scene.anims.create({
			key: 'idlePersecutor',
			frames: scene.anims.generateFrameNumbers('persecutor', {start:1, end:1}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'upPersecutor',
			frames: scene.anims.generateFrameNumbers('persecutor', {start:9, end:11}),
			frameRate: 5,
			repeat: -1
		});
        this.scene.anims.create({
			key: 'downPersecutor',
			frames: scene.anims.generateFrameNumbers('persecutor', {start:0, end:2}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'leftPersecutor',
			frames: scene.anims.generateFrameNumbers('persecutor', {start:3, end:5}),
			frameRate: 5,
			repeat: -1
		});
        this.scene.anims.create({
			key: 'rigthPersecutor',
			frames: scene.anims.generateFrameNumbers('persecutor', {start:6, end:8}),
			frameRate: 5,
			repeat: -1
		});

		// La animación a ejecutar según se genere el personaje será 'idle'
    
		
		//modificar tamaño box collider
		this.body.setSize(20, 20)
		
		this.body.setOffset(5, 30);
	}
	
	PlayAnimation()
	{
		if(this.body.velocity.y < 0){
			this.play("upPersecutor");
		}
		else if(this.body.velocity.y > 0){
			this.play("downPersecutor");
		
		}
		if(this.body.velocity.x > 0){
			this.play("rigthPersecutor");
		}
		else if(this.body.velocity.x < 0){
			this.play("leftPersecutor");
		}
	}

	Follow () {
        this.scene.physics.moveToObject(this, this.target, this.speed);
    }
	preUpdate(t, dt) {
		super.preUpdate(t,dt);
		this.body.velocity.normalize().scale(this.speed);
        this.Follow();
		this.PlayAnimation();
		

	}
	
}