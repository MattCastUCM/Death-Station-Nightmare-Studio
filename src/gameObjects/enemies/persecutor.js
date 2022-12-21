import Enemy from './enemy.js';

export default class Persecutor extends Enemy {
	/**
	 * Persecutor
	 * @extends Enemy
	 * @param {Scene}  - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} yscene - coordenada y
	 */
	constructor(scene, x, y) {
		super(scene, x, y, 20, 15, 22, 40, 'Persecutor', 40, scene.player, 15);

		this.persecuteDist = 400;
		this.persecuting = false;

		this.target = scene.player;

		this.soundCounter = 0; //contador para emitir sonido
		this.soundMax=200; //frecuencia de emisión de sonido 
		this.growlSound = ["persecutorGrowl1","persecutorGrowl2","persecutorGrowl3"];
		this.hurtSound = "persecutorHurt";

		
		this.scene = scene;
		this.play('idlePersecutor');

		this.on('damaged',()=>this.scene.soundManager.play(this.hurtSound));
		

	}

	// Reproduce la animación dependiendo de su movimiento
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

		// Deja de perseguir si está encima del jugador, o si está muy lejos
		if (this.persecuting && (dist < 15 || dist > this.persecuteDist)) {
			this.body.reset(this.x, this.y);
			this.play("idlePersecutor");
			this.persecuting = false;
		}
		// Si no, empieza a perseguirlo desde cierta distancia, y sin estar encima del jugador
		else if (dist <= this.persecuteDist ) {
			if(dist >= 15){
				this.PlayAnimation();
				this.Follow(); this.body.velocity.normalize().scale(this.speed);
				this.persecuting = true;
				
			}
			// Gestiona el sonido
			this.soundCounter++;
			if(this.soundCounter>this.soundMax){
				this.soundMax=Phaser.Math.Between(200, 400); //para que la frecuencia sea aleatoria
				this.soundCounter=0;
				this.scene.soundManager.play(this.growlSound[Phaser.Math.Between(0, 2)] ); //elige entre 3 audios diferentes

			}
		}



	}

}
