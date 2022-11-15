import Lanzador from './Lanzador.js';
import Persecutor from './Persecutor.js';
import Topo from './Topo.js';

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
		let enemy;

        if(name == 'persecutor'){
			
			enemy = new Persecutor(this.scene,x,y, target);
        }
		if(name == 'lanzador'){
			enemy = new Lanzador(this.scene, x, y, target);
		}
		if(name == 'topo'){
			enemy = new Topo(this.scene,x,y, target);
		}
       
		this.scene.enemies.add(enemy);
		return enemy;
    }
}
