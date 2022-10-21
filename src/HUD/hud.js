import healthBar from './HealthBar.js';

export default class HUD {
    constructor(scene, x, y) {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        createHealthBar(scene);
    }
    createHealthBar() {
        let healthBar = new HealthBar(scene, x, y);
    }


}




