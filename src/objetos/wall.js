// Clase para las paredes (y algunos elementos del escenario).
// es de tipo Sprite pero no tiene una imagen asociada.
// Tendrá un collider para que no se puedan atravesar.
export default class Wall extends Phaser.GameObjects.Sprite {
    // Constructora que recibe la escena en la que se va a crear,
    // sus coordenadas, y sus dimensiones
    constructor(scene, posX, posY, w, h) {

        super(scene, posX, posY);

        // Añade el objeto a la esceba
        this.scene.add.existing(this);

        // Añade físicas y un collider a la pared (1 = body estático)
        this.scene.physics.add.existing(this, 1);
        this.scene.physics.add.collider(this);

        // Cambiamos el tamaño del body
        this.body.width = w;
        this.body.height = h;
    }
}