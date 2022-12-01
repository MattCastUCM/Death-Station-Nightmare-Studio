// Clase para los objetos de juego
export default class dec extends Phaser.GameObjects.Sprite {
    /**
     * Constructora
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
     */
    constructor(scene, x, y) {

        super(scene, x, y);
       
        // Añade el objeto a la esceba
       

        // Añade físicas al personaje y hace que colisione con los bordes del mundo
        //this.scene.physics.add.existing(this);

    
    };


};