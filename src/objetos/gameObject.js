// Clase para los objetos de juego
export default class gameObject extends Phaser.GameObjects.Sprite {
    // Constructora que recibe la escena en la que se va a crear,
    // sus coordenadas, su escala, su textura, y su velocidad
    constructor(scene, posX, posY, w, h, offsetX, offsetY, texture, spd) {

        super(scene, posX, posY, texture);
        this.speed = spd;

        // Añade el objeto a la esceba
        this.scene.add.existing(this);

        // Añade físicas al personaje y hace que colisione con los bordes del mundo
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds();

        // Cambia el tamaño del body (center = false para que no lo centre)
        this.body.setSize(w, h, false);
        this.body.setOffset(offsetX, offsetY);
    };


    // Función que mueve el sprite según su dirección
    move(velX, velY) {
        this.body.setVelocityX(velX);
        this.body.setVelocityY(velY);

        // Normaliza el movimiento y lo escala a la velocidad del objeto
        this.body.velocity.normalize().scale(this.speed);
    };
};