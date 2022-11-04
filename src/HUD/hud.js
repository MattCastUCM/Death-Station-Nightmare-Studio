import HealthBar from './HealthBar.js';
/**
 * Escena de HUD.
 * @extends Phaser.Scene
 */
export default class HUD extends Phaser.Scene {
    constructor() {
        super({ key: 'hudAux' });
    }

    preload() {
        this.load.image('heartImg', 'assets/HUD/corazon.png');
        this.load.image('inventory', 'assets/HUD/inventario.png');
        this.load.image('pausa', 'assets/HUD/pausa.png');
        this.load.image('level', 'assets/HUD/level.png');

    }
    create() {
        this.add.image(220, 18, 'heartImg').setOrigin(0, 0);
        this.add.image(350, 470, 'inventory').setOrigin(0, 0);
        this.add.image(900, 13, 'pausa').setOrigin(0, 0);
        this.add.image(800, 18, 'level').setOrigin(0, 0);

        this.healthBar = new HealthBar(this, 30, 20, 180, 20, 10);
    }

    //hud le pasa a la barra de vida un nuevo valor
    changeLifeValue(newValue) {
        this.healthBar.changeValue(newValue);
    }
}




