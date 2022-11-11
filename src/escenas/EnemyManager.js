import Lanzador from '/src/objetos/Lanzador.js';
import Persecutor from '/src/objetos/Persecutor.js';
import Topo from '/src/objetos/Topo.js';

export default class EnemyManager {
	/**
	 * Constructor de Knight, nuestro caballero medieval con espada y escudo
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */

	 constructor(scene) {
		this.scene = scene;

    }
    CreateEnemy(x, y, name, target) {

        if(name == 'persecutor'){
			return new Persecutor(this.scene,x,y, target);
        }
		if(name == 'lanzador'){
			return new Lanzador(this.scene, x, y, target);
		}
		if(name == 'topo'){
			return new Topo(this.scene,x,y);
		}
       
    }
}
