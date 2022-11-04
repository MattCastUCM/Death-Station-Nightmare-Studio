import gameObject from './gameobject.js';

// Clase para el gato que hereda de gameObject
export default class Cat extends gameObject {
    // Constructora que recibe los mismos parámetros que el padre
    // excepto por la textura, que es siempre la misma
    constructor(scene, posX, posY, w, h, offsetX, offsetY, spd) {
        super(scene, posX, posY, w, h, offsetX, offsetY, 'cat', spd);

        //Creamos las animaciones
        this.scene.anims.create({
            key: 'cat_idle',
            frames: scene.anims.generateFrameNumbers('cat', {start:1, end:1}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'cat_up',
            frames: scene.anims.generateFrameNumbers('cat', {start:9, end:11}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'cat_down',
            frames: scene.anims.generateFrameNumbers('cat', {start:0, end:2}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'cat_left',
            frames: scene.anims.generateFrameNumbers('cat', {start:3, end:5}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'cat_right',
            frames: scene.anims.generateFrameNumbers('cat', {start:6, end:8}),
            frameRate: 5,
            repeat: -1
        });


        // La animación a ejecutar según se genere será 'idle'
        this.play('cat_idle');

        // Input de teclado
        this.cursors = this.scene.input.keyboard.createCursorKeys();

        // Hace que body no pueda ser movido por otros colliders
        this.body.setImmovable(true);
    }


    // Bucle principal. Actualiza su posición y ejecuta las acciones según el input
    preUpdate(t, dt){
        // IMPORTANTE llamar al preUpdate del padre para poder ejecutar la animación
        super.preUpdate(t,dt);

        // No es posible moverse pulsando 2 teclas a la vez

        // Si se pulsa hacia la izquierda
        if(this.cursors.left.isDown && 
            !this.cursors.right.isDown &&
            !this.cursors.up.isDown &&
            !this.cursors.down.isDown) {
                // Comienza a  reproducir la animación
                this.anims.isPlaying = true;

                // La reproduce mientras se mueva
                if(this.anims.currentAnim.key !== 'cat_left'){
                    this.play('cat_left');
                }

                // Mueve el objeto
                this.move(-1,0);
        }

        // Si se pulsa hacia la derecha
        if(this.cursors.right.isDown && 
            !this.cursors.left.isDown &&
            !this.cursors.up.isDown &&
            !this.cursors.down.isDown) {
                // Comienza a  reproducir la animación
                this.anims.isPlaying = true;

                // La reproduce mientras se mueva
                if(this.anims.currentAnim.key !== 'cat_right'){
                    this.play('cat_right');
                }

                // Mueve el objeto
                this.move(1,0);
        }

        // Si se pulsa hacia abajo
        if(this.cursors.down.isDown && 
            !this.cursors.right.isDown &&
            !this.cursors.up.isDown &&
            !this.cursors.left.isDown) {
                // Comienza a reproducir la animación
                this.anims.isPlaying = true;

                // La reproduce mientras se mueva
                if(this.anims.currentAnim.key !== 'cat_down'){
                    this.play('cat_down');
                }

                // Mueve el objeto
                this.move(0,1);
        }

        // Si se pulsa hacia arriba
        if(this.cursors.up.isDown && 
            !this.cursors.right.isDown &&
            !this.cursors.down.isDown &&
            !this.cursors.left.isDown) {
                // Comienza a reproducir la animación
                this.anims.isPlaying = true;

                // La reproduce mientras se mueva
                if(this.anims.currentAnim.key !== 'cat_up'){
                    this.play('cat_up');
                }

                // Mueve el objeto
                this.move(0,-1);
        }

        // Si se deja de pulsar, para la animación y deja de mover el objeto
        if(Phaser.Input.Keyboard.JustUp(this.cursors.left) || 
            Phaser.Input.Keyboard.JustUp(this.cursors.right) ||
            Phaser.Input.Keyboard.JustUp(this.cursors.up) ||
            Phaser.Input.Keyboard.JustUp(this.cursors.down)){
                this.anims.isPlaying = false;
                this.move(0,0);
        }

    }
};