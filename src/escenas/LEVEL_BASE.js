import Player from '../objetos/player.js';
// import Cat from '../objetos/Cat.js';
// import EnemyManager from '../objetos/EnemyManager.js';
// import CardBoard from '../objetos/CartBoard.js'
// import WoodBox from '../objetos/WoodBox.js'
// import Trigger from '../objetos/Trigger.js'
// import gameObject from '../objetos/gameObject.js';
/**
 * Escena principal.
 * @extends Phaser.Scene
 */

export default class LEVEL_BASE extends Phaser.Scene {
    /**
     * Constructora
     * @param {string} level -  nivel
     * @param {string} nextlevel - siguiente nivel
     * @param {string} tilemap - mapa
     * @param {string} tilename
     * @param {int} tileColision -hasta que numero
     */
     constructor(level,nextlevel,tilemap,tilename,tileColision){
        super({ key: level });
         //TILE MAP
         //this.level=level;
         this.nextlevel=nextlevel;
         this.mapname=tilemap;
         this.tilename=tilename;
         this.numColision=tileColision;
     }

     create(){
      this.cameras.main.fadeIn(500,0,0,0);
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
      

      
     
     //camara que sigue a jugador (movimiento suave)
     this.cameras.main.startFollow(this.player, this.cameras.FOLLOW_LOCKON, 0.1, 0.1);
     //espacio de camara (si jugador sale de este espacio,la camara le sigue)
     //this.cameras.main.setDeadzone (0,this.cameras.main.centerY*2);
     this.CreateMap();
     this.AddColision();
  }

  Next(){
     this.scene.start(this.nextlevel);
  }

  AddColision(){
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

   }
   CreateMap(){
      this.map = this.make.tilemap({ key: this.mapname});
      this.tiles = this.map.addTilesetImage("mapa",this.tilename);
      this.fondolayer = this.map.createLayer('fondo', this.tiles, 0, 0);
      this.colisionlayer=this.map.createLayer('colision',this.tiles,0,0);
      //poner colision a layer
      this.colisionlayer.setCollisionBetween(0,this.numColision);
   }


 update(t, dt) {

 }

  transition(){
      
  }

}
