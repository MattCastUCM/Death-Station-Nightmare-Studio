import gameObject from './gameObject.js';

export default class CardBoard extends gameObject {

	constructor(scene, posX, posY) {
		super(scene, posX, posY, 56,32,0, 32, 'cartBoard', 0);
		//scene.physics.add.existing(this);
		let self=this;
		this.scene=scene;
		self.resetImmovable=false;
		this.scene.physics.add.collider(this, this.scene.player, function () {
			if(self.scene.player.velX!=0||self.scene.player.velY!=0){
				self.body.setImmovable(false);
			}
			else{
				self.body.setImmovable();
			}
			if(!self.resetImmovable&&!self.body.setImmovable==false){
				self.resetImmovable=true;
				setTimeout(()=>{
					self.body.setImmovable();
					self.resetImmovable=false;
				
				},1000);

			}
			
			
		});
		
		this.setFriction(10);
	}
	// ResetImmovable(){
	// 	if(self.velX!=0||self.velY!=0){
	// 		this.body.setImmovable();
	// 	}
	// }

	


	/**
	 * Bucle principal de la caja, comprobamos la velocidad para reducirla y setearla a 0 en ciertos umbrales
	 * Así no se movera de manera infinita cuando la golpeemos
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */
	preUpdate(t, dt) {
		super.preUpdate(t,dt);
		this.friction();

	}

}