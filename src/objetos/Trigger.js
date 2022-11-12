// Trigger atravesable
export default class Trigger extends Phaser.GameObjects.Zone {
    // Constructora que recibe la escena en la que se va a crear,
    // sus coordenadas, y sus dimensiones
    constructor(scene, x, y, w, h) {
        super(scene, x, y, w, h);
        scene.physics.world.enable(this);
        this.body.setImmovable(true);
    }
}