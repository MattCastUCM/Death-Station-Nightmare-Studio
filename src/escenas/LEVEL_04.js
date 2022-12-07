import Cat from '../objetos/Cat.js';
import CardBoard from '../objetos/CartBoard.js';
import WoodBox from '../objetos/WoodBox.js';
import Persecutor from '../objetos/Persecutor.js';
import Lanzador from '../objetos/Lanzador.js';
import Topo from '../objetos/Topo.js';
import Trigger from '../objetos/Trigger.js';
import gameObject from '../objetos/gameObject.js';
import LEVEL_BASE from './LEVEL_BASE.js';
/**
 * Nivel 4
 * @extends LEVEL_BASE
 */
export default class LEVEL_04 extends LEVEL_BASE {
	constructor() {
		let nextlevel="endMap";
		super("LEVEL_04",nextlevel,'level4','tilesLevel4',6015);
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
        this.hud.changeLevel(4,this);
		this.soundManager.playBGM("level4");
		this.player.weaponManager.nextLevel(true,true,true);
		this.player.vision.setScale(6);

		//this.player.setPosition(159,371);

		// Cajas de cartón
		let cardBoardArray = this.map.createFromObjects('objetos', [{ gid: 6034, classType: CardBoard, key: 'cartBoard' }] );
		this.cartBoardBoxes.addMultiple(cardBoardArray);
		cardBoardArray.forEach(obj => {
			obj.body.setImmovable();
		});

		// Cajas de madera
		let woodBoxesArray = this.map.createFromObjects('objetos', [{ gid: 6035, classType: WoodBox, key: 'woodBox' }] );		
		this.woodBoxes.addMultiple(woodBoxesArray);
		woodBoxesArray.forEach(obj => {
			obj.body.setImmovable();
		});

		// Persecutores
		let EmenyPersecutorArray = this.map.createFromObjects('objetos', [{ gid: 6032, classType: Persecutor, key: 'persecutor' }] );
		EmenyPersecutorArray.forEach(obj => {
			obj.setScale(2);
		});
		this.enemies.addMultiple(EmenyPersecutorArray);
		
		// Lanzadores
		let EmenyLanzadorArray = this.map.createFromObjects('objetos', [{ gid: 6031, classType: Lanzador, key: 'lanzador' }]);
		EmenyLanzadorArray.forEach(obj => {
			obj.setScale(2.5);
			obj.body.setImmovable();
		});
		this.enemies.addMultiple(EmenyLanzadorArray);

		// Topos
        let EmenyTopoArray=this.map.createFromObjects('objetos',[{ gid:6033, classType: Topo,key:'topo' }] );
        EmenyTopoArray.forEach(element => {
            element.setScale(2);
        });
       this.enemies.addMultiple(EmenyTopoArray);
	   

		//decolacion
		let Basuras = this.map.createFromObjects('objetos', [{ gid: 6026,  key: 'Basura' }]);
		this.objects.addMultiple(Basuras);
		Basuras.forEach(obj => {obj.body.setImmovable();});

		let cabezas = this.map.createFromObjects('objetos', [{ gid: 6027 ,  key: 'cabeza' }]);
		this.objects.addMultiple(cabezas);
		cabezas.forEach(obj => {obj.body.setImmovable();});

		let carritos = this.map.createFromObjects('objetos', [{ gid: 6028, key: 'carrito' }]);
		this.objects.addMultiple(carritos);
		carritos.forEach(obj => {obj.body.setImmovable();});

		let carteles = this.map.createFromObjects('objetos', [{ gid: 6029,  key: 'cartel2' }]);
		this.objects.addMultiple(carteles);
		carteles.forEach(obj => {obj.body.setImmovable();});

		let doscarteles = this.map.createFromObjects('objetos', [{ gid: 6025,  key: 'dos carteles' }]);
		this.objects.addMultiple(doscarteles);
		doscarteles.forEach(obj => {obj.body.setImmovable();});

		let latas = this.map.createFromObjects('objetos', [{ gid: 6022, key: 'Latas' }]);
		this.objects.addMultiple(latas);
		latas.forEach(obj => {obj.body.setImmovable();});

		let maletas = this.map.createFromObjects('objetos', [{ gid: 6017,  key: 'Maletas' }]);
		this.objects.addMultiple(maletas);
		maletas.forEach(obj => {obj.body.setImmovable();});

		let panel= this.map.createFromObjects('objetos', [{ gid: 6018,  key: 'Panel' }]);
		this.objects.addMultiple(panel);
		panel.forEach(obj => {obj.body.setImmovable();});

		let papeles=this.map.createFromObjects('objetos',[{ gid: 6019,  key: 'Papeles' }]);
		this.objects.addMultiple(papeles);
		papeles.forEach(obj => {obj.body.setImmovable();});

		let ratas= this.map.createFromObjects('objetos', [{ gid: 6020, key: 'rata' }]);
		this.objects.addMultiple(ratas);
		ratas.forEach(obj => {obj.body.setImmovable();});

		let señorsincabeza= this.map.createFromObjects('objetos', [{ gid: 6021,  key: 'señor sin cabeza' }]);
		this.objects.addMultiple(señorsincabeza);
		señorsincabeza.forEach(obj => {obj.body.setImmovable();});

		let Sillas = this.map.createFromObjects('objetos', [{ gid: 6024,  key: 'Silla' }]);
		this.objects.addMultiple(Sillas);
		Sillas.forEach(obj => {obj.body.setImmovable();});

		let sillon = this.map.createFromObjects('objetos', [{ gid: 6023, key: 'sillones' }]);
		this.objects.addMultiple(sillon);
		sillon.forEach(s=>{s.body.setImmovable();});



		let width = this.fondolayer.width
		let height = this.fondolayer.height
		let rt = this.make.renderTexture({
			width,
			height
		}, true)


		rt.setDepth(10000);
		// poner fondo a negro
		rt.fill(0x000000, 1)
		// dibuja la escena vacia 
		rt.draw(this.fondolayer)
		//poner un toque de azul a mapa 
		rt.setTint(0x5050b0)
		//0x0a2948
		//0x5050b0	
		rt.mask = new Phaser.Display.Masks.BitmapMask(this, this.player.vision);
		//invertir lo que se ver 
		rt.mask.invertAlpha = true;
		



		
		
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
			this.soundManager.stopBGM("level4");
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
