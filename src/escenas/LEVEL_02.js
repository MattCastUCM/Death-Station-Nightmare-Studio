import Cat from '../objetos/Cat.js';
import CardBoard from '../objetos/CartBoard.js';
import WoodBox from '../objetos/WoodBox.js';
import Persecutor from '../objetos/Persecutor.js';
import Lanzador from '../objetos/Lanzador.js';
import Trigger from '../objetos/Trigger.js';
import gameObject from '../objetos/gameObject.js';
import LEVEL_BASE from './LEVEL_BASE.js';
/**
 * Escena principal.
 * @extends LEVEL_BASE
 */
export default class LEVEL_02 extends LEVEL_BASE {
	constructor() {
		let nextlevel="LEVEL_03";
		super("LEVEL_02",nextlevel,'level2','tilesLevel2',560);
	}
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		super.create();
		let scene = this; // Nos guardamos una referencia a la escena para usarla en la función anidada que viene a continuación

		// var cardBoardArray=this.map.createFromObjects('objetos',[
		// 	{gid:561, classType: CardBoard,key: 'cartBoard'}]);

		
		// this.cartBoardBoxes.addMultiple(cardBoardArray);
		// var woodBoxesArray=this.map.createFromObjects('objetos',[
		// 	{gid:562, classType: WoodBox,key: 'woodBox'}]);
		// this.woodBoxes.addMultiple(woodBoxesArray);
		// woodBoxesArray.forEach(obj => {
		// 	obj.body.setImmovable();
		// });
	
		//this.hud.
	}

	/*Mandarle a dialogManager el texto que tiene que printear*/
	newText(text) {
		this.dialogManager.Init(text);
	}


	/*Informa al player y al hud*/
	DecreaseLife(player) {
		this.hud.changeLifeValue(player.GetHP());
		if(player.GetHP()<=0){
			this.scene.start('menu'); 

		}
	}

	/*Para pausar el dialogManager , llamado por el hud*/
	pauseDialog() {
		this.dialogManager.scene.pause();
	}
	resumeDialog() {
		this.dialogManager.scene.resume();
	}

	update(t, dt) {
		
		//this.scene.start('menu'); 
		
	}

}
