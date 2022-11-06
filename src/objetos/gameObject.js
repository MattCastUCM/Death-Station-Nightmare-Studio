// Clase para los objetos de juego
export default class gameObject extends Phaser.GameObjects.Sprite {
    /**
     * Constructora que recibe la escena en la que se va a crear, sus coordenadas, su escala, su textura, y su velocidad
     * @param {Phaser.Scene} scene - La escena en la que debe instanciarse
     * @param {number} posX - Su coordenada en el eje X
     * @param {number} posY - Su coordenada en el eje Y
     * @param {number} w - Su ancho
     * @param {number} h - Su alto
     * @param {number} offsetX - Su offset en el eje X
     * @param {number} offsetY - Su offset en el eje Y
     * @param {string} texture - La "key" de la textura
     * @param {number} spd - La velocidad a la que se mueve (se puede cambiar después con la propiedad "speed")
     */
    constructor(scene, posX, posY, w, h, offsetX, offsetY, texture, spd) {

        super(scene, posX, posY, texture);
        this.speed = spd;
        this._movAngle = 0;

        // Añade el objeto a la escena
        this.scene.add.existing(this);

        // Añade físicas al personaje
        this.scene.physics.add.existing(this);

        // Cambia el tamaño del body (center = false para que no lo centre)
        this.body.setSize(w, h, false);
        this.body.setOffset(offsetX, offsetY);
    };


    /**
     * Función que mueve el sprite según su dirección
     * @param {number} velX - El movimiento deseado en el eje X
     * @param {number} velY - El movimiento deseado en el eje Y
     */
    move(velX, velY) {
        this.body.setVelocityX(velX);
        this.body.setVelocityY(velY);

        // Normaliza el movimiento y lo escala a la velocidad del objeto
        this.body.velocity.normalize().scale(this.speed);
    };
};