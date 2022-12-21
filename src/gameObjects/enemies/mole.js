import Enemy from './enemy.js';

export default class Topo extends Enemy {
	/**
	 * Topo
	 * @extends Enemy
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */
	constructor(scene, x, y) {
		super(scene, x, y, 20, 20, 8, 10, 'topo', 40, scene.player, 10);
		
		this.elapsedTime = 0;
		this.hurtSound = "topoHurt";
		
		this.body.setImmovable(true);
		this.play("nothing");
		this.on('damaged',()=>this.scene.soundManager.play(this.hurtSound));
	}


	preUpdate(t, dt) {
		super.preUpdate(t,dt);

		let dist = Phaser.Math.Distance.BetweenPoints(this, this.target)

		// Si está cerca del jugador
		if (dist < 150){
			// Si se está reproduciendo la animación nothing, reproduce en cadena up, idle y down
			if(this.elapsedTime > 500 && this.anims.currentAnim.key === "nothing"){
				this.play("upTopo").anims.chain("idleTopo").anims.chain("downTopo");
			}
			// Si está apareciendo o desapareciendo, se desactiva su trigger
			if(this.anims.currentAnim.key === "nothing" || this.anims.currentAnim.key === "upTopo" ||this.anims.currentAnim.key === "downTopo" )
				this.body.enable = false;
			// Si ha aparecido, se activa su trigger
			else if (this.anims.currentAnim.key === "idleTopo")
				this.body.enable = true;
	
			// Cuando acaba la animación down, cambia de posición,
			// vuelve a reproducir nothing, y se reinicia el contador
			this.on("animationcomplete-downTopo", ()=>{
				this.setPosition(this.target.x, this.target.y);
				this.play("nothing");
				this.elapsedTime = 0;
			});
	
			this.elapsedTime += dt;
		}

	}
	

}