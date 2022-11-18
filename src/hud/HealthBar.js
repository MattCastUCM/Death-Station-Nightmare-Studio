export default class HealthBar {

    constructor(scene, x, y, w, h, borderWidth) {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        this.h = h; //altura
        this.w = w; //anchura
        this.actualValue = 100;
        this.oldValue;
        this.maxValue=100;

        //animación
        this.timeLapse=0;
        this.timeLimit=10;

        this.color = 0Xc13030;
        this.draw();
        this.borderWidth = borderWidth;
        scene.add.existing(this.bar);
    }
    draw() {
        this.bar.clear();

        //  Border
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x - 3.5, this.y - 3.5, this.w + 7, this.h + 7);

        //  BG

        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x, this.y, this.w, this.h);

        // Life color
        this.bar.fillStyle(this.color);

        
        let lifeArea = Math.floor( this.actualValue * this.w / this.maxValue);
        this.bar.fillRect(this.x, this.y,lifeArea, this.h);
    }

    changeValue(newValue) {
        this.oldValue=this.actualValue; //guardar el valor anterior
        this.actualValue = newValue;
        if (this.actualValue < 0) { //por si sale fuera del rango
            this.actualValue = 0;
        }
        this.draw(); //actualiza en la pantalla
    }
}