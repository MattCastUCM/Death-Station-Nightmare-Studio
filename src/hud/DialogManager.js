import TextMessage from "./TextMessage.js";

//recibir el array de textos y controlar TextMessage, y el DialogBox
export default class DialogManager extends Phaser.Scene{

    constructor() {
        super({ key: 'dialogManager' });
    }

    preload() {
        this.load.script('WebFont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        this.load.image('dialogBox', 'assets/HUD/textBox.png');
    }
    create() {
       
        this.dialogBox = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2+180, 'dialogBox').setOrigin(0.5, 0.5);
        this.dialogBox.setScale(1.4, 0.8);
        this.dialogBox.visible = false;
        this.dialogBox.setInteractive(); 
        this.dialogBox.on('pointerup', pointer => { //al clickear sobre el cuadro de texto, salta al siguiente mensaje
			this.NextMessage();
	    });


        WebFont.load({
            google: {
                families: ['VT323','Roboto','Freckle Face'] 
            },
            loading: function() {
                console.log("Fonts are being loaded");
            },
            active: function() {
                console.log("Fonts have been rendered")
            }
        });
    }

    Init(text) {
        this.text = text; //array de strings

        this.mesCount = 0; //contador para contar los mensajes ya imprimidos

        //contenedor donde va a estar el texto, le pasa el primer texto
        this.textMessage = new TextMessage( this, 145, this.sys.game.canvas.height - 130, this.sys.game.canvas.width - 250, this.text[this.mesCount]);
       
        this.dialogBox.visible = true; //el cuadro de texto aparece
       
        this.hud = this.scene.get('hudAux');

        this.hud.onDialogStarted();

    }

    /*Pasa el siguiente mensaje al contenedor, llamando a su método setNewMessage*/ 
    NextMessage() { 
        this.mesCount++; 

        if (this.mesCount < this.text.length) {
            this.textMessage.setNewMessage(this.text[this.mesCount]);
        }
        else {
            this.mesCount = 0;
            this.dialogBox.visible = false; //hacer invisible el cuadro de texto
            this.hud.onDialogFinished();
            this.textMessage.onMessageFinished();
            return false;
        }

    }


}