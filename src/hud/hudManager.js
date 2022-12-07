import healthBar from './healthBar.js';
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
        this.soundManager = this.scene.get('soundManager');
        //barra de vidas
        this.add.image(220, 18, 'heartImg').setOrigin(0, 0);
        this.healthBar = new healthBar(this, 30, 20, 180, 20, 10);
        //nivel
        this.levelImg = this.add.image(800, 18, 'level1').setOrigin(0, 0);

        this.initPauseSystem();
        this.initInventory();


        this.onDialog = false; //si está en diálogo
    }

    initPauseSystem() {
       
        this.pauseInput = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.pauseInput.on('down', pointer => { //al clickear sobre el cuadro de texto, salta al siguiente mensaje
            this.pauseGame();
            if (this.playButton.visible == false) this.playButton.visible = true;
            else this.playButton.visible = false;
        });
        //PAUSA 
        this.pauseButton = this.add.image(900, 13, 'pausa').setOrigin(0, 0);
        //Botón de play que aparece tras pausar la escen
        this.playButton = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'play').setScale(0.3);
        //this.playButton.setInteractive(); // Hacemos el sprite interactivo para que lance eventos
        this.playButton.visible = false;
        //this.playButton.on('pointerup', pointer => { this.pauseGame(); this.playButton.visible = false; });

        //RESET
        this.restartButton = this.add.image(this.scale.width / 2, this.scale.height / 2 - 150, 'restartButton')
        this.restartButton.setScale(0.7);
        this.restartButton.setInteractive(); // Hacemos el sprite interactivo para que lance eventos

        // Al poner el cursor encima del botón, cambia de color
        this.restartButton.on('pointerover', () => {
            this.restartButton.setTint(0xff0000);
            this.soundManager.play("click");

        });

        // Al quitar el cursor de encima del botón, vuelve a su color original
        this.restartButton.on('pointerout', () => {
            this.restartButton.clearTint();
        });

        // Al pulsar el botón
        this.restartButton.on('pointerup', pointer => {
            this.soundManager.pause(false);
            this.playButton.visible = false;
            this.restartButton.visible=false;
            this.level.restart(); //Cambiamos a la escena de juego
        });


        //botón de pause
        this.onPauseMenu = false;
        //botón restart
        this.restartButton.visible = false;
    }

    initInventory() {
        let offset = 55; //el espacio al primer celda respecto del x del inventario
        let gap = 4; //espacio entre celdas del inventario
        this.inventoryImg = this.add.image(350, 470, 'inventory').setOrigin(0, 0);
        //imagen de armas
        this.navaja = this.add.image(this.inventoryImg.x + offset - 6, this.inventoryImg.y + (this.inventoryImg.height / 2), 'navaja').setOrigin(0.5, 0.6).setScale(0.12);
        this.navaja.rotation -= 1;

        this.hacha = this.add.image(this.inventoryImg.x + (offset + gap * 2) * 2 - 2, this.inventoryImg.y + (this.inventoryImg.height / 2), 'hacha').setOrigin(0.5, 0.5).setScale(0.2);
        this.hacha.rotation -= 1;
        this.hacha.visible = false;

        this.botella = this.add.image(this.inventoryImg.x + (offset + gap) * 3 + 25, this.inventoryImg.y + (this.inventoryImg.height / 2), 'botella').setOrigin(0.5, 0.6).setScale(0.15);
        this.botella.rotation += 0.8;
        this.botella.visible = false;

        this.barra = this.add.image(this.inventoryImg.x + (offset + gap) * 4 + 42, this.inventoryImg.y + (this.inventoryImg.height / 2), 'barra').setOrigin(0.5, 0.5).setScale(0.2);
        this.barra.rotation += 0.8;
        this.barra.visible = false;


        this.selectedFrame = this.add.image(this.navaja.x, this.navaja.y, 'selected').setOrigin(0.5, 0.5).setScale(1);
    }

    //hud le pasa a la barra de vida un nuevo valor
    changeLifeValue(newValue) {
        this.healthBar.changeValue(newValue);
    }

    /*cambiar de img*/
    changeLevel(number, scene) {
        this.levelImg.setTexture("level" + number);
        this.level = scene;
        this.healthBar.changeValue(100);
        this.changeObject("navaja")
    }
    //llamado por player para indicarle a que arma se ha cambiado
    changeObject(weapon) {
        //console.log(weapon);
        this.selectedFrame.x = this[weapon].x;
        this.selectedFrame.y = this[weapon].y;
    }
    //llamado por player para informar de la nueva arma que tienne
    addInventory(weapon) {
        this[weapon].visible = true;
    }
    quitInventory(weapon) {
        if (this[weapon].visible)
            this[weapon].visible = false;
    }
    //menú pausa 
    pauseGame() {
        if (this.onPauseMenu) //se quiere resume
        {
            this.restartButton.visible = false;
            this.dialogManager.scene.resume();
            this.onPauseMenu = false;
            if (!this.onDialog) this.level.scene.resume(); //si no estaba en diálogo
            this.soundManager.pause(false);
        }

        else { //pausa
            this.restartButton.visible = true;
            this.level.player.stop();
            this.dialogManager.scene.pause();
            this.onPauseMenu = true;
            if (!this.onDialog) this.level.scene.pause(); //si ya no estaba pausado por el diálogo
            this.soundManager.pause(true);
        }
    }

    //pausa o resume por el diálogo
    onDialogStarted() {

        this.onDialog = true;
        this.level.player.stop();
        this.level.scene.pause();
    }

    onDialogFinished() {
        this.onDialog = false;
        this.level.scene.resume();
    }



}




