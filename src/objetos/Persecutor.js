import Enemy from './Enemy.js';
export default class Persecutor extends Enemy {
	/**
	 * Constructora
	 * @param {Scene}  - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} yscene - coordenada y
	 */

	constructor(scene, x, y) {
		super(scene, x, y, 20, 20, 22, 32, 'Persecutor', 40, scene.player, 15);
		this.persecuteDist = 400;
		this.persecuting = false;
		this.target = scene.player;
		this.soundCounter = 0; //contador para emitir sonido
		this.soundMax=200; //frecuencia de emisión de sonido 
		this.growlSound = ["persecutorGrowl1","persecutorGrowl2","persecutorGrowl3"];
		this.hurtSound = "persecutorHurt";
		//Creamos las animaciones
		this.scene.anims.create({
			key: 'idlePersecutor',
			frames: scene.anims.generateFrameNumbers('persecutor', { start: 18, end: 18 }),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'upPersecutor',
			frames: scene.anims.generateFrameNumbers('persecutor', { start: 0, end: 8 }),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'downPersecutor',
			frames: scene.anims.generateFrameNumbers('persecutor', { start: 18, end: 26 }),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'leftPersecutor',
			frames: scene.anims.generateFrameNumbers('persecutor', { start: 9, end: 17 }),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'rightPersecutor',
			frames: scene.anims.generateFrameNumbers('persecutor', { start: 27, end: 36 }),
			frameRate: 5,
			repeat: -1
		});
		this.play("idlePersecutor");

		this.scene = scene;
		this.on('damaged',()=>this.scene.soundManager.play(this.hurtSound));
		

	}


	PlayAnimation() {

		if (this.body.velocity.y < 0 && this.body.velocity.x > -10 && this.body.velocity.x < 10 && this.anims.currentAnim.key !== 'upPersecutor') {
			this.play('upPersecutor');

		}
		else if (this.body.velocity.y > 0 && this.body.velocity.x > -10 && this.body.velocity.x < 10 && this.anims.currentAnim.key !== 'downPersecutor') {
			this.play('downPersecutor');

		}
		else if (this.body.velocity.x >= 10 && this.anims.currentAnim.key !== 'rightPersecutor') {
			this.play('rightPersecutor');
		}
		else if (this.body.velocity.x <= -10 && this.anims.currentAnim.key !== 'leftPersecutor') {
			this.play('leftPersecutor');
		}

	}



	preUpdate(t, dt) {
		super.preUpdate(t, dt);

		let dist = Phaser.Math.Distance.BetweenPoints(this, this.target)

		//dejar de perseguir si está encima del jugador, o si está muy lejos
		if (this.persecuting && (dist < 20 || dist > this.persecuteDist)) { //comprobar primero que estás persiguiendo,y ya pararlo
			this.body.reset(this.x, this.y); //anula el follow
			this.play("idlePersecutor");
			this.persecuting = false;

		}
		//empieza a perseguir desde cierta distancia, y sin estar encima del jugador
		else if (dist <= this.persecuteDist ) {
			if(dist >= 20){
				this.PlayAnimation();
				this.Follow(); this.body.velocity.normalize().scale(this.speed);
				this.persecuting = true;
				
			}
			//gestionar sonido
			this.soundCounter++;
			if(this.soundCounter>this.soundMax){
				this.soundMax=Phaser.Math.Between(200, 400); //para que la frecuencia sea aleatoria
				this.soundCounter=0;
				this.scene.soundManager.play(this.growlSound[Phaser.Math.Between(0, 2)] ); //elige entre 3 audios diferentes

			}
		}



	}

}
