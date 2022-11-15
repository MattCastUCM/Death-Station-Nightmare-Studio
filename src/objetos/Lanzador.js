import Enemy from './Enemy.js';
import Bullet from './Bullet.js';
export default class Lanzador extends Enemy {
	/**
	 * Constructor de Knight, nuestro caballero medieval con espada y escudo
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */
	constructor(scene, x, y, target) {
		super(scene, x, y, 20, 20, 5, 30, 'lanzador', 40, target, 15);
		this.elapsedTime = 0;
		this.shootTime = 2;
		//Creamos las animaciones
		this.scene.anims.create({
			key: 'idleLanzador',
			frames: scene.anims.generateFrameNumbers('lanzador', { start: 1, end: 1 }),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'upLanzador',
			frames: scene.anims.generateFrameNumbers('lanzador', { start: 9, end: 11 }),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'downLanzador',
			frames: scene.anims.generateFrameNumbers('lanzador', { start: 0, end: 2 }),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'leftLanzador',
			frames: scene.anims.generateFrameNumbers('lanzador', { start: 3, end: 5 }),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'rigthLanzador',
			frames: scene.anims.generateFrameNumbers('lanzador', { start: 6, end: 8 }),
			frameRate: 5,
			repeat: -1
		});

	}

	PlayAnimation() {
		if (this.body.velocity.y < 0) {
			this.play("upLanzador");
		}
		else if (this.body.velocity.y > 0) {
			this.play("downLanzador");

		}
		if (this.body.velocity.x > 0) {
			this.play("rigthLanzador");
		}
		else if (this.body.velocity.x < 0) {
			this.play("leftLanzador");
		}
	}

	CalculateVectorX() {
		return this.target.GetPosX() - this.x;
	}
	CalculateVectorY() {
		return this.target.GetPosY() - this.y;
	}
	preUpdate(t, dt) {
		super.preUpdate(t, dt);

		this.elapsedTime += dt;

		// Distancia entre sí y el jugador
		let dist = Phaser.Math.Distance.BetweenPoints(this, this.target)
		// Si está muy lejos, se mueve hacia el jugador
		// // if(dist > 400 ){
		// // 	this.Follow();
		// // }
		// // Si entra en el rango, se detiene
		// else if (dist <= 400 ){
		// 	this.move(0,0);
		// }
		// Si está en el rango y ha pasado cierto tiempo, lanza un cuchillo
		// y reinicia el contador para lanzar más cuchillos
		if (this.elapsedTime >= this.shootTime*1000 && dist <= 400) {
			new Bullet(this.scene, this.x, this.y, this.CalculateVectorX(), this.CalculateVectorY(), this.target);
			this.elapsedTime = 0;
		}

	}

}
