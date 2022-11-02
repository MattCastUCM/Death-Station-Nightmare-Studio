import TextMessage from "./TextMessage.js";

//recibir el array de textos y controlar TextMessage, y el DialogBox
export default class DialogManager extends Phaser.GameObjects.Container {

    constructor(scene) {
        //inicializaciones
        super(scene, 0, 0);
        this.text = [];
        this.scene = scene;
        this.dialogBox = new Phaser.GameObjects.Sprite(this.scene, this.scene.sys.game.canvas.width / 2, this.scene.sys.game.canvas.height / 2 + 200, 'dialogBox')
        this.dialogBox.setScale(1.5,0.7);

        this.scene.add.existing(this.dialogBox);

        //eventos

        //this.scene.events.on('dialogBoxClicked', this.changeNode, this);

        // this.on('destroy', () => {
        //     this.scene.events.off('dialogBoxClicked');
        // })
    }
    Init(text) {
        this.text = text;

        this.paraCount = 0;

        this.textMessage = new TextMessage(this.scene, this, 100, this.scene.sys.game.canvas.height -110,this.scene.sys.game.canvas.width-200,this.text[this.paraCount]);      
        
    }

    NextParagraph() {
        this.paraCount++;

        if (this.paraCount < this.text.length) {
            console.log(this.textMessage);
            this.textMessage.setNewMessage(this.text[this.paraCount]);
           
            return true;
        }
        else {
            this.paraCount = 0;
            this.textMessage.destroy();
            return false;
        }

    }
}



