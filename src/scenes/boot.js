export default class Boot extends Phaser.Scene {
	/**
	 * Escena inicial en la que se cargan todos
	 * los assets necesarios para ejecutar el juego
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'boot' });
	}

	preload() {
		// Barra de cargando página (borde)........................................................................................
		let progressBar = this.add.graphics();
		let progressBox = this.add.graphics();
		progressBox.fillStyle(0x222222, 0.8);
		progressBox.fillRect(340, 230, 320, 50);

		// Barra de cargando página........................................................................................
		this.load.on('progress', function (value) {
			percentText.setText(parseInt(value * 100) + '%');
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect(350, 240, 300 * value, 30);
		});

		// Textos de cargando página........................................................................................
		let width = this.cameras.main.width;
		let height = this.cameras.main.height;
		let loadingText = this.make.text({
			x: width / 2,
			y: height / 2 - 70,
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


		// Menú inicial........................................................................................
		this.load.image('start', 'assets/HUD/start.png');
		this.load.image('fondo', 'assets/menus/menu_bg.png');
		this.load.image('sangre', 'assets/HUD/blood.png');

		// Introducción................................................................
		this.load.image('introOutside', 'assets/intro/outside.png');
		this.load.image('introInside', 'assets/intro/inside.png');

		//Cinemática Final
		this.load.image('outro1', 'assets/outro/cinematic_final1.png');
		this.load.image('outro2', 'assets/outro/cinematic_final2.png');
		this.load.image('outro3', 'assets/outro/cinematic_final3.png');
		this.load.image('outro4', 'assets/outro/cinematic_final4.png');
		this.load.image('outro5', 'assets/outro/cinematic_final5.png');

		// Tilemap........................................................................................
		this.load.image("tiles","assets/level 1/mapa2.png");
		this.load.tilemapTiledJSON('level1',"assets/tilemaps/LEVEL_01.json");
		this.load.image("tilesLevel2","assets/level 2-4/estacion1.3.png")
		this.load.tilemapTiledJSON('level2',"assets/tilemaps/LEVEL_02.json");
		this.load.image("tileslevel3","assets/level 3/mapa3.png")
		this.load.tilemapTiledJSON('level3',"assets/tilemaps/LEVEL_03.json")
		this.load.image("tilesLevel4","assets/level 2-4/estacion2Final (2).png")
		this.load.tilemapTiledJSON('level4',"assets/tilemaps/LEVEL_04.json");


		// Decoración........................................................................................
		this.load.image("Basura","assets/level 2-4/Basura.png");
		this.load.image("cabeza","assets/level 2-4/cabeza.png");
		this.load.image("carrito","assets/level 2-4/carrito bebe.png");
		this.load.image("cartel2","assets/level 2-4/cartel2.png");
		this.load.image("dos carteles","assets/level 2-4/dos carteles.png");
		this.load.image("Latas","assets/level 2-4/Latas.png");
		this.load.image("Maletas","assets/level 2-4/Maletas.png");
		this.load.image("Panel"  ,"assets/level 2-4/Panel.png");
		this.load.image("Papeles","assets/level 2-4/Papeles.png");
		this.load.image("rata","assets/level 2-4/rata.png");
		this.load.image("señor sin cabeza","assets/level 2-4/señor sin cabeza.png");
		this.load.image("Silla","assets/level 2-4/Silla.png");
		this.load.image("sillones","assets/level 2-4/sillones.png");
		this.load.image("ojo","assets/level 3/ojo.png");
		this.load.image("escalera","assets/level 2-4/Escaleras.png")

		// Menú de reinicio........................................................................................
		this.load.image('restartButton', 'assets/HUD/restartButton.png');
		this.load.image('fondoRestart', 'assets/HUD/restartFondo.png');

		// Planos del metro........................................................................................
		this.load.image('map', 'assets/menus/metro_map.png');
		this.load.image('map1', 'assets/menus/metro_map_1.png');
		this.load.image('map2', 'assets/menus/metro_map_2.png');
		this.load.image('map3', 'assets/menus/metro_map_3.png');
		this.load.image('map4', 'assets/menus/metro_map_4.png')
		this.load.image('map5', 'assets/menus/metro_map_5.png');

		// HUD........................................................................................
		this.load.image('heartImg', 'assets/HUD/corazon.png');
		this.load.image('inventory', 'assets/HUD/inventario.png');
		this.load.image('level1', 'assets/HUD/1.png');
		this.load.image('level2', 'assets/HUD/2.png');
		this.load.image('level3', 'assets/HUD/3.png');
		this.load.image('level4', 'assets/HUD/4.png');
		this.load.image('play', 'assets/HUD/play.png');
		this.load.image('selected', 'assets/HUD/seleccionado.png');

		// Diálogo........................................................................................
		this.load.script('WebFont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
		this.load.image('dialogBox', 'assets/HUD/textBox.png');


		// Jugador........................................................................................
		this.load.spritesheet('personaje', 'assets/characters/player.png', { frameWidth: 32, frameHeight: 48 });
	

		// Enemigos........................................................................................
		this.load.spritesheet('cat', 'assets/enemies/cat.png', { frameWidth: 34, frameHeight: 34 });
		this.load.spritesheet('persecutor', 'assets/enemies/persecutor.png', { frameWidth: 64, frameHeight: 64 });
		this.load.spritesheet('lanzador', 'assets/enemies/shooter.png', { frameWidth: 48, frameHeight: 48 });
		this.load.spritesheet('topo', 'assets/enemies/mole.png', { frameWidth: 36, frameHeight: 32 });
		// Roca
		this.load.image('roca', 'assets/enemies/rock.png');
		

		// Obstáculos........................................................................................
		this.load.image('woodBox', 'assets/objects/cajaMadera.png', { frameWidth: 64, frameHeight: 64 })
		this.load.image('cartBoard', 'assets/objects/cajaCarton.png', { frameWidth: 64, frameHeight: 64 });


		// Iluminación........................................................................................
		this.load.image('mask', 'assets/HUD/mask1.png');

		
		// Armas........................................................................................
		this.load.image('navaja', 'assets/weapons/knife.png', { frameWidth: 210, frameHeight: 480 });
		this.load.image('botella', 'assets/weapons/bottle.png', { frameWidth: 140, frameHeight: 380 });
		this.load.image('barra', 'assets/weapons/bar.png', { frameWidth: 32, frameHeight: 48 });
		this.load.image('hacha', 'assets/weapons/axe.png', { frameWidth: 100, frameHeight: 220 });
		

		// Audio........................................................................................
		//Cinemática
		this.load.audio('accident', 'assets/audio/soundEffects/cinematic/accident.mp3');
		this.load.audio('ambient', 'assets/audio/soundEffects/cinematic/ambient.mp3');
		this.load.audio('trainHorn', 'assets/audio/soundEffects/cinematic/train_horn.mp3');
		this.load.audio('night', 'assets/audio/soundEffects/cinematic/night.mp3');
		this.load.audio('sudden', 'assets/audio/soundEffects/cinematic/sudden.mp3');
		this.load.audio('terror', 'assets/audio/soundEffects/cinematic/terror.mp3');
		
		// BGM
		this.load.audio('menu', 'assets/audio/bgMusic/estacion.mp3');
		this.load.audio('level1', 'assets/audio/bgMusic/level1.mp3');
		this.load.audio('level2', 'assets/audio/bgMusic/level2.mp3');
		this.load.audio('level3', 'assets/audio/bgMusic/level3.mp3');
		this.load.audio('level4', 'assets/audio/bgMusic/level4.mp3');
		this.load.audio('restart', 'assets/audio/bgMusic/dead.mp3');
	
		// Enemigos........................................................................................
		this.load.audio('cat1', 'assets/audio/soundEffects/enemy/Cat1.mp3');
		this.load.audio('cat2', 'assets/audio/soundEffects/enemy/Cat2.mp3');
		this.load.audio('lanzadorHurt', 'assets/audio/soundEffects/enemy/lanzador_hurt.mp3');
		this.load.audio('lanzadorThrow', 'assets/audio/soundEffects/enemy/lanzador_throw.mp3');
		this.load.audio('persecutorGrowl1', 'assets/audio/soundEffects/enemy/persecutor_growl.mp3');
		this.load.audio('persecutorGrowl2', 'assets/audio/soundEffects/enemy/persecutor_growl2.mp3');
		this.load.audio('persecutorGrowl3', 'assets/audio/soundEffects/enemy/persecutor_growl3.mp3');
		this.load.audio('persecutorHurt', 'assets/audio/soundEffects/enemy/persecutor_hurt.mp3');
		this.load.audio('topoHurt', 'assets/audio/soundEffects/enemy/topo_hurt.mp3');
		
		// Objetos........................................................................................
		this.load.audio('bulletDestroy', 'assets/audio/soundEffects/enemy/bullet_destroy.mp3');
		this.load.audio('cartBoard', 'assets/audio/soundEffects/objects/cartBox_Move.mp3');
		this.load.audio('woodBoxExplosion', 'assets/audio/soundEffects/objects/woodBox_Explosion.mp3');
		
		// Jugador........................................................................................ 
		this.load.audio('playerHurt', 'assets/audio/soundEffects/player/hurt.mp3');
		this.load.audio('pickWeapon', 'assets/audio/soundEffects/player/pickWeapon.mp3');
		this.load.audio('selectWeapon', 'assets/audio/soundEffects/player/selectWeapon.mp3');
		this.load.audio('walk', 'assets/audio/soundEffects/player/walk.mp3');
		
		// Armas........................................................................................
		this.load.audio('barra', 'assets/audio/soundEffects/weapon/barra.mp3');
		this.load.audio('botella', 'assets/audio/soundEffects/weapon/botella.mp3');
		this.load.audio('hacha', 'assets/audio/soundEffects/weapon/hacha.mp3');
		this.load.audio('navaja', 'assets/audio/soundEffects/weapon/navaja.mp3');
		
		// Menú........................................................................................
		this.load.audio('click', 'assets/audio/soundEffects/menu/click.mp3');
		this.load.audio('dialogJump', 'assets/audio/soundEffects/menu/dialogJump.mp3');
		this.load.audio('dialogPop', 'assets/audio/soundEffects/menu/dialogPop.mp3');
		
		// Objetos interactuables........................................................................................
		this.load.image('rataInmunda', 'assets/enemies/rock.png');
		this.load.image('hombreSinCabeza', 'assets/enemies/rock.png');
		this.load.image('exclamation', 'assets/enemies/interactiveObject.png');
		
	
		//........................................................................................

		// Destruye la barra de cargando página
		this.load.on('complete', function () {
			progressBar.destroy();
			progressBox.destroy();
			loadingText.destroy();
			percentText.destroy();
		});
	
		
	  }


	/*
	* Creación de la escena. En este caso, solo cambiamos a la escena del menú
	*/
	create() {
			//Crear animaciones................................................................
			//player
			this.anims.create({
				key: 'idle',
				frames: this.anims.generateFrameNumbers('personaje', { start: 1, end: 1 }),
				frameRate: 5,
				repeat: -1
			});
			this.anims.create({
				key: 'up',
				frames: this.anims.generateFrameNumbers('personaje', { start: 12, end: 15 }),
				frameRate: 5,
				repeat: -1
			});
			this.anims.create({
				key: 'down',
				frames: this.anims.generateFrameNumbers('personaje', { start: 0, end: 3 }),
				frameRate: 5,
				repeat: -1
			});
			this.anims.create({
				key: 'left',
				frames: this.anims.generateFrameNumbers('personaje', { start: 4, end: 7 }),
				frameRate: 5,
				repeat: -1
			});
			this.anims.create({
				key: 'right',
				frames: this.anims.generateFrameNumbers('personaje', { start: 8, end: 11 }),
				frameRate: 5,
				repeat: -1
			});

			//cat
			this.anims.create({
				key: 'cat_idle',
				frames: this.anims.generateFrameNumbers('cat', { start: 1, end: 1 }),
				frameRate: 5,
				repeat: -1
			});
			this.anims.create({
				key: 'cat_up',
				frames: this.anims.generateFrameNumbers('cat', { start: 9, end: 11 }),
				frameRate: 5,
				repeat: -1
			});
			this.anims.create({
				key: 'cat_down',
				frames: this.anims.generateFrameNumbers('cat', { start: 0, end: 2 }),
				frameRate: 5,
				repeat: -1
			});
			this.anims.create({
				key: 'cat_left',
				frames: this.anims.generateFrameNumbers('cat', { start: 3, end: 5 }),
				frameRate: 5,
				repeat: -1
			});
			this.anims.create({
				key: 'cat_right',
				frames: this.anims.generateFrameNumbers('cat', { start: 6, end: 8 }),
				frameRate: 5,
				repeat: -1
			});
	

			//persecutor
			this.anims.create({
				key: 'idlePersecutor',
				frames: this.anims.generateFrameNumbers('persecutor', { start: 18, end: 18 }),
				frameRate: 5,
				repeat: -1
			});
			this.anims.create({
				key: 'upPersecutor',
				frames: this.anims.generateFrameNumbers('persecutor', { start: 0, end: 8 }),
				frameRate: 5,
				repeat: -1
			});
			this.anims.create({
				key: 'downPersecutor',
				frames: this.anims.generateFrameNumbers('persecutor', { start: 18, end: 26 }),
				frameRate: 5,
				repeat: -1
			});
			this.anims.create({
				key: 'leftPersecutor',
				frames: this.anims.generateFrameNumbers('persecutor', { start: 9, end: 17 }),
				frameRate: 5,
				repeat: -1
			});
			this.anims.create({
				key: 'rightPersecutor',
				frames: this.anims.generateFrameNumbers('persecutor', { start: 27, end: 36 }),
				frameRate: 5,
				repeat: -1
			});

			//shooter
			this.anims.create({
				key: 'idleLanzador',
				frames: this.anims.generateFrameNumbers('lanzador', { start: 0, end: 5 }),
				frameRate: 5,
				repeat: -1
			});
			this.anims.create({
				key: 'upLanzador',
				frames: this.anims.generateFrameNumbers('lanzador', { start: 56, end: 64 }),
				frameRate: 5,
				repeat: 0
			});
			this.anims.create({
				key: 'downLanzador',
				frames: this.anims.generateFrameNumbers('lanzador', { start: 14, end: 21 }),
				frameRate: 5,
				repeat: 0
			});
			this.anims.create({
				key: 'leftLanzador',
				frames: this.anims.generateFrameNumbers('lanzador', { start: 28, end: 36 }),
				frameRate: 5,
				repeat: 0
			});
			this.anims.create({
				key: 'rightLanzador',
				frames: this.anims.generateFrameNumbers('lanzador', { start: 42, end: 50 }),
				frameRate: 5,
				repeat: 0
			});
			this.anims.create({
				key: 'shootUp',
				frames: this.anims.generateFrameNumbers('lanzador', { start: 65, end: 69 }),
				frameRate: 5,
				repeat: 0
			});
			this.anims.create({
				key: 'shootDown',
				frames: this.anims.generateFrameNumbers('lanzador', { start: 22, end: 27 }),
				frameRate: 5,
				repeat: 0
			});
			this.anims.create({
				key: 'shootLeft',
				frames: this.anims.generateFrameNumbers('lanzador', { start: 37, end: 41 }),
				frameRate: 5,
				repeat: 0
			});
			this.anims.create({
				key: 'shootRight',
				frames: this.anims.generateFrameNumbers('lanzador', { start: 51, end: 55 }),
				frameRate: 5,
				repeat: 0
			});

			//mole
			this.anims.create({
				key: 'idleTopo',
				frames: this.anims.generateFrameNumbers('topo', {start:6, end:10}),
				frameRate: 7,
				repeat: 2
			});
			this.anims.create({
				key: 'upTopo',
				frames: this.anims.generateFrameNumbers('topo', {start:1, end:5}),
				frameRate: 7,
				repeat: 0
			});
			this.anims.create({
				key: 'downTopo',
				frames: this.anims.generateFrameNumbers('topo', {start:5, end:0}),
				frameRate: 7,
				repeat: 0
			});
			this.anims.create({
				key: 'nothing',
				frames: this.anims.generateFrameNumbers('topo', {start:0, end:0}),
				frameRate: 7,
				repeat: -1
			});

		this.scene.start('soundManager');
	}
}