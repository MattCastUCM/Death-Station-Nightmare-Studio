import HealthBar from './healthBar.js';
/**
 * Escena de HUD.
 * @extends Phaser.Scene
 */
export default class HUD extends Phaser.Scene {
    constructor() {
        super({ key: 'hud' });
    }
    init(level) { //escena de nivel
        this.level = level.me.scene;
    }

    preload() {
        this.load.image('heartImg', 'assets/HUD/corazon.png');
        this.load.image('inventory', 'assets/HUD/inventario.png');
        this.load.image('pausa', 'assets/HUD/pausa.png');
        this.load.image('level', 'assets/HUD/level.png');
        this.load.image('play', 'assets/HUD/play.png');

    }
    create() {
        this.add.image(220, 18, 'heartImg').setOrigin(0, 0);
        this.add.image(350, 470, 'inventory').setOrigin(0, 0);
        this.pauseButton = this.add.image(900, 13, 'pausa').setOrigin(0, 0);
        this.add.image(800, 18, 'level').setOrigin(0, 0);

        this.healthBar = new HealthBar(this, 30, 20, 180, 20, 10);

        this.dialogManager = this.scene.get('dialogManager');

        //Botón de play que aparece tras pausar la escen
        this.playButton = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'play').setScale(0.3);
        this.playButton.setInteractive(); // Hacemos el sprite interactivo para que lance eventos
        this.playButton.visible = false;
        this.playButton.on('pointerup', pointer => { this.pauseGame(); this.playButton.visible = false; });

        //botón de pause
        this.onPauseMenu = false;
        this.pauseButton.setInteractive(); // Hacemos el sprite interactivo para que lance eventos

        this.pauseButton.on('pointerup', pointer => {
            this.pauseGame();
            if (this.playButton.visible == false) this.playButton.visible = true;
            else this.playButton.visible = false;

        });

        this.onDialog = false; //si está en diálogo
    }

    //hud le pasa a la barra de vida un nuevo valor
    changeLifeValue(newValue) {
        this.healthBar.changeValue(newValue);
    }

    //menú pausa 
    pauseGame() {
        if (this.onPauseMenu) //se quiere resume
        {
            this.dialogManager.scene.resume();
            this.onPauseMenu = false;
            if (!this.onDialog) this.level.resume(); //si no estaba en diálogo
        }

        else { //pausa
            this.dialogManager.scene.pause();
            this.onPauseMenu = true;
            if (!this.onDialog) this.level.pause(); //si ya no estaba pausado por el diálogo
        }
    }

    //pausa o resume por el diálogo
    onDialogStarted() {
        this.onDialog = true;
        this.level.pause();
    }

    onDialogFinished() {
        this.onDialog = false;
        this.level.resume();
    }



}




