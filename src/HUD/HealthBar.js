export default class HealthBar {

    constructor(scene, x, y, w, h, borderWidth) {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        this.h = h; //altura
        this.w = w; //anchura
        this.value = 100;
        this.p = 100 / 100;
        this.color = 0Xc13030;
        this.draw();
        this.borderWidth = borderWidth;
        scene.add.existing(this.bar);
    }
    draw() {
        this.bar.clear();

        //  Border
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x - 3.5, this.y - 3.5,this.w + 7, this.h + 7);

        //  BG

        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x, this.y, this.w, this.h);

        // Life color
        this.bar.fillStyle(this.color);


        var d = Math.floor(this.p * this.value);
        this.bar.fillRect(this.x, this.y, d * this.w / 100, this.h);
    }

    decrease() {
        this.value -= 5;

        if (this.value < 0) {
            this.value = 0;
        }

        this.draw();

        return (this.value === 0);
    }

    
}