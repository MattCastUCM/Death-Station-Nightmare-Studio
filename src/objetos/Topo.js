import Enemy from './Enemy.js';
export default class Persecutor extends Enemy {
	
	constructor(scene, x, y, target) {
		super(scene, x, y, 20, 20, 8, 10, 'topo', 40, target, 10);
		this.hasAppeared = false;

		//Creamos las animaciones
		this.scene.anims.create({
			key: 'idleTopo',
			frames: scene.anims.generateFrameNumbers('topo', {start:0, end:3}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'upTopo',
			frames: scene.anims.generateFrameNumbers('topo', {start:11, end:5}),
			frameRate: 5,
			repeat: 0
		});
        this.scene.anims.create({
			key: 'downTopo',
			frames: scene.anims.generateFrameNumbers('topo', {start:5, end:11}),
			frameRate: 5,
			repeat: 0
		});
		
		this.play("upTopo");

	}
	
	PlayAnimation()
	{
		if(this.body.velocity.y < 0){
			this.play("upTopo");
		}
		else if(this.body.velocity.y > 0){
			this.play("downTopo");
		
		}
	}
	preUpdate(t, dt) {
		super.preUpdate(t,dt);
	}
	

}