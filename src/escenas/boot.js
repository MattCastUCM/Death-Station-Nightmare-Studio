/**
 * E
 * @extends Phaser.Scene
 */
export default class Boot extends Phaser.Scene {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'boot' });
	}

	preload() {
		let progressBar = this.add.graphics();
		let progressBox = this.add.graphics();
		progressBox.fillStyle(0x222222, 0.8);
		progressBox.fillRect(340, 230, 320, 50);

		this.load.on('progress', function (value) {
			percentText.setText(parseInt(value * 100) + '%');
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect(350, 240, 300 * value, 30);
		});


	

		 //tile map
		 this.load.image("tiles","assets/Mapa/mapa2.png");
		 this.load.tilemapTiledJSON('level1',"mapas/LEVEL_01.json");
		 this.load.image("tilesLevel2","assets/Nivel 2/estacion1.3.png")
		 this.load.tilemapTiledJSON('level2',"mapas/LEVEL_02.json");
		 this.load.image("tileslevel3","assets/Nivel 3/mapa3.png")
		 this.load.tilemapTiledJSON('level3',"mapas/LEVEL_03.json")
		//HUD
		


		this.load.image('heartImg', 'assets/HUD/corazon.png');
		this.load.image('inventory', 'assets/HUD/inventario.png');
		this.load.image('pausa', 'assets/HUD/pausa.png');
		this.load.image('level1', 'assets/HUD/1.png');
		this.load.image('level2', 'assets/HUD/2.png');
		this.load.image('level3', 'assets/HUD/3.png');
		this.load.image('level4', 'assets/HUD/4.png');
		this.load.image('play', 'assets/HUD/play.png');
		this.load.image('selected', 'assets/HUD/seleccionado.png');




		//dialog........................................................................................
		this.load.script('WebFont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
		this.load.image('dialogBox', 'assets/HUD/textBox.png');

		//player........................................................................................
		this.load.spritesheet('personaje', 'assets/personajes/Estudiante_1.png', { frameWidth: 32, frameHeight: 48 });

		//enemies........................................................................................
		this.load.spritesheet('cat', 'assets/enemies/cat.png', { frameWidth: 34, frameHeight: 34 });
		this.load.spritesheet('persecutor', 'assets/enemies/persecutr.png', { frameWidth: 64, frameHeight: 64 });
		this.load.spritesheet('lanzador', 'assets/enemies/shooter.png', { frameWidth: 48, frameHeight: 48 });
		this.load.spritesheet('topo', 'assets/enemies/mole.png', { frameWidth: 36, frameHeight: 32 });

		//bullet........................................................................................
		this.load.image('roca', 'assets/enemies/rock.png');

		//objetos........................................................................................
		this.load.spritesheet('woodBox', 'assets/objects/cajaMadera.png', { frameWidth: 64, frameHeight: 64 })
		this.load.spritesheet('cartBoard', 'assets/objects/cajaCarton.png', { frameWidth: 64, frameHeight: 64 });

		//ilumination........................................................................................
		this.load.image('mask', 'assets/enviroment/mask1.png');

		//weapons........................................................................................
		this.load.spritesheet('navaja', 'assets/Armas/Cuchillo.png', { frameWidth: 210, frameHeight: 480 });
		this.load.spritesheet('botella', 'assets/Armas/Botella.png', { frameWidth: 140, frameHeight: 380 });
		this.load.spritesheet('barra', 'assets/Armas/Barra.png', { frameWidth: 32, frameHeight: 48 });
		this.load.spritesheet('hacha', 'assets/Armas/Hacha.png', { frameWidth: 100, frameHeight: 220 });

		//AUDIO........................................................................................
		//bg
		this.load.audio('menu', 'assets/audio/bgMusic/estacion.mp3');
		this.load.audio('level3', 'assets/audio/bgMusic/level3.wav');
		this.load.audio('level2', 'assets/audio/bgMusic/level2.wav');
		this.load.audio('level1', 'assets/audio/bgMusic/level1.wav');
		this.load.audio('level4', 'assets/audio/bgMusic/level4.wav');
		this.load.audio('restart', 'assets/audio/bgMusic/dead.wav');
	
		//enemies
		this.load.audio('cat1', 'assets/audio/soundEffects/enemy/Cat1.wav');
		this.load.audio('cat2', 'assets/audio/soundEffects/enemy/Cat2.wav');
		this.load.audio('lanzadorHurt', 'assets/audio/soundEffects/enemy/lanzador_hurt.mp3');
		this.load.audio('lanzadorThrow', 'assets/audio/soundEffects/enemy/lanzador_throw.wav');
		this.load.audio('persecutorGrowl1', 'assets/audio/soundEffects/enemy/persecutor_growl.wav');
		this.load.audio('persecutorGrowl2', 'assets/audio/soundEffects/enemy/persecutor_growl2.wav');
		this.load.audio('persecutorGrowl3', 'assets/audio/soundEffects/enemy/persecutor_growl3.wav');
		this.load.audio('persecutorHurt', 'assets/audio/soundEffects/enemy/persecutor_hurt.mp3');
		this.load.audio('topoHurt', 'assets/audio/soundEffects/enemy/topo_hurt.mp3');
		
		//objects
		this.load.audio('bulletDestroy', 'assets/audio/soundEffects/enemy/bullet_destroy.wav');
		this.load.audio('cartBoard', 'assets/audio/soundEffects/objects/cartBox_Move.wav');
		this.load.audio('woodBoxExplosion', 'assets/audio/soundEffects/objects/woodBox_Explosion.wav');
		//player
		this.load.audio('playerHurt', 'assets/audio/soundEffects/player/hurt.wav');
		this.load.audio('pickWeapon', 'assets/audio/soundEffects/player/pickWeapon.mp3');
		this.load.audio('selectWeapon', 'assets/audio/soundEffects/player/selectWeapon.wav');
		this.load.audio('walk', 'assets/audio/soundEffects/player/walk.mp3');
		
		//weapon
		this.load.audio('barra', 'assets/audio/soundEffects/weapon/barra.wav');
		this.load.audio('botella', 'assets/audio/soundEffects/weapon/botella.wav');
		this.load.audio('hacha', 'assets/audio/soundEffects/weapon/hacha.mp3');
		this.load.audio('navaja', 'assets/audio/soundEffects/weapon/navaja.wav');
		
		//menu
		this.load.audio('click', 'assets/audio/soundEffects/menu/click.mp3');
		//........................................................................................

		this.load.on('complete', function () {
			progressBar.destroy();
			progressBox.destroy();
			loadingText.destroy();
			percentText.destroy();
		});

		let width = this.cameras.main.width;
		let height = this.cameras.main.height;
		let loadingText = this.make.text({
			x: width / 2,
			y: height / 2 - 50,
			text: 'Loading...',
			style: {
				font: '20px monospace',
				fill: '#ffffff'
			}
		});
		loadingText.setOrigin(0.5, 0.5);

		let percentText = this.make.text({
			x: width / 2,
			y: height / 2 - 5,
			text: '0%',
			style: {
				font: '18px monospace',
				fill: '#ffffff'
			}
		});
		percentText.setOrigin(0.5, 0);
	}

	/**
	 * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
	 * nivel del juego
	 */
	create() {
		this.scene.start('soundManager');
	}

}