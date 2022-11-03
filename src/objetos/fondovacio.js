
export default class fondo extends Phaser.GameObjects.Sprite{
    constructor(scene,vacio,width,height){
        super(scene,0,0,"fondovacio");
        this.f=vacio;
        
        this.mask=new Phaser.Display.Masks.BitmapMask(scene.personaje,scene.personaje.light)
    }
//     createRenderTexture(){

//         let width = this.canvas.width;
//         let height = this.canvas.height;

//         let renderTexture = this.make.renderTexture({
//         width,
//         height
//         }, true);

//         //lo creamos un nivel encima del resto de objetos
//         renderTexture.setDepth(4);

//         //dibujamos el mapa vacío en el redertexture
//         renderTexture.draw(this.backgroundLayer);
//         renderTexture.draw(this.groundLayer);

//         //cambiamos el tinte a uno mas oscuro
//         renderTexture.setTint(0x5050b0);

//         //máscara
//         renderTexture.mask = new Phaser.Display.Masks.BitmapMask(this, this.player.spotlight);
//         renderTexture.mask.invertAlpha = true;
//   }
}