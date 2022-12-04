import gameObject from './gameObject.js';

export default class CardBoard extends gameObject {

	constructor(scene, posX, posY) {
		super(scene, posX, posY, 56,32,0, 32, 'cartBoard', 0);
		//scene.physics.add.existing(this);
		let self=this;
		this.scene=scene;
		this.scene.physics.add.collider(this, this.scene.enemies, function (self) {
			self.body.setImmovable();
		});
		this.scene.physics.add.collider(this, this.scene.player, function (self) {
			self.body.setImmovable(false);
			//console.log(self.body);
		});
		
		this.setFriction(10);
		this.soundCounter = 0; //contador para emitir sonido
		this.soundMax = 50 //frecuencia de emisión de sonido 
		this.on('moving', () => this.movingSound());
	}

	/**
	 * Bucle principal de la caja, comprobamos la velocidad para reducirla y setearla a 0 en ciertos umbrales
	 * Así no se movera de manera infinita cuando la golpeemos
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */
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