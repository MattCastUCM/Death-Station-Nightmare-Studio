// Clase para los objetos de juego
export default class gameObject extends Phaser.GameObjects.Sprite {
    // Constructora que recibe la escena en la que se va a crear,
    // sus coordenadas, su escala, su textura, y su velocidad
    constructor(scene, posX, posY, w, h, texture, spd) {

        super(scene, posX, posY, texture);
        this.speed = spd;

        // Añade el objeto a la esceba
        this.scene.add.existing(this);

        // Añade físicas al personaje y hace que colisione con los bordes del mundo
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds();

        // Cambiamos el tamaño del body
        this.body.setSize(w, h);
    }
}