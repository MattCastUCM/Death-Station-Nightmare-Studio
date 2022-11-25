/**
* Escena inicial en la que se cargan todos
* los assets necesarios para ejecutar el juego
* @extends Phaser.Scene
*/
export default class Boot extends Phaser.Scene {
	constructor() {
		super({ key: 'boot' });
	}

	preload() {
		// Barra de cargando página (borde)
		let progressBar = this.add.graphics();
		let progressBox = this.add.graphics();
		progressBox.fillStyle(0x222222, 0.8);
		progressBox.fillRect(340, 230, 320, 50);

		// Barra de cargando página
		this.load.on('progress', function (value) {
		  percentText.setText(parseInt(value * 100) + '%');
		  progressBar.clear();
		  progressBar.fillStyle(0xffffff, 1);
		  progressBar.fillRect(350, 240, 300 * value, 30);
		});


		// Menú inicial
		this.load.image('start', 'assets/Mapa/start.png');
		this.load.image('fondo', 'assets/Mapa/menu_bg.png');
		this.load.image('sangre', 'assets/Mapa/blood.png');

		// Menú de reinicio
		this.load.image('restartButton', 'assets/Mapa/restart.png');
		this.load.image('fondoRestart', 'assets/Mapa/restartFondo.png');

		// Planos del metro
		this.load.image('map', 'assets/Mapa/metro_map.png');
		this.load.image('map1', 'assets/Mapa/metro_map_1.png');
		this.load.image('map2', 'assets/Mapa/metro_map_2.png');
		this.load.image('map3', 'assets/Mapa/metro_map_3.png');
		this.load.image('map4', 'assets/Mapa/metro_map_4.png');
		this.load.image('map5', 'assets/Mapa/metro_map_5.png');
		

		// Tilemap
		this.load.image("tiles","assets/Mapa/mapa2.png");
		this.load.tilemapTiledJSON('level1',"assets/tilemaps/LEVEL_01.json");
		this.load.image("tilesLevel2","assets/Mapa/Nivel Claudia.png")
		this.load.tilemapTiledJSON('level2',"assets/tilemaps/LEVEL_02.json");
		
		
		// HUD
		this.load.image('heartImg', 'assets/HUD/corazon.png');
		this.load.image('inventory', 'assets/HUD/inventario.png');
		this.load.image('pausa', 'assets/HUD/pausa.png');
		this.load.image('level', 'assets/HUD/level.png');
		this.load.image('play', 'assets/HUD/play.png');
		this.load.image('selected', 'assets/HUD/seleccionado.png');

		// Diálogo
		this.load.script('WebFont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
		this.load.image('dialogBox', 'assets/HUD/textBox.png');

		// Jugador
		this.load.spritesheet('personaje', 'assets/player.png', { frameWidth: 32, frameHeight: 48 });
	
		// Enemigos
		this.load.spritesheet('cat', 'assets/enemies/cat.png', { frameWidth: 34, frameHeight: 34 });
		this.load.spritesheet('persecutor', 'assets/enemies/persecutr.png', { frameWidth: 64, frameHeight: 64 });
		this.load.spritesheet('lanzador', 'assets/enemies/shooter.png', { frameWidth: 48, frameHeight: 48 });
		this.load.spritesheet('topo', 'assets/enemies/mole.png', { frameWidth: 36, frameHeight: 32 });
		// Roca
		this.load.image('roca', 'assets/enemies/rock.png');
		
		// Obstáculos
		this.load.spritesheet('woodBox', 'assets/objects/cajaMadera.png', { frameWidth: 64, frameHeight: 64 })
		this.load.spritesheet('cartBoard', 'assets/objects/cajaCarton.png', { frameWidth: 64, frameHeight: 64 });

		// Iluminación
		this.load.image('mask', 'assets/enviroment/mask1.png');

		// Armas
		this.load.spritesheet('navaja', 'assets/Armas/Cuchillo.png', { frameWidth: 210, frameHeight: 480 });
		this.load.spritesheet('botella', 'assets/Armas/Botella.png', { frameWidth: 140, frameHeight: 380 });
		this.load.spritesheet('barra', 'assets/Armas/Barra.png', { frameWidth: 32, frameHeight: 48 });
		this.load.spritesheet('hacha', 'assets/Armas/Hacha.png', { frameWidth: 100, frameHeight: 220 });
		

		// Destruye la barra de cargando página
		this.load.on('complete', function () {
		  progressBar.destroy();
		  progressBox.destroy();
		  loadingText.destroy();
		  percentText.destroy();
		});
	
		// Textos
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


	/*
	* Creación de la escena. En este caso, solo cambiamos a la escena del menú
	*/
	create() {
		this.scene.start('menu');
	}
}