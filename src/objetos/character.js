// Clase para los personajes (jugador, enemigos y gato
 export default class Wall extends Phaser.GameObjects.Sprite {
	// Constructora que recibe la escena en la que se va a crear,
	// sus coordenadas, su escala, su textura, y su velocidad
    constructor(scene, posX, posY, scale, texture, spd) {
      super(scene, posX, posY, texture);
	  this.speed = spd;
	  
	  
      this.scene.add.existing(this);
	  
	  // Añade físicas y un collider a la pared
      this.scene.physics.add.existing(this, true);
      this.scene.physics.add.collider(this);
  
      // Cambiamos el tamaño del body
      this.body.width = w;
      this.body.height = h;
    }
  }