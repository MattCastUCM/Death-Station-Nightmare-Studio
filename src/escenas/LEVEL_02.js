import Cat from '../objetos/Cat.js';
import CardBoard from '../objetos/CartBoard.js';
import WoodBox from '../objetos/WoodBox.js';
import Persecutor from '../objetos/Persecutor.js';
import Lanzador from '../objetos/Lanzador.js';
import Trigger from '../objetos/Trigger.js';
import gameObject from '../objetos/gameObject.js';
import LEVEL_BASE from './LEVEL_BASE.js';
import InteractiveObjects from '../objetos/InteractiveObjects.js';

/**
 * Nivel 2
 * @extends LEVEL_BASE
 */
export default class LEVEL_02 extends LEVEL_BASE {
	constructor() {
		let nextlevel = "level3Map";
		super("LEVEL_02", nextlevel, 'level2', 'tilesLevel2', 1394, false);
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
		this.hud.changeLevel(2, this);
		this.soundManager.playBGM("level2");
		this.player.weaponManager.nextLevel(false, false, true);

		this.player.setPosition(159, 371);

		// Cajas de cartón
		let cardBoardArray = this.map.createFromObjects('objetos', [{ gid: 1395, classType: CardBoard, key: 'cartBoard' }]);
		this.cartBoardBoxes.addMultiple(cardBoardArray);
		cardBoardArray.forEach(obj => {
			obj.body.setImmovable();
		});

		// Cajas de madera
		let woodBoxesArray = this.map.createFromObjects('objetos', [{ gid: 1396, classType: WoodBox, key: 'woodBox' }]);
		this.woodBoxes.addMultiple(woodBoxesArray);
		woodBoxesArray.forEach(obj => {
			obj.body.setImmovable();
		});

		// Persecutores
		let EmenyPersecutorArray = this.map.createFromObjects('objetos', [{ gid: 1397, classType: Persecutor, key: 'persecutor' }]);
		EmenyPersecutorArray.forEach(obj => {
			obj.setScale(2);
		});
		this.enemies.addMultiple(EmenyPersecutorArray);

		// Lanzadores
		let EmenyLanzadorArray = this.map.createFromObjects('objetos', [{ gid: 1398, classType: Lanzador, key: 'lanzador' }]);

		this.enemies.addMultiple(EmenyLanzadorArray);
		EmenyLanzadorArray.forEach(obj => {
			obj.setScale(2.5);
			obj.body.setImmovable();
		});

		// Decoración
		let Basuras = this.map.createFromObjects('dec', [{ gid: 5, key: 'Basura' }]);
		this.objects.addMultiple(Basuras);
		Basuras.forEach(obj => { obj.body.setImmovable(); });

		let cabezas = this.map.createFromObjects('dec', [{ gid: 18, key: 'cabeza' }]);
		this.objects.addMultiple(cabezas);
		cabezas.forEach(obj => { obj.body.setImmovable(); });

		let carritos = this.map.createFromObjects('dec', [{ gid: 7, key: 'carrito' }]);
		this.objects.addMultiple(carritos);
		carritos.forEach(obj => { obj.body.setImmovable(); });

		let carteles = this.map.createFromObjects('dec', [{ gid: 17, key: 'cartel2' }]);
		this.objects.addMultiple(carteles);
		carteles.forEach(obj => { obj.body.setImmovable(); });

		let doscarteles = this.map.createFromObjects('dec', [{ gid: 16, key: 'dos carteles' }]);
		this.objects.addMultiple(doscarteles);
		doscarteles.forEach(obj => { obj.body.setImmovable(); });

		let latas = this.map.createFromObjects('dec', [{ gid: 8, key: 'Latas' }]);
		this.objects.addMultiple(latas);
		latas.forEach(obj => { obj.body.setImmovable(); });

		let maletas = this.map.createFromObjects('dec', [{ gid: 9, key: 'Maletas' }]);
		this.objects.addMultiple(maletas);
		maletas.forEach(obj => { obj.body.setImmovable(); });

		let panel = this.map.createFromObjects('dec', [{ gid: 10, key: 'Panel' }]);
		this.objects.addMultiple(panel);
		panel.forEach(obj => { obj.body.setImmovable(); });

		let papeles = this.map.createFromObjects('dec', [{ gid: 11, key: 'Papeles' }]);
		this.objects.addMultiple(papeles);
		papeles.forEach(obj => { obj.body.setImmovable(); });

		let ratas = this.map.createFromObjects('dec', [{ gid: 12, key: 'rata' }]);
		this.objects.addMultiple(ratas);
		ratas.forEach(obj => { obj.body.setImmovable(); });

		let señorsincabeza = this.map.createFromObjects('dec', [{ gid: 13, key: 'señor sin cabeza' }]);
		this.objects.addMultiple(señorsincabeza);
		señorsincabeza.forEach(obj => { obj.body.setImmovable(); });

		let Sillas = this.map.createFromObjects('dec', [{ gid: 14, key: 'Silla' }]);
		this.objects.addMultiple(Sillas);
		Sillas.forEach(obj => { obj.body.setImmovable(); });

		let sillon = this.map.createFromObjects('dec', [{ gid: 15, key: 'sillones' }]);
		this.objects.addMultiple(sillon);
		sillon.forEach(s => { s.body.setImmovable(); });


		let botella = this.map.createFromObjects('objetos', [{ name: 'botella', key: 'botella' }]);
		scene.physics.add.existing(botella[0]);
		scene.physics.add.overlap(this.player, botella[0], () => { this.player.HasNewWeapon('botella'); botella[0].destroy(); });
		
		//OBJ interactivos:

		//panel de estación
		new InteractiveObjects(this, 80, 450, 140, 140, 0, 0, '', 0, ["¿Desde cuándo había tantas estaciones?", "¿Estaré soñando?"], this.player);
		new InteractiveObjects(this, 1700, 660, 200, 140, 0, 0, '', 0, ["Haber en qué estación estamos...", "Creo que es isifihfeowfhooajdw"], this.player);

		//pizarra
		new InteractiveObjects(this, 2150, 643, 140, 140, 0, 0, '', 0, ["¿Quién habrá puesto esto?", "No seré yo..."], this.player);

		//papelera
		new InteractiveObjects(this, 50, 840, 80, 60, 0, 0, '', 0, ["A ver qué hay aquí...", "Uy, un examen que ha sacado un 0"], this.player);
		new InteractiveObjects(this, 50, 1600, 80, 100, 0, 0, '', 0, ["Uffffffff qué mal huele"], this.player);

		//cabeza
		new InteractiveObjects(this, 30, 1850, 80, 80, 0, 0, '', 0, ["Ay, que se le ha salido un ojo"], this.player);
		new InteractiveObjects(this, 2350, 750, 80, 80, 0, 0, '', 0, ["Me gusta su ojo"], this.player);
		new InteractiveObjects(this, 2400, 1850, 80, 80, 0, 0, '', 0, ["¿Qué es lo que le sale de su boca?", "Ohh, coca cola"], this.player);

		//rata
		new InteractiveObjects(this, 40, 940, 100, 50, 0, 0, '', 0, ["Miau,miau", "Ah no, si es una rata", "Yiuuu"], this.player);

		//bebé
		new InteractiveObjects(this, 2850, 400, 80, 80, 0, 0, '', 0, ["¿Porqué la cabeza de este bebé es cuadrada?", "Será el hijo de Steve"], this.player);

		//maleta
		new InteractiveObjects(this, 2750, 1100, 100, 100, 0, 0, '', 0, ["Malditas maletas que me tapan el camino"], this.player);
		new InteractiveObjects(this, 1300, 1200, 200, 200, 0, 0, '', 0, ["Porqué hay tantas maletaaaas", "Arrrghhhh"], this.player);

		//hombre sin cabeza
		new InteractiveObjects(this, 1900, 1250, 80, 80, 0, 0, '', 0, ["Pobre hombre", "Me suena haber visto su cabeza..."], this.player);

		//lata
		new InteractiveObjects(this, 2600, 1140, 80, 80, 0, 0, '', 0, ["Dentro hay restos de aceitunas"], this.player);
		new InteractiveObjects(this, 1900, 1800, 200, 100, 0, 0, '', 0, ["Por aquí tampoco puedo pasar"], this.player);


		new InteractiveObjects(this, 1200, 300, 100, 100, 0, 0, 'ojo', 0, ["Ey,tú qué mirah"], this.player);

	}

	/*Mandarle a dialogManager el texto que tiene que printear*/
	newText(text) {
		this.dialogManager.Init(text);
	}

	restart() {
		this.hud.quitInventory('botella');
		this.soundManager.stopBGM("level2");
		this.scene.start('LEVEL_02');
	}

	/*Informa al player y al hud*/
	DecreaseLife(player) {
		this.hud.changeLifeValue(player.hp);
		if (player.hp <= 0) {
			this.hud.quitInventory('botella');
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
