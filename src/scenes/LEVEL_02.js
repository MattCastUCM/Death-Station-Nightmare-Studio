import LEVEL_BASE from './LEVEL_BASE.js';
import CardBoard from '../gameObjects/cardBoard.js';
import WoodBox from '../gameObjects/woodBox.js';
import Cat from '../gameObjects/enemies/cat.js';
import Persecutor from '../gameObjects/enemies/persecutor.js';
import Lanzador from '../gameObjects/enemies/shooter.js';
import Trigger from '../gameObjects/trigger.js';
import InteractiveObjects from '../gameObjects/interactiveObjects.js';

export default class LEVEL_02 extends LEVEL_BASE {
	/**
	 * Nivel 2
	 * @extends LEVEL_BASE
	 */
	constructor() {
		let nextlevel="level3Map";
		super("LEVEL_02", nextlevel, 'level2', 'tilesLevel2', 1394, false);
	}


	// Creación de los elementos de la escena
	create() {
		super.create();
		let scene = this; // Nos guardamos una referencia a la escena

		this.dialogManager = this.scene.get('dialogManager');
        this.hud = this.scene.get('hud');
		this.hud.scene.setVisible(true);
        this.hud.changeLevel(2, this);
		this.soundManager.playBGM("level2");
		this.player.weaponManager.nextLevel(false, false, true);

		this.player.setPosition(159, 371);

		// Cajas de cartón
		let cardBoardArray = this.map.createFromObjects('objetos', [{ gid: 1396, classType: CardBoard, key: 'cartBoard' }] );
		this.cartBoardBoxes.addMultiple(cardBoardArray);
		cardBoardArray.forEach(obj => {
			obj.body.setImmovable();
		});

		// Cajas de madera
		let woodBoxesArray = this.map.createFromObjects('objetos', [{ gid: 1397, classType: WoodBox, key: 'woodBox' }] );		
		this.woodBoxes.addMultiple(woodBoxesArray);
		woodBoxesArray.forEach(obj => {
			obj.body.setImmovable();
		});

		// Persecutores
		let EnemyPersecutorArray = this.map.createFromObjects('objetos', [{ gid: 1398, classType: Persecutor, key: 'persecutor' }] );
		EnemyPersecutorArray.forEach(obj => {
			obj.setScale(2);
		});
		this.enemies.addMultiple(EnemyPersecutorArray);
		
		// Lanzadores
		let EnemyLanzadorArray = this.map.createFromObjects('objetos', [{ gid: 1399, classType: Lanzador, key: 'lanzador' }]);
		
		this.enemies.addMultiple(EnemyLanzadorArray);
		EnemyLanzadorArray.forEach(obj => {
			obj.setScale(2.5);
			obj.body.setImmovable();
		});

		// Decoración
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

		let señorsincabeza= this.map.createFromObjects('dec', [{ gid: 13,  key: 'señor sin cabeza' }]);
		this.objects.addMultiple(señorsincabeza);
		señorsincabeza.forEach(obj => {obj.body.setImmovable();});

		let Sillas = this.map.createFromObjects('dec', [{ gid: 14,  key: 'Silla' }]);
		this.objects.addMultiple(Sillas);
		Sillas.forEach(obj => {obj.body.setImmovable();});

		let sillon = this.map.createFromObjects('dec', [{ gid: 15, key: 'sillones' }]);
		this.objects.addMultiple(sillon);
		sillon.forEach(s=>{s.body.setImmovable();});

		let escalera=this.map.createFromObjects('dec',[{name:'escalera',key:'escalera'}])

		
		let botella = this.map.createFromObjects('objetos', [{ name: 'botella',  key: 'botella' }]);
		scene.physics.add.existing(botella[0]);
		scene.physics.add.overlap(this.player, botella[0], () => { this.player.HasNewWeapon('botella'); botella[0].destroy(); });


		// Objetos interactivos:
		// Panel de estación
		new InteractiveObjects(this, 80, 450, 140, 140,'', ["¿Desde cuándo había tantas estaciones?", "¿Estaré soñando?"], this.player);
		new InteractiveObjects(this, 1700, 660, 200, 140,'', ["A ver en qué estación estamos...", "Creo que es isifihfeowfhooajdw"], this.player);

		// Pizarra
		new InteractiveObjects(this, 2150, 643, 140, 140, '', ["¿Quién habrá puesto esto?", "No habré sido yo..."], this.player);

		// Papelera
		new InteractiveObjects(this, 50, 840, 80, 60,'', ["A ver qué hay aquí...", "Uy, un examen que en el que han sacado un 0"], this.player);
		new InteractiveObjects(this, 50, 1600, 80, 100,'', ["Uffffffff qué mal huele"], this.player);

		// Cabeza
		new InteractiveObjects(this, 30, 1850, 80, 80, '', ["Ay, que se le ha salido un ojo"], this.player);
		new InteractiveObjects(this, 2350, 750, 80, 80, '', ["Me gusta su ojo"], this.player);
		new InteractiveObjects(this, 2400, 1850, 80, 80, '', ["¿Qué es lo que le sale de su boca?", "Ohhh, coca cola"], this.player);

		// Rata
		new InteractiveObjects(this, 40, 940, 100, 50,'', ["Miau, miau", "Ah no, si es una rata", "Yiuuu"], this.player);

		// Bebé
		new InteractiveObjects(this, 2850, 400, 80, 80, '', ["¿Porqué la cabeza de este bebé es cuadrada?", "Será el hijo de Steve"], this.player);

		// Maleta
		new InteractiveObjects(this, 2750, 1100, 100, 100,'', ["Malditas maletas que me tapan el camino"], this.player);
		new InteractiveObjects(this, 1300, 1200, 200, 200, '', ["Porqué hay tantas maletaaaas", "Arrrghhhh"], this.player);

		// Hombre sin cabeza
		new InteractiveObjects(this, 1900, 1250, 80, 80,'', ["Pobre hombre", "Me suena haber visto su cabeza..."], this.player);

		// Lata
		new InteractiveObjects(this, 2600, 1140, 80, 80,'', ["Dentro hay restos de aceitunas"], this.player);
		new InteractiveObjects(this, 1900, 1800, 200, 100, '', ["Por aquí tampoco puedo pasar"], this.player);

		new InteractiveObjects(this, 1200, 300, 100, 100, 'ojo', ["Ey,tú qué mirah"], this.player);
	
		/*
		// Monólogo inicial
		this.input.keyboard.enabled = false;
		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, (cam, effect) => {
			setTimeout(()=>{
				this.player.move(0,1);

				setTimeout( ()=>{
					this.player.move(0,0);
					this.input.keyboard.enabled = true;
					this.newText(["¿Esto también está vacío?", "¿Dónde he ido a parar...?"]);
				}, 1000);
			}, 500);	
		});
		*/
	}


	// Le manda al DialogManager el texto que tiene que imprimir
	newText(text) {
		this.dialogManager.initDialog(text);
	}


	// Informa al jugador y al HUD que ha bajado la vida
	DecreaseLife(player) {
		this.hud.changeLifeValue(player.hp);
		if (player.hp <= 0) {
			this.hud.quitInventory('botella');
			this.scene.start('restart', { me: this });
			this.soundManager.stopBGM("level2");

		}

	}


	restart() {
		this.hud.quitInventory('botella');
		this.soundManager.stopBGM("level2");
		this.scene.start('LEVEL_02');
	}
	
	
	// Pausa el DialogManager (llamado por el HUD)
	pauseDialog() {
		this.dialogManager.scene.pause();
	}
	resumeDialog() {
		this.dialogManager.scene.resume();
	}

}
