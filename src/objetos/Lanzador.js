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
		super(scene, x, y, 13, 10, 19, 30, 'lanzador', 40, scene.player, 15);
		this.elapsedTime = 0;
		this.shootTime = 10;
		this.throwSound = "lanzadorThrow";
		this.hurtSound = "lanzadorHurt";

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
		this.scene = scene;
		this.play("idleLanzador");
		this.on('damaged',()=>this.scene.soundManager.play(this.hurtSound));

		this.vectorX = 0;
		this.vectorY = 0;
	}


	shoot() {
		new Bullet(this.scene, this.x, this.y, this.vectorX, this.vectorY, this.target);
		this.scene.soundManager.play(this.throwSound);
		this.anims.restart();
	}


	preUpdate(t, dt) {
		super.preUpdate(t, dt);

		
		// Distancia entre sí y el jugador
		let dist = Phaser.Math.Distance.BetweenPoints(this, this.target)

		// Si está fuera de rango y no está reproduciendo la animación idle, la reproduce
		if (dist > 400 && this.anims.currentAnim.key !== "idleLanzador") {
			this.play("idleLanzador");
		}

		// Si no, está dentro de rango y al empezar la animación de disparo (acabar la anterior)
		// se genera un nuevo proyectil y se reinician las animaciones
		else if (dist <= 400) {
			this.vectorX = this.target.x- this.x;
			this.vectorY = this.target.y - this.y;

			// Si el jugador está a su izquierda y no está reproduciendo la animación hacia la izquierda, la reproduce
			if (this.vectorX < -100 && this.anims.currentAnim.key !== "leftLanzador") {
				this.play("leftLanzador").anims.chain("shootLeft");
				this.on("animationcomplete-leftLanzador", ()=>{	
					this.shoot();
					this.anims.restart();
				});
			}
			// Si no, si el jugador está a su derecha y no está reproduciendo la animación hacia la derecha, la reproduce
			else if (this.vectorX > 100 && this.anims.currentAnim.key !== "rightLanzador") {
				this.play("rightLanzador").anims.chain("shootRight");
				this.on("animationcomplete-rightLanzador", ()=>{	
					this.shoot();
					this.anims.restart();
				});
			}
			// Si no, si el jugador está en el medio,
			else if (this.vectorX > -10 && this.vectorX < 10) {
				// Si está por encima y no está reproduciendo la animación hacia arriba, la reproduce
				if (this.vectorY > 0 && this.anims.currentAnim.key !== "downLanzador") {
					this.play("downLanzador").anims.chain("shootDown");
					this.on("animationcomplete-downLanzador", ()=>{	
						this.shoot();
						this.anims.restart();
					});
				}
				// Si no, si está por debajo y no está reproduciendo la animación hacia abajo, la reproduce
				else if (this.vectorY < -10 && this.anims.currentAnim.key !== "upLanzador") {
					this.play("upLanzador").anims.chain("shootUp");
					this.on("animationcomplete-upLanzador", ()=>{
						this.shoot();
						this.anims.restart();
					});
				}
			}
		}
	}

}
