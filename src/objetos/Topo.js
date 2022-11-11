import Enemy from './Enemy.js';
export default class Persecutor extends Enemy {
	
	constructor(scene, x, y, target) {
		super(scene, x, y, 20, 20, 5, 30, 'topo', 40, target, 10);
		
		//Creamos las animaciones
		this.scene.anims.create({
			key: 'idleTopo',
			frames: scene.anims.generateFrameNumbers('topo', {start:1, end:1}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'upTopo',
			frames: scene.anims.generateFrameNumbers('topo', {start:9, end:11}),
			frameRate: 5,
			repeat: -1
		});
        this.scene.anims.create({
			key: 'downTopo',
			frames: scene.anims.generateFrameNumbers('topo', {start:0, end:2}),
			frameRate: 5,
			repeat: -1
		});
		this.scene.anims.create({
			key: 'leftTopo',
			frames: scene.anims.generateFrameNumbers('topo', {start:3, end:5}),
			frameRate: 5,
			repeat: -1
		});
        this.scene.anims.create({
			key: 'rigthTopo',
			frames: scene.anims.generateFrameNumbers('topo', {start:6, end:8}),
			frameRate: 5,
			repeat: -1
		});

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