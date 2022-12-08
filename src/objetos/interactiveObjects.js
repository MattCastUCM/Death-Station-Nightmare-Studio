import gameObject from "./gameObject.js";
import Trigger from './trigger.js';

export default class InteractiveObjects extends gameObject {
    /**
     * Objetos con los que se puede interactuar
     * @extends gameObject
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
     * @param {number} w - ancho
     * @param {number} h - alto
     */
    constructor(scene, x, y, w, h, texture, text, target) {
        super(scene, x, y, w, h, 0, 0, texture, 0);

        this.exclamation = this.scene.add.image(this.body.x - this.displayWidth/2,this.body.y - this.displayHeight * 2,'exclamation').setScale(0.2).setOrigin(0,0); 
        this.exclamation.depth = 10000;
        this.exclamation.visible = false;

        // Si no tiene textura, lo hace invisible
        if(texture === '') this.visible = false;
        
        this.target = target;
        this.text = text;
        this.scene = scene;

        // Trigger centrado con el collider de la textura
        let trigger1 = new Trigger(scene, x + w / 2 - 16, y + h/2 - 16, w, h);  
        this.triggerBounds = trigger1.getBounds();

        // Tecla f
        this.input = this.scene.input.keyboard.addKeys({f:Phaser.Input.Keyboard.KeyCodes.F});
    };
    

    preUpdate(){
        this.playerBounds = this.target.getBounds();
        
        // Si el jugador está en el trigger, aparece la exclamación, y si pulsa f, muestra el texto
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.playerBounds, this.triggerBounds)) {
            this.exclamation.visible = true;
            if(this.input.f.isDown){
                this.scene.newText(this.text);
            }
        }
        // Si no, oculta la exclamación
        else {
            this.exclamation.visible = false;
        }
    }
}