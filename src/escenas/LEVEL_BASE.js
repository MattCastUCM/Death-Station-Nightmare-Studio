import Player from '../objetos/player.js';
import Cat from '../objetos/Cat.js';
import EnemyManager from '../objetos/EnemyManager.js';
import CardBoard from '../objetos/CartBoard.js'
import WoodBox from '../objetos/WoodBox.js'
import Trigger from '../objetos/Trigger.js'
import gameObject from '../objetos/gameObject.js';
/**
 * Escena principal.
 * @extends Phaser.Scene
 */

export default class LEVEL_BASE extends Phaser.Scene {
    /**
     * Constructora
     * @param {string} level - nivel actual
     * @param {string} nextlevel - siguiente nivel
     * @param {string} tilemap - mapa
     */
     constructor(level,nextlevel){
        super({ key: 'LEVEL_BASE' });
         //TILE MAP
         this.map = this.make.tilemap({ key: tilemap});
         this.tiles = map.addTilesetImage("mapa","tiles");
         this.fondolayer = map.createLayer('fondo', tiles, 0, 0);
         this.colisionlayer=map.createLayer('colision',tiles,0,0);
         //poner colision a layer
         this.colisionlayer.setCollisionBetween(0,560);
         //DIALOGMANAGER
         this.scene.launch('dialogManager');
         this.dialogManager = this.scene.get('dialogManager');
 
         //HUD (y Pausa)
         this.scene.launch('hud', { me: this });
         this.hud = this.scene.get('hud');
 
         // Grupos
         this.enemies = this.physics.add.group();
         this.cartBoardBoxes = this.physics.add.group();
         this.woodBoxes = this.physics.add.group();
         this.cats=this.physics.add.group();

         // Jugador
         this.player = new Player(this, 100, this.cameras.main.centerY, 15, 15, 8, 30, 140);
         this.player.body.onCollide = true; // Activamos onCollide para poder detectar la colisión del player
         this.player.setScale(2.5);

          //colisión con tile map
        this.physics.add.collider(this.player,this.colisionlayer);
		this.physics.add.collider(this.cartBoardBoxes,this.colisionlayer);
		this.physics.add.collider(this.cartBoardBoxes, this.colisionlayer);
		this.physics.add.collider(this.cats,this.colisionlayer);
		this.physics.add.collider(this.enemies,this.colisionlayer);

		//colisión player-cajas,cajas-cajas
		this.physics.add.collider(this.woodBoxes, this.cartBoardBoxes);
		this.physics.add.collider(this.cartBoardBoxes, this.cartBoardBoxes);
		this.physics.add.collider(this.player, this.cartBoardBoxes);
		this.physics.add.collider(this.player, this.woodBoxes);
		//enemigos caja
		this.physics.add.collider(this.enemies, this.cartBoardBoxes);
		this.physics.add.collider(this.enemies, this.woodBoxes);
        // gato caja
        this.physics.add.collider(this.cats, this.cartBoardBoxes);
		this.physics.add.collider(this.cats, this.woodBoxes);

		//this.physics.add.collider(this.enemies, this.enemies);
		this.physics.add.collider(this.player, this.cats);

		//Colisión enemigo
		this.physics.add.overlap(this.player, this.enemies, ()=>this.player.decreaseHP(), null);
		
		//camara que sigue a jugador (movimiento suave)
		this.cameras.main.startFollow(this.player, this.cameras.FOLLOW_LOCKON, 0.1, 0.1);
		//espacio de camara (si jugador sale de este espacio,la camara le sigue)
		this.cameras.main.setDeadzone (0,this.cameras.main.centerY*2);
     }

	update(t, dt) {

	}
}
