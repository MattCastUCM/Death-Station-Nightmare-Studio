// Clase para los objetos de juego
export default class gameObject extends Phaser.GameObjects.Sprite {
    /**
     * Constructora
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
     * @param {number} w - ancho
     * @param {number} h - alto
     * @param {number} offsetX - distancia entre la x del sprite y la x de su collider
     * @param {number} offsetY - distancia entre la y del sprite y la y de su collider
     * @param {number} offsetY - distancia entre la y del sprite y la y de su collider
     * @param {number} spd - velocidad
     */
    constructor(scene, x, y, w, h, offsetX, offsetY, texture, spd) {

        super(scene, x, y, texture);
        this.speed = spd;
        this.fr = 7;
        this.velX = 0;
        this.velY = 0;
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
        this.velX = velX;
        this.velY = velY;

        this.moving();
    };

    moving() { //Función que mueve el sprite según su dirección
        this.body.setVelocityX(this.velX);
        this.body.setVelocityY(this.velY);

        // Normaliza el movimiento y lo escala a la velocidad del objeto
        this.body.velocity.normalize().scale(this.speed);

    }

    // fuerza de rozamiento 
    friction() {
       
        // Rozamiento horizontal
        if (this.body.velocity.x > 5) {
            this.body.velocity.x -= this.fr;
        }
        else if (this.body.velocity.x < -5) {
            this.body.velocity.x += this.fr;
        }
        else if (this.body.velocity.x <= 5 && this.body.velocity.x > 0 || this.body.velocity.x >= -5 && this.body.velocity.x < 0) {
            this.body.velocity.x = 0;
        }

        // Rozamiento vertical
        if (this.body.velocity.y > 5) {
            this.body.velocity.y -= 5;
        }
        else if (this.body.velocity.y < -5) {
            this.body.velocity.y += this.fr;
        }
        else if (this.body.velocity.y <= 5 && this.body.velocity.y > 0 || this.body.velocity.y >= -5 && this.body.velocity.y < 0) {
            this.body.velocity.y = 0;
        }
    }

    setFriction(fr){
        this.fr=fr;
    }
};