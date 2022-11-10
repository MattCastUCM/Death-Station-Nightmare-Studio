// Clase para los objetos de juego
export default class gameObject extends Phaser.GameObjects.Sprite {
    // Constructora que recibe la escena en la que se va a crear,
    // sus coordenadas, su escala, su textura, y su velocidad
    constructor(scene, posX, posY, w, h, offsetX, offsetY, texture, spd) {

        super(scene, posX, posY, texture);
        this.speed = spd;

        this.velX=0;
        this.velY=0;
        // Añade el objeto a la esceba
        this.scene.add.existing(this);

        // Añade físicas al personaje y hace que colisione con los bordes del mundo
        this.scene.physics.add.existing(this);

        // Cambia el tamaño del body (center = false para que no lo centre)
        this.body.setSize(w, h, false);
        this.body.setOffset(offsetX, offsetY);
    };


    // mueve según una dir dada
    move(velX, velY) {
        this.velX=velX;
        this.velY=velY;

        this.moving();
    };

    moving(){ //Función que mueve el sprite según su dirección
        this.body.setVelocityX(this.velX);
        this.body.setVelocityY(this.velY);

        // Normaliza el movimiento y lo escala a la velocidad del objeto
        this.body.velocity.normalize().scale(this.speed);

    }
};