export default class light extends Phaser.GameObjects.Sprite{

    constructor(scene,radio){
        super(scene, 0, 0);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this); //lo añadimos a la física
        this.body.setCircle(radio);
        let offset = 15 - radio; //corrección de 15px para el offset
        this.body.offset = new Phaser.Math.Vector2(offset, offset);
    }

   
  
 }