import Enemy from './Enemy.js';
import Bullet from './Bullet.js';
export default class Lanzador extends Enemy {
	/**
	 * Constructor de Knight, nuestro caballero medieval con espada y escudo
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */
	constructor(scene, x, y,target) {
		super(scene, x, y, 'lanzador');
        this.x = x;
        this.y = y;
        this.scene = scene;
		this.speed = 10;
		this.target = target;
        this.elapsedTime = 0;
		this.enemy = this.scene.add.existing(this); //Añadimos el personaje a la escena
        
		// Agregamos el personaje a las físicas para que Phaser lo tenga en cuenta
		scene.physics.add.existing(this);
		// Decimos que el personaje colisiona con los límites del mundo
		//this.body.setCollideWorldBounds();
		this.body.setImmovable(true); //para que no se mueva 
		//Creamos las animaciones
		this.scene.anims.create({
            key: 'idleLanzador',
			frames: scene.anims.generateFrameNumbers('lanzador', {start:1, end:1}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
            key: 'upLanzador',
			frames: scene.anims.generateFrameNumbers('lanzador', {start:9, end:11}),
			frameRate: 5,
			repeat: -1
		});
        this.scene.anims.create({
			key: 'downLanzador',
			frames: scene.anims.generateFrameNumbers('lanzador', {start:0, end:2}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'leftLanzador',
			frames: scene.anims.generateFrameNumbers('lanzador', {start:3, end:5}),
			frameRate: 5,
			repeat: -1
		});
        this.scene.anims.create({
            key: 'rigthLanzador',
			frames: scene.anims.generateFrameNumbers('lanzador', {start:6, end:8}),
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
            this.play("upLanzador");
		}
		else if(this.body.velocity.y > 0){
            this.play("downLanzador");
            
		}
		if(this.body.velocity.x > 0){
            this.play("rigthLanzador");
		}
		else if(this.body.velocity.x < 0){
            this.play("leftLanzador");
		}
	}

	CalculateVectorX(){
        return this.target.GetPosX() -this.x;
    }
    CalculateVectorY(){
        return this.target.GetPosY() -this.y;
    }
	preUpdate(t, dt) {
        super.preUpdate(t,dt);
        this.elapsedTime += dt;
		if(this.elapsedTime >= 1000){
            new Bullet(this.scene, this.x, this.y, this.CalculateVectorX(), this.CalculateVectorY());
            this.elapsedTime = 0;
		}
		this.PlayAnimation();

	}
	
}