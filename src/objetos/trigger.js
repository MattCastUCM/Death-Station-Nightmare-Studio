export default class Trigger extends Phaser.GameObjects.Zone {
   	/**
     * Trigger
     * @extends Phaser.GameObjects.Zone
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y	 
     * @param {number} w - ancho
	 * @param {number} h - alto
	 */
    constructor(scene, x, y, w, h) {
        super(scene, x, y, w, h);
        scene.physics.world.enable(this);
        this.body.setImmovable(true);
    }
}