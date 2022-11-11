import gameObject from './gameObject.js';
export default class Enemy extends gameObject {
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