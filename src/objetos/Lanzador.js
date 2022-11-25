import Enemy from './Enemy.js';
import Bullet from './Bullet.js';
export default class Lanzador extends Enemy {
	/**
	 * Constructor de Knight, nuestro caballero medieval con espada y escudo
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */
	constructor(scene, x, y) {
		super(scene, x, y, 15, 15, 17, 26, 'lanzador', 40, scene.player, 15);
		this.elapsedTime = 0;
		this.shootTime = 2.3;
		
		//Creamos las animaciones
		this.scene.anims.create({
			key: 'idleLanzador',
			frames: scene.anims.generateFrameNumbers('lanzador', { start: 0, end: 5 }),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'upLanzador',
			frames: scene.anims.generateFrameNumbers('lanzador', { start: 56, end: 64 }),
			frameRate: 5,
			repeat: 0
		});
		this.scene.anims.create({
			key: 'downLanzador',
			frames: scene.anims.generateFrameNumbers('lanzador', { start: 14, end: 21 }),
			frameRate: 5,
			repeat: 0
		});
		this.scene.anims.create({
			key: 'leftLanzador',
			frames: scene.anims.generateFrameNumbers('lanzador', { start: 28, end: 36 }),
			frameRate: 5,
			repeat: 0
		});
		this.scene.anims.create({
			key: 'rightLanzador',
			frames: scene.anims.generateFrameNumbers('lanzador', { start: 42, end: 50 }),
			frameRate: 5,
			repeat: 0
		});
		this.scene.anims.create({
			key: 'shootUp',
			frames: scene.anims.generateFrameNumbers('lanzador', { start: 65, end: 69 }),
			frameRate: 5,
			repeat: 0
		});
		this.scene.anims.create({
			key: 'shootDown',
			frames: scene.anims.generateFrameNumbers('lanzador', { start: 22, end: 27 }),
			frameRate: 5,
			repeat: 0
		});
		this.scene.anims.create({
			key: 'shootLeft',
			frames: scene.anims.generateFrameNumbers('lanzador', { start: 37, end: 41 }),
			frameRate: 5,
			repeat: 0
		});
		this.scene.anims.create({
			key: 'shootRight',
			frames: scene.anims.generateFrameNumbers('lanzador', { start: 51, end: 55 }),
			frameRate: 5,
			repeat: 0
		});

		this.play("idleLanzador");

	}

	CalculateVectorX() {
		return this.target.GetPosX() - this.x;
	}
	CalculateVectorY() {
		return this.target.GetPosY() - this.y;
	}
	preUpdate(t, dt) {
		super.preUpdate(t, dt);

		// Distancia entre sí y el jugador
		let dist = Phaser.Math.Distance.BetweenPoints(this, this.target)

		// Si está fuera de rango y no está reproduciendo la animación idle, la reproduce
		if(dist > 400 && this.anims.currentAnim.key !== "idleLanzador") {
			this.play("idleLanzador");
		}

		// Si no, está dentro de rango y al empezar la animación de disparo (acabar la anterior)
		// se genera un nuevo proyectil y se reinician las animaciones
		else if (dist <= 400){
			// Si el jugador está a su izquierda y no está reproduciendo la animación hacia la izquierda, la reproduce
			if (this.CalculateVectorX() < -100 && this.anims.currentAnim.key !== "leftLanzador" ){
				this.play("leftLanzador").anims.chain("shootLeft");
				this.on("animationcomplete-leftLanzador", ()=>{	
					new Bullet(this.scene, this.x, this.y, this.CalculateVectorX(), this.CalculateVectorY(), this.target);
					this.anims.restart();
				});
			} 
			// Si no, si el jugador está a su derecha y no está reproduciendo la animación hacia la derecha, la reproduce
			else if(this.CalculateVectorX() > 100 && this.anims.currentAnim.key !== "rightLanzador"){
				this.play("rightLanzador").anims.chain("shootRight");
				this.on("animationcomplete-rightLanzador", ()=>{	
					new Bullet(this.scene, this.x, this.y, this.CalculateVectorX(), this.CalculateVectorY(), this.target);
					this.anims.restart();
				});
			} 
			// Si no, si el jugador está en el medio,
			else if (this.CalculateVectorX() > -10 && this.CalculateVectorX() < 10){
				// Si está por encima y no está reproduciendo la animación hacia arriba, la reproduce
				if(this.CalculateVectorY() > 0 && this.anims.currentAnim.key !== "downLanzador"){
					this.play("downLanzador").anims.chain("shootDown");
					this.on("animationcomplete-downLanzador", ()=>{	
						new Bullet(this.scene, this.x, this.y, this.CalculateVectorX(), this.CalculateVectorY(), this.target);
						this.anims.restart();
					});
				} 
				// Si no, si está por debajo y no está reproduciendo la animación hacia abajo, la reproduce
				else if(this.CalculateVectorY() < -10 && this.anims.currentAnim.key !== "upLanzador") {
					this.play("upLanzador").anims.chain("shootUp");
					this.on("animationcomplete-upLanzador", ()=>{
						new Bullet(this.scene, this.x, this.y, this.CalculateVectorX(), this.CalculateVectorY(), this.target);
						this.anims.restart();
					});
				}
			}
		}
	}

}
