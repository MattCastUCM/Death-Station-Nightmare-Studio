import LEVEL_BASE from './LEVEL_BASE.js';
import CardBoard from '../objetos/cardBoard.js';
import WoodBox from '../objetos/woodBox.js';
import Cat from '../objetos/Cat.js';
import Persecutor from '../objetos/persecutor.js';
import Lanzador from '../objetos/lanzador.js';
import Trigger from '../objetos/trigger.js';
import InteractiveObjects from '../objetos/InteractiveObjects.js';

export default class LEVEL_03 extends LEVEL_BASE {
	/**
	 * Nivel 3
	 * @extends LEVEL_BASE
	 */
	constructor() {
		let nextlevel="level4Map";
		super("LEVEL_03",nextlevel,'level3','tileslevel3',560, false);
	}


	// Creación de los elementos de la escena
	create() {
		super.create();
		let scene = this; // Nos guardamos una referencia a la escena
		
        this.dialogManager = this.scene.get('dialogManager');
        this.hud = this.scene.get('hud');
		this.hud.scene.setVisible(true);
        this.hud.changeLevel(3,this);

		this.soundManager.playBGM("level3");

		this.player.weaponManager.nextLevel(true,false,true);

		//CAMARA
		this.cameras.main.setDeadzone (0,this.cameras.main.centerY*2);

		//Gato
		let gato = new Cat(this, 200, 400);
		gato.setScale(1.2);

		// Cajas de cartón
		let cardBoardArray = this.map.createFromObjects('objetos', [{ gid: 561, classType: CardBoard, key: 'cartBoard' }] );
		this.cartBoardBoxes.addMultiple(cardBoardArray);
		cardBoardArray.forEach(obj => {
			obj.body.setImmovable();
		});

		// Cajas de madera
		let woodBoxesArray = this.map.createFromObjects('objetos', [{ gid: 562, classType: WoodBox, key: 'woodBox' }] );		
		this.woodBoxes.addMultiple(woodBoxesArray);
		woodBoxesArray.forEach(obj => {
			obj.body.setImmovable();
		});

		// Persecutores
		let EmenyPersecutorArray = this.map.createFromObjects('objetos', [{ gid: 563, classType: Persecutor, key: 'persecutor' }] );
		EmenyPersecutorArray.forEach(obj => {
			obj.setScale(2);
		});
		this.enemies.addMultiple(EmenyPersecutorArray);
		
		// Lanzadores
		let EmenyLanzadorArray = this.map.createFromObjects('objetos', [{ gid: 564, classType: Lanzador, key: 'lanzador' }]);
		this.enemies.addMultiple(EmenyLanzadorArray);
		EmenyLanzadorArray.forEach(obj => {
			obj.setScale(2.5);
			obj.body.setImmovable();
		});

		// Topos
        let EmenyTopoArray=this.map.createFromObjects('objetos',[{ gid:565, classType: Topo,key:'topo' }] );
        EmenyTopoArray.forEach(element => {
            element.setScale(2);
        });
       this.enemies.addMultiple(EmenyTopoArray);


	    let barra = this.map.createFromObjects('objetos', [{ name: 'barra',  key: 'barra' }]);
		scene.physics.add.existing(barra[0]);
		barra[0].body.setSize(50,300,true);
		console.log(barra[0]);
		scene.physics.add.overlap(this.player, barra[0], () => { this.player.HasNewWeapon('barra'); barra[0].destroy(); });


        // Iluminación
		const width = this.fondolayer.width
		const height = this.fondolayer.height
		const rt = this.make.renderTexture({
			width,
			height
		}, true)


		rt.setDepth(1000);
		// poner fondo a negro
		rt.fill(0x000000, 1)
		// dibuja la escena vacia 
		rt.draw(this.fondolayer)
		//poner un toque de azul a mapa 
		rt.setTint(0x5050b0)
		//0x0a2948
		//0x5050b0	// vision.scale =4;
		//vision.startFollow(this.personaje);
		rt.mask = new Phaser.Display.Masks.BitmapMask(this, this.player.vision);
		rt.mask.invertAlpha = true;
	
	}

	
	// Le manda al DialogManager el texto que tiene que imprimir
	newText(text) {
		this.dialogManager.initDialog(text);
	}


	// Informa al jugador y al HUD que ha bajado la vida
	DecreaseLife(player) {
		this.hud.changeLifeValue(player.hp);
		if (player.hp <= 0) {
			this.hud.quitInventory('hacha');
			this.scene.start('restart', { me: this });
			this.soundManager.stopBGM("level1");

		}

	}


	restart() {
		this.hud.quitInventory('hacha');
		this.soundManager.stopBGM("level1");
		this.scene.start('LEVEL_01');
	}
	
	
	// Pausa el DialogManager (llamado por el HUD)
	pauseDialog() {
		this.dialogManager.scene.pause();
	}
	resumeDialog() {
		this.dialogManager.scene.resume();
	}

}
