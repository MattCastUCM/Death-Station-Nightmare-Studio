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
		this.load.image('start', 'assets/Mapa/start.png');
		this.load.image('fondo', 'assets/Mapa/menu_bg.png');
		this.load.image('sangre', 'assets/Mapa/blood.png');

		// Introducción................................................................
		this.load.image('introOutside', 'assets/intro/outside.png');
		this.load.image('introInside', 'assets/intro/inside.png');


		// Tilemap........................................................................................
		this.load.image("tiles","assets/Mapa/mapa2.png");
		this.load.tilemapTiledJSON('level1',"assets/tilemaps/LEVEL_01.json");
		this.load.image("tilesLevel2","assets/Nivel_assets_escalados/estacion1.3.png")
		this.load.tilemapTiledJSON('level2',"assets/tilemaps/LEVEL_02.json");
		this.load.image("tileslevel3","assets/Nivel 3/mapa3.png")
		this.load.tilemapTiledJSON('level3',"assets/tilemaps/LEVEL_03.json")
		this.load.image("tilesLevel4","assets/Nivel_assets_escalados/estacion2Final (2).png")
		this.load.tilemapTiledJSON('level4',"assets/tilemaps/LEVEL_04.json");


		// Decoración........................................................................................
		this.load.image("Basura","assets/Nivel_assets_escalados/Basura.png");
		this.load.image("cabeza","assets/Nivel_assets_escalados/cabeza.png");
		this.load.image("carrito","assets/Nivel_assets_escalados/carrito bebe.png");
		this.load.image("cartel2","assets/Nivel_assets_escalados/cartel2.png");
		this.load.image("dos carteles","assets/Nivel_assets_escalados/dos carteles.png");
		this.load.image("Latas","assets/Nivel_assets_escalados/Latas.png");
		this.load.image("Maletas","assets/Nivel_assets_escalados/Maletas.png");
		this.load.image("Panel"  ,"assets/Nivel_assets_escalados/Panel.png");
		this.load.image("Papeles","assets/Nivel_assets_escalados/Papeles.png");
		this.load.image("rata","assets/Nivel_assets_escalados/rata.png");
		this.load.image("señor sin cabeza","assets/Nivel_assets_escalados/señor sin cabeza.png");
		this.load.image("Silla","assets/Nivel_assets_escalados/Silla.png");
		this.load.image("sillones","assets/Nivel_assets_escalados/sillones.png");
		this.load.image("ojo","assets/Nivel 3/ojo.png");

		// Menú de reinicio........................................................................................
		this.load.image('restartButton', 'assets/Mapa/restart.png');
		this.load.image('fondoRestart', 'assets/Mapa/restartFondo.png');

		// Planos del metro........................................................................................
		this.load.image('map', 'assets/Mapa/metro_map.png');
		this.load.image('map1', 'assets/Mapa/metro_map_1.png');
		this.load.image('map2', 'assets/Mapa/metro_map_2.png');
		this.load.image('map3', 'assets/Mapa/metro_map_3.png');
		this.load.image('map4', 'assets/Mapa/metro_map_4.png')
		this.load.image('map5', 'assets/Mapa/metro_map_5.png');

		// HUD........................................................................................
		this.load.image('heartImg', 'assets/HUD/corazon.png');
		this.load.image('pausa', 'assets/HUD/pausa.png');
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
		this.load.image('navaja', 'assets/Armas/Cuchillo.png', { frameWidth: 210, frameHeight: 480 });
		this.load.image('botella', 'assets/Armas/Botella.png', { frameWidth: 140, frameHeight: 380 });
		this.load.image('barra', 'assets/Armas/Barra.png', { frameWidth: 32, frameHeight: 48 });
		this.load.image('hacha', 'assets/Armas/Hacha.png', { frameWidth: 100, frameHeight: 220 });
		

		// Audio........................................................................................
		//Cinemática
		this.load.audio('accident', 'assets/audio/soundEffects/cinematic/accident.mp3');
		this.load.audio('ambient', 'assets/audio/soundEffects/cinematic/ambient.mp3');
		this.load.audio('trainHorn', 'assets/audio/soundEffects/cinematic/train_horn.mp3');

		
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
		this.scene.start('soundManager');
	}
}