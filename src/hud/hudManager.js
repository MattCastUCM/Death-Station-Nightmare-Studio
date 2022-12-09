import healthBar from './healthBar.js';

export default class HUD extends Phaser.Scene {
    /**
     * Escena del HUD
     * @extends Phaser.Scene
     */
    constructor() {
        super({ key: 'hud' });
    }
    // Guarda el nivel actual
    init(level) { 
        this.level = level.me;
    }

	// Creación de los elementos de la escena
    create() {
        // Coge el dialogManager del nivel
        this.dialogManager = this.level.dialogManager; 
        this.soundManager = this.scene.get('soundManager');

        // Barra de vida
        this.add.image(220, 18, 'heartImg').setOrigin(0, 0);
        this.healthBar = new healthBar(this, 30, 20, 180, 20, 10);
        
        // Número del nivel
        this.levelImg = this.add.image(800, 18, 'level1').setOrigin(0, 0);

        this.initPauseSystem();
        this.initInventory();

        // Si está o no en diálogo
        this.onDialog = false; 


    }


    // Sisema de pausa
    initPauseSystem() {
        // Tecla p
        this.pauseInput = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        // Al pulsar la p, activa o desactiva el icono de play según se vea o no 
        this.pauseInput.on('down', pointer => { 
            this.pauseGame();
            //if (!this.playButton.visible) this.playButton.visible = true;
            //else this.playButton.visible = false;
        });

        // Botón de pausa 
        this.pauseButton = this.add.image(900, 13, 'pausa').setOrigin(0, 0);
        
        // Botón de play que aparece tras pausar la escena
        //this.playButton = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'play').setScale(0.3);
        //this.playButton.visible = false;
        // this.playButton.setInteractive(); // Hacemos el sprite interactivo para que lance eventos
        // this.playButton.on('pointerup', pointer => { this.pauseGame(); this.playButton.visible = false; });


        // Botón de restart
        this.restartButton = this.add.image(this.scale.width / 2, this.scale.height / 2, 'restartButton')
        this.restartButton.setScale(0.8);
        this.restartButton.setInteractive();    // Hacemos el sprite interactivo para que lance eventos

        // Al poner el cursor encima del botón, cambia de color
        this.restartButton.on('pointerover', () => {
            this.restartButton.setTint(0xff0000);
            this.soundManager.play("click");

        });
        // Al quitar el cursor de encima del botón, vuelve a su color original
        this.restartButton.on('pointerout', () => {
            this.restartButton.clearTint();
        });
        // Al pulsar el botón, se reinicia la escena
        this.restartButton.on('pointerup', pointer => {
            this.soundManager.pause(false);
            //this.playButton.visible = false;
            this.restartButton.visible=false;
            this.level.restart(); 
        });

        
        // Botón de pause
        this.onPauseMenu = false;
        // Botón restart
        this.restartButton.visible = false;

        
    }


    // Sistema de inventario
    initInventory() {
        let offset = 55;        // Espacio entre la primera celda respecto a la x de la imagen
        let gap = 4;            // Espacio entre las celdas del inventario
        this.inventoryImg = this.add.image(350, 470, 'inventory').setOrigin(0, 0);

        // Imágenes de las armas
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


    // El HUD le pasa a la barra de vida un nuevo valor
    changeLifeValue(newValue) {
        this.healthBar.changeValue(newValue);
    }

    
    // Cambia el número del nivel
    changeLevel(number, scene) {
        this.levelImg.setTexture("level" + number);
        this.level = scene;
        this.healthBar.changeValue(100);
        this.changeObject("navaja")
    }

    
    // Indica a qué arma se ha cambiado (llamado por el player)
    changeObject(weapon) {
        this.selectedFrame.x = this[weapon].x;
        this.selectedFrame.y = this[weapon].y;
    }


    // Indica que se ha recogido un arma nueva (llamado por el player)
    addInventory(weapon) {
        this[weapon].visible = true;
    }
    quitInventory(weapon) {
        if (this[weapon].visible)
            this[weapon].visible = false;
    }


    // Menú de pausa 
    pauseGame() {
        // Al salir del menú, reanuda el juego
        if (this.onPauseMenu) {
            this.restartButton.visible = false;
            this.dialogManager.scene.resume();
            this.onPauseMenu = false;
            if (!this.onDialog) this.level.scene.resume(); //si no estaba en diálogo
            this.soundManager.pause(false);
        }
        // Si no, lp pausa
        else {
            this.restartButton.visible = true;
            this.level.player.stop();
            this.dialogManager.scene.pause();
            this.onPauseMenu = true;
            if (!this.onDialog) this.level.scene.pause(); //si ya no estaba pausado por el diálogo
            this.soundManager.pause(true);
        }
    }


    // Pausa el juego al iniciar un diálogo
    onDialogStarted() {
        this.onDialog = true;
        this.level.player.stop();
        this.level.scene.pause();
    }

    // Reanuda el juego tras acabar el diálogo
    onDialogFinished() {
        this.onDialog = false;
        this.level.scene.resume();
    }



}




