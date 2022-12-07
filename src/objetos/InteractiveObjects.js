import gameObject from "./gameObject.js";
import Trigger from '../objetos/Trigger.js';

export default class InteractiveObjects extends gameObject {
    constructor(scene, x, y, w, h, offsetX, offsetY, texture, spd, text, target) {
        super(scene, x, y, w, h, offsetX, offsetY, texture, spd);
        this.target = target;
        this.text = text;
        this.scene = scene;
        let trigger1 = new Trigger(scene, x, y, w, h); 
        this.triggerBounds = trigger1.getBounds();
        this.exclamation = this.scene.add.image(this.body.x - this.displayWidth/2,this.body.y - this.displayHeight*2,'exclamation').setScale(0.2).setOrigin(0,0); 
        this.exclamation.visible = false;
        this.input = this.scene.input.keyboard.addKeys({f:Phaser.Input.Keyboard.KeyCodes.F});
    };
    
    preUpdate(){
        this.playerBounds = this.target.getBounds();
        if(Phaser.Geom.Intersects.RectangleToRectangle(this.playerBounds, this.triggerBounds)){
            this.exclamation.visible = true;
            if(this.input.f.isDown){
                this.scene.newText(this.text);
            }
        }
        else{
            this.exclamation.visible = false;
        }
    }
}