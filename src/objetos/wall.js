// Clase para las paredes (y algunos elementos del escenario).
// es de tipo Sprite pero no tiene una imagen asociada.
// Tendrá un collider para que no se puedan atravesar.
export default class Wall extends Phaser.GameObjects.Sprite {
    // Constructora que recibe la escena en la que se va a crear,
    // sus coordenadas, y sus dimensiones
    constructor(scene, x, y, w, h) {
        super(scene, x, y);

        // Añade el objeto a la esceba
        this.scene.add.existing(this);

        // Añade físicas (true = body estático)
        this.scene.physics.add.existing(this, true);

        // Cambia el tamaño del body (center = false para que no lo centre)
        this.body.setSize(w,h,false);
    }
}