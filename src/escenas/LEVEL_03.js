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
 * Nivel 3
 * @extends LEVEL_BASE
 */
export default class LEVEL_03 extends LEVEL_BASE {
	constructor() {
		let nextlevel="level4Map";
		super("LEVEL_03",nextlevel,'level3','tileslevel3',560);
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
        this.hud.changeLevel(3,this);

		this.soundManager.playBGM("level3");

		//CAMARA
		this.cameras.main.setDeadzone (0,this.cameras.main.centerY*2);

		//Gato
		let gato = new Cat(this, 200, 400, 30, 30, 4, 4, 140);

		 //Cajas
		let cardBoardArray=this.map.createFromObjects('objetos',[
			{gid:561, classType: CardBoard,key: 'cartBoard'}]);
		this.cartBoardBoxes.addMultiple(cardBoardArray);
		cardBoardArray.forEach(obj => {
			obj.body.setImmovable();
		});

		let woodBoxesArray=this.map.createFromObjects('objetos',[
			{gid:562, classType: WoodBox,key: 'woodBox'}]);
		this.woodBoxes.addMultiple(woodBoxesArray);
		woodBoxesArray.forEach(obj => {
			obj.body.setImmovable();
		});

		//Enemigos
		let EmenyPersecutorArray=this.map.createFromObjects('objetos',[
		 	{gid:563, classType: Persecutor,key:'persecutor'}]);
		EmenyPersecutorArray.forEach(element => {
			element.setScale(2);
		});
		this.enemies.addMultiple(EmenyPersecutorArray);
		let EmenyLanzadorArray=this.map.createFromObjects('objetos',[
		 	{gid:564, classType: Lanzador,key:'lanzador'}]);
		EmenyLanzadorArray.forEach(element => {
				element.setScale(2);
			});
		this.enemies.addMultiple(EmenyLanzadorArray);
		EmenyLanzadorArray.forEach(obj => {
			obj.body.setImmovable();
		});

        let EmenyTopoArray=this.map.createFromObjects('objetos',[
            {gid:565, classType: Topo,key:'topo'}]);
            EmenyTopoArray.forEach(element => {
               element.setScale(12);
           });
		console.log(EmenyTopoArray[0]);
       this.enemies.addMultiple(EmenyTopoArray);

	   //let ptopo=new Topo(scene,300,100);

        // Iluminación
		// const width = this.fondolayer.width
		// const height = this.fondolayer.height
		// const rt = this.make.renderTexture({
		// 	width,
		// 	height
		// }, true)


		//rt.setDepth(1000);
		// poner fondo a negro
		//rt.fill(0x000000, 1)
		// dibuja la escena vacia 
		//rt.draw(this.fondolayer)
		//poner un toque de azul a mapa 
		//rt.setTint(0x5050b0)
		//0x0a2948
		//0x5050b0	// vision.scale =4;
		//vision.startFollow(this.personaje);
		// rt.mask = new Phaser.Display.Masks.BitmapMask(this, this.player.vision);
		// rt.mask.invertAlpha = true;


		
		// scene.physics.world.on('collide', function(gameObject1, gameObject2, body1, body2) {
			
		// 	if(gameObject1 === scene.player && scene.cartBoardBoxes.contains(gameObject2)){
		// 		gameObject2.body.setImmovable(false);			
		// 	}
		// 	if( scene.enemies.contains(gameObject1)&& scene.cartBoardBoxes.contains(gameObject2)){
		// 		console.log("algooo");
		// 		gameObject2.setImmovable(true);
		// 	}

			
		// });	

		//DIALOG
		//EJEMPLO1:al interactuar con un objeto
		// this.physics.world.on('collide', function (gameObject1, gameObject2, body1, body2) {
		// 	if (gameObject1 === gato && gameObject2 === woodBox1) {
		// 		woodBox1.destroyMe();
		// 		scene.newText(["No puede sbiiiiiiiiiiiiiiiiiiiiiiiiiibsaiwfibfjinhfnrnjsnksnfkjnfks< iibvywbrviwyriuwunksnfkjnfks", "Porqué es así"]); //array de strings

		// 	}
		// });

		//EJEMPLO 2: con Trigger
		// let trigger1 = new Trigger(this, 300, 200, 30, 600);
		// this.physics.add.overlap(this.player, trigger1, function () { scene.newText(["Dónde estoy", "Soy idiota"]); trigger1.destroy(); }); //array de strings

		
		// //obtener una nueva arma
		// let nuevaBotella = this.botella = new gameObject(this,7200, 400,200,200,100,0, 'botella',0).setScale(0.2);
		// this.physics.add.overlap(this.player, nuevaBotella,()=>{this.player.HasNewWeapon('botella');nuevaBotella.destroy();});

		
	}

	/*Mandarle a dialogManager el texto que tiene que printear*/
	newText(text) {
		this.dialogManager.Init(text);
	}



	/*Informa al player y al hud*/
	DecreaseLife(player) {
		this.hud.changeLifeValue(player.GetHP());
		if(player.GetHP()<=0){
			this.scene.start('restart', { me: this }); 
			this.soundManager.stopBGM("level3");
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
