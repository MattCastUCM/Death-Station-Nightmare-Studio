import TextMessage from "./textMessage.js";

export default class DialogManager extends Phaser.Scene {    
    /**
     * Escena en la que se muestran los cuadros de textos.
     * Recibe el array de textos y controla el TextMessage y la DialogBox
     * @extends Phaser.Scene
     */
    constructor() {
        super({ key: 'dialogManager' });
    }

    // Crea la caja de texto, la tecla de enter, y carga las fuentes
    create() {

        this.dialogBox = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2 + 180, 'dialogBox').setOrigin(0.5, 0.5);
        this.dialogBox.setScale(1.4, 0.8);
        this.dialogBox.visible = false;
        this.dialogBox.setInteractive();
        
        // Al pulsar el enter, se pasa al siguiente mensaje
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.enterKey.on('down', pointer => {
            if (this.dialogBox.visible) this.NextMessage();
        });

        ''
        WebFont.load({
            google: {
                families: ['VT323', 'Roboto', 'Freckle Face']
            },
            loading: function () {
                console.log("Fonts are being loaded");
            },
            active: function () {
                console.log("Fonts have been rendered")
            }
        });
    }

    // Inicia el diálogo
    initDialog(text) {
        // Si no está en un diálogo, lo inicia
        if(!this.onDialog) {
            // Reproduce un sonido
            this.soundManager = this.scene.get('soundManager');
            this.soundManager.play("dialogPop");
            
            this.text = text;       //array de strings
            this.mesCount = 0;      //contador para contar los mensajes ya imprimidos

            // Contenedor del texto al que se le pasa el primer mensaje
            this.textMessage = new TextMessage(this, 145, this.sys.game.canvas.height - 130, this.sys.game.canvas.width - 250, this.text[this.mesCount]);

            // Aparece el cuadro de texto y se pausa el juego
            this.dialogBox.visible = true; 
            this.hud = this.scene.get('hud');
            this.hud.onDialogStarted();
        }
    }


    // Pasa el siguiente mensaje al contenedor
    NextMessage() {
        this.mesCount++;
        this.soundManager.play("dialogJump");

        // Si sigue habiendo mensajes, sigue escribiéndolos
        if (this.mesCount < this.text.length) {
            this.textMessage.setNewMessage(this.text[this.mesCount]);
        }
        // Si no, desactiva el cuadro de texto y reanuda el juego
        else {
            this.mesCount = 0;
            this.dialogBox.visible = false; //hacer invisible el cuadro de texto
            this.hud.onDialogFinished();
            this.textMessage.onMessageFinished();
            this.onDialog=false;
            return false;
        }

    }


}