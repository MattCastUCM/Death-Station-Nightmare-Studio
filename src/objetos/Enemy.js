export default class Enemy extends Phaser.GameObjects.Sprite {
	 constructor(scene, x, y, name) {
        super(scene, x, y, name);
        this.name = name;

    }
	Damage(){
        
	}

    Attack(){

    }



    Die(){

    }
	
    preupdate(t,dt){
        super.preupdate(t,dt);
    }

}