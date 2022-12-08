import gameObject from './gameObject.js';

export default class CardBoard extends gameObject {
	/**
	 * Caja de cartón
	 * @extends gameObject
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */
	constructor(scene, x, y) {
		super(scene, x, y, 56,32,0, 32, 'cartBoard', 0);
		let self = this;
		this.scene = scene;
		self.resetImmovable = false;
		
		// Colision con el player
		this.scene.physics.add.collider(this, this.scene.player, function () {
			if(self.scene.player.velX!=0||self.scene.player.velY!=0){
				self.body.setImmovable(false);
			}
			else{
				self.body.setImmovable();
			}
			//resetear a imovible tras 1s 
			if(!self.resetImmovable&&!self.body.setImmovable==false){
				self.resetImmovable=true;
				setTimeout(()=>{
					self.body.setImmovable();
					self.resetImmovable=false;
				
				},1000);
			}			
		});
		
		this.setFriction(10);
		this.soundCounter = 0; //contador para emitir sonido
		this.soundMax = 50 //frecuencia de emisión de sonido 
		this.on('moving', () => this.movingSound());
	}

	
	preUpdate(t, dt) {
		super.preUpdate(t, dt);

		this.soundCounter++;
		this.friction();

	}

	
	movingSound(){
		this.soundCounter++;
		if(this.soundCounter>this.soundMax){
			this.soundCounter=0;
			this.scene.soundManager.play("cartBoard");
		}
	}

}