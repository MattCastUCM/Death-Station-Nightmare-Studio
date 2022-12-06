import Cat from '../objetos/Cat.js';
import CardBoard from '../objetos/CartBoard.js';
import WoodBox from '../objetos/WoodBox.js';
import Persecutor from '../objetos/Persecutor.js';
import Lanzador from '../objetos/Lanzador.js';
import Trigger from '../objetos/Trigger.js';
import gameObject from '../objetos/gameObject.js';
import LEVEL_BASE from './LEVEL_BASE.js';
/**
 * Nivel 2
 * @extends LEVEL_BASE
 */
export default class LEVEL_02 extends LEVEL_BASE {
	constructor() {
		let nextlevel="level3Map";
		super("LEVEL_02",nextlevel,'level2','tilesLevel2',1394, false);
	}
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		super.create();
		let scene = this; // Nos guardamos una referencia a la escena para usarla en la función anidada que viene a continuación
        this.dialogManager = this.scene.get('dialogManager');
        this.hud = this.scene.get('hud');
		this.hud.scene.setVisible(true);
        this.hud.changeLevel(2,this);
		this.soundManager.playBGM("level2");

		this.player.setPosition(159,371);

		let cardBoardArray = this.map.createFromObjects('objetos', [
			{ gid:1395, classType: CardBoard, key: 'cartBoard' }]);
		this.cartBoardBoxes.addMultiple(cardBoardArray);
		cardBoardArray.forEach(obj => {
			obj.body.setImmovable();
		});
		let woodBoxesArray = this.map.createFromObjects('objetos', [
			{ gid: 1396, classType: WoodBox, key: 'woodBox' }]);
		this.woodBoxes.addMultiple(woodBoxesArray);
		woodBoxesArray.forEach(obj => {
			obj.body.setImmovable();
		});

		let EmenyPersecutorArray = this.map.createFromObjects('objetos', [
			{ gid: 1397, classType: Persecutor, key: 'persecutor' }]);
		EmenyPersecutorArray.forEach(element => {
			element.setScale(2);
		});

		this.enemies.addMultiple(EmenyPersecutorArray);
		let EmenyLanzadorArray = this.map.createFromObjects('objetos', [
			{ gid: 1398, classType: Lanzador, key: 'lanzador' }]);
		EmenyLanzadorArray.forEach(element => {
			element.setScale(2.5);
		});
		this.enemies.addMultiple(EmenyLanzadorArray);

		//decolacion
		let Basuras = this.map.createFromObjects('dec', [{ gid: 5,  key: 'Basura' }]);
		this.objects.addMultiple(Basuras);
		Basuras.forEach(obj => {obj.body.setImmovable();});

		let cabezas = this.map.createFromObjects('dec', [{ gid: 18 ,  key: 'cabeza' }]);
		this.objects.addMultiple(cabezas);
		cabezas.forEach(obj => {obj.body.setImmovable();});

		let carritos = this.map.createFromObjects('dec', [{ gid: 7, key: 'carrito' }]);
		this.objects.addMultiple(carritos);
		carritos.forEach(obj => {obj.body.setImmovable();});

		let carteles = this.map.createFromObjects('dec', [{ gid: 17,  key: 'cartel2' }]);
		this.objects.addMultiple(carteles);
		carteles.forEach(obj => {obj.body.setImmovable();});

		let doscarteles = this.map.createFromObjects('dec', [{ gid: 16,  key: 'dos carteles' }]);
		this.objects.addMultiple(doscarteles);
		doscarteles.forEach(obj => {obj.body.setImmovable();});

		let latas = this.map.createFromObjects('dec', [{ gid: 8, key: 'Latas' }]);
		this.objects.addMultiple(latas);
		latas.forEach(obj => {obj.body.setImmovable();});

		let maletas = this.map.createFromObjects('dec', [{ gid: 9,  key: 'Maletas' }]);
		this.objects.addMultiple(maletas);
		maletas.forEach(obj => {obj.body.setImmovable();});

		let panel= this.map.createFromObjects('dec', [{ gid: 10,  key: 'Panel' }]);
		this.objects.addMultiple(panel);
		panel.forEach(obj => {obj.body.setImmovable();});

		let papeles=this.map.createFromObjects('dec',[{ gid: 11,  key: 'Papeles' }]);
		this.objects.addMultiple(papeles);
		papeles.forEach(obj => {obj.body.setImmovable();});

		let ratas= this.map.createFromObjects('dec', [{ gid: 12, key: 'rata' }]);
		this.objects.addMultiple(ratas);
		ratas.forEach(obj => {obj.body.setImmovable();});

		let señorsincabeza= this.map.createFromObjects('dec', [{ gid: 13,  key: 'señor' }]);
		this.objects.addMultiple(señorsincabeza);
		señorsincabeza.forEach(obj => {obj.body.setImmovable();});

		let Sillas = this.map.createFromObjects('dec', [{ gid: 14,  key: 'Silla' }]);
		this.objects.addMultiple(Sillas);
		Sillas.forEach(obj => {obj.body.setImmovable();});

		let sillon = this.map.createFromObjects('dec', [{ gid: 15, key: 'sillones' }]);
		this.objects.addMultiple(sillon);
		sillon.forEach(s=>{s.body.setImmovable();});
	}

	/*Mandarle a dialogManager el texto que tiene que printear*/
	newText(text) {
		this.dialogManager.Init(text);
	}


	/*Informa al player y al hud*/
	DecreaseLife(player) {
		this.hud.changeLifeValue(player.hp);
		if(player.hp<=0){
			this.scene.start('restart', { me: this }); 
			this.soundManager.stopBGM("level2");
		}
	}

	/*Para pausar el dialogManager , llamado por el hud*/
	pauseDialog() {
		this.dialogManager.scene.pause();
	}
	resumeDialog() {
		this.dialogManager.scene.resume();
	}

}
