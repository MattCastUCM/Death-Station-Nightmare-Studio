export default class HealthBar {
    /**
     * Barra de vida
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
     * @param {number} w - ancho
     * @param {number} h - alto
     * @param {number} borderWidth - grosor del borde
     */
    constructor(scene, x, y, w, h, borderWidth) {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;

        this.currentValue = 100;
        this.oldValue;
        this.maxValue=100;

        // Animación
        this.timeLapse=0;
        this.timeLimit=10;

        this.color = 0Xc13030;
        this.draw();
        this.borderWidth = borderWidth;
        scene.add.existing(this.bar);
    }


    // Dibuja la barra de vida
    draw() {
        this.bar.clear();

        // Borde
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x - 3.5, this.y - 3.5, this.w + 7, this.h + 7);

        // Fondo
        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x, this.y, this.w, this.h);

        // Color del relleno
        this.bar.fillStyle(this.color);

        let lifeArea = Math.floor( this.currentValue * this.w / this.maxValue);
        this.bar.fillRect(this.x, this.y,lifeArea, this.h);
    }


    // Cambia el valor de la barra
    changeValue(newValue) {
        // Guardar el valor anterior
        this.oldValue = this.currentValue;
        this.currentValue = newValue;
        
        // Si el valor sale del rango, pone a 0 a la fuerza
        if (this.currentValue < 0) { 
            this.currentValue = 0;
        }

        // Vuelve a dibujar la barra con el nuevo valor
        this.draw(); 
    }
}