import Enemy from './Enemy.js';
export default class Persecutor extends Enemy {
	constructor(scene, x, y) {
		super(scene, x, y, 'Topo');
		this.speed = 40;
		this.scene.add.existing(this); //Añadimos el personaje a la escena
        
		// Agregamos el personaje a las físicas para que Phaser lo tenga en cuenta
		scene.physics.add.existing(this);
		// Decimos que el personaje colisiona con los límites del mundo
		this.body.setCollideWorldBounds();
		this.body.setImmovable(true); //para que no se mueva 
		//Creamos las animaciones
		this.scene.anims.create({
			key: 'idleTopo',
			frames: scene.anims.generateFrameNumbers('topo', {start:1, end:1}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'upTopo',
			frames: scene.anims.generateFrameNumbers('topo', {start:9, end:11}),
			frameRate: 5,
			repeat: -1
		});
        this.scene.anims.create({
			key: 'downTopo',
			frames: scene.anims.generateFrameNumbers('topo', {start:0, end:2}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'leftTopo',
			frames: scene.anims.generateFrameNumbers('topo', {start:3, end:5}),
			frameRate: 5,
			repeat: -1
		});
        this.scene.anims.create({
			key: 'rigthTopo',
			frames: scene.anims.generateFrameNumbers('topo', {start:6, end:8}),
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
			this.play("upTopo");
		}
		else if(this.body.velocity.y > 0){
			this.play("downTopo");
		
		}
	}
	preUpdate(t, dt) {
		super.preUpdate(t,dt);
		this.body.velocity.normalize().scale(this.speed);
        this.Follow();
		this.PlayAnimation();
		

	}
	
}