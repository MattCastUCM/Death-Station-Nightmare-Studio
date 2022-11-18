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
        this.level = level.me;
    }

    create() {
        this.dialogManager = this.level.dialogManager; //coge el dialog manager del nivel
        
        //barra de vidas
        this.add.image(220, 18, 'heartImg').setOrigin(0, 0);
        this.healthBar = new HealthBar(this, 30, 20, 180, 20, 10);
        //nivel
        this.add.image(800, 18, 'level').setOrigin(0, 0);

        let offset = 55; //el espacio al primer celda respecto del x del inventario
        let gap = 4; //espacio entre celdas del inventario


        //INVENTARIO
        this.inventoryImg = this.add.image(350, 470, 'inventory').setOrigin(0, 0);
        //imagen de armas
        this.navaja = this.add.sprite(this.inventoryImg.x + offset - 6  , this.inventoryImg.y + (this.inventoryImg.height / 2), 'navaja').setOrigin(0.5, 0.6).setScale(0.12);
        this.navaja.rotation -= 1;

        this.hacha = this.add.sprite(this.inventoryImg.x + (offset + gap * 2) * 2-2 , this.inventoryImg.y + (this.inventoryImg.height / 2), 'hacha').setOrigin(0.5, 0.5).setScale(0.2);
        this.hacha.rotation -= 1;
        this.hacha.visible = true;
      
        this.botella = this.add.sprite(this.inventoryImg.x + (offset + gap) * 3 + 25, this.inventoryImg.y + (this.inventoryImg.height / 2), 'botella').setOrigin(0.5, 0.6).setScale(0.15);
        this.botella.rotation += 0.8;
        this.botella.visible = true;
        
        this.barra = this.add.sprite(this.inventoryImg.x + (offset + gap) * 4+ 42, this.inventoryImg.y + (this.inventoryImg.height / 2), 'barra').setOrigin(0.5, 0.5).setScale(0.2);
        this.barra.rotation += 0.8;
        this.barra.visible = true;


        this.selectedFrame = this.add.image(this.navaja.x, this.navaja.y, 'selected').setOrigin(0.5, 0.5).setScale(1);


        
        //PAUSA 
        this.pauseButton = this.add.image(900, 13, 'pausa').setOrigin(0, 0);
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

    //llamado por player para indicarle a que arma se ha cambiado
    changeObject(weapon) {
        console.log(weapon);
        this.selectedFrame.x = this[weapon].x;
        this.selectedFrame.y = this[weapon].y;
    }
    //llamado por player para informar de la nueva arma que tienne
    addInventory(weapon) {
        this[weapon].visible = true;
    }
    //menú pausa 
    pauseGame() {
        if (this.onPauseMenu) //se quiere resume
        {
            console.log(this.level.dialogManager);
            this.dialogManager.scene.resume();
            this.onPauseMenu = false;
            if (!this.onDialog) this.level.scene.resume(); //si no estaba en diálogo
        }

        else { //pausa
            this.level.player.stop();
            this.dialogManager.scene.pause();
            this.onPauseMenu = true;
            if (!this.onDialog) this.level.scene.pause(); //si ya no estaba pausado por el diálogo
        }
    }

    //pausa o resume por el diálogo
    onDialogStarted() {
        console.log(this.level.player);
        this.onDialog = true;
        this.level.player.stop();
        this.level.scene.pause();
    }

    onDialogFinished() {
        this.onDialog = false;
        this.level.scene.resume();
    }



}




