import gameObject from './gameobject.js';

// Clase para el gato que hereda de gameObject
export default class Cat extends gameObject {
    // Constructora que recibe los mismos parámetros que el padre
    // excepto por la textura, que es siempre la misma
    constructor(scene, posX, posY, w, h, offsetX, offsetY, spd) {
        super(scene, posX, posY, w, h, offsetX, offsetY, 'personaje', spd);

        this.hp = 100;
        this.hasColided = false;
        this.elapsedTime = 0;
        this.atacando = false;

        // Añadimos collider para el ataque
        let colliderAtq = new gameObject(scene, posX, posY, 100, 100, 0, 0, "", 0);
        colliderAtq.active(false);
        console.log("Hola");

        //Creamos las animaciones
        this.scene.anims.create({
            key: 'idle',
            frames: scene.anims.generateFrameNumbers('personaje', {start:1, end:1}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'up',
            frames: scene.anims.generateFrameNumbers('personaje', {start:9, end:11}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'down',
            frames: scene.anims.generateFrameNumbers('personaje', {start:0, end:2}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'left',
            frames: scene.anims.generateFrameNumbers('personaje', {start:3, end:5}),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers('personaje', {start:6, end:8}),
            frameRate: 5,
            repeat: -1
        });


        // La animación a ejecutar según se genere será 'idle'
        this.play('idle');

        // Input de teclado
        this.cursors = this.scene.input.keyboard.addKeys({
            w: Phaser.Input.Keyboard.KeyCodes.W,
            a: Phaser.Input.Keyboard.KeyCodes.A,
            s: Phaser.Input.Keyboard.KeyCodes.S,
            d: Phaser.Input.Keyboard.KeyCodes.D,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
        });

    }


    // Bucle principal. Actualiza su posición y ejecuta las acciones según el input
    preUpdate(t, dt){
        // IMPORTANTE llamar al preUpdate del padre para poder ejecutar la animación
        super.preUpdate(t,dt);

        // No es posible moverse pulsando 2 teclas a la vez

        // Si se pulsa hacia la izquierda
        if(this.cursors.a.isDown && 
            !this.cursors.d.isDown &&
            !this.cursors.w.isDown &&
            !this.cursors.s.isDown) {
                // Comienza a  reproducir la animación
                this.anims.isPlaying = true;

                // La reproduce mientras se mueva
                if(this.anims.currentAnim.key !== 'left'){
                    this.play('left');
                }

                // Mueve el objeto
                this.move(-1,0);
        }

        // Si se pulsa hacia la derecha
        if(this.cursors.d.isDown && 
            !this.cursors.a.isDown &&
            !this.cursors.w.isDown &&
            !this.cursors.s.isDown) {
                // Comienza a  reproducir la animación
                this.anims.isPlaying = true;

                // La reproduce mientras se mueva
                if(this.anims.currentAnim.key !== 'right'){
                    this.play('right');
                }

                // Mueve el objeto
                this.move(1,0);
        }

        // Si se pulsa hacia abajo
        if(this.cursors.s.isDown && 
            !this.cursors.d.isDown &&
            !this.cursors.w.isDown &&
            !this.cursors.a.isDown) {
                // Comienza a reproducir la animación
                this.anims.isPlaying = true;

                // La reproduce mientras se mueva
                if(this.anims.currentAnim.key !== 'down'){
                    this.play('down');
                }

                // Mueve el objeto
                this.move(0,1);
        }

        // Si se pulsa hacia arriba
        if(this.cursors.w.isDown && 
            !this.cursors.d.isDown &&
            !this.cursors.s.isDown &&
            !this.cursors.a.isDown) {
                // Comienza a reproducir la animación
                this.anims.isPlaying = true;

                // La reproduce mientras se mueva
                if(this.anims.currentAnim.key !== 'up'){
                    this.play('up');
                }

                // Mueve el objeto
                this.move(0,-1);
        }

        // Si se pulsa espacio, comienza la secuencia de ataque
        if(Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            colliderAtq.active(colliderAtq.active());
            console.log("Espacio pulsado");
            this.atacando = !this.atacando;
        }


        // Si se deja de pulsar, para la animación y deja de mover el objeto
        if(Phaser.Input.Keyboard.JustUp(this.cursors.a) || 
            Phaser.Input.Keyboard.JustUp(this.cursors.d) ||
            Phaser.Input.Keyboard.JustUp(this.cursors.w) ||
            Phaser.Input.Keyboard.JustUp(this.cursors.s)){
                this.anims.isPlaying = false;
                this.move(0,0);
        }


        // Si ha colisionado,
        if(this.hasColided){
            console.log(this.hasColided);
            // Aumenta el tiempo que ha pasado desde la colisión
            this.elapsedTime += dt;
                console.log('entra');

            // Si ha pasado un cierto tiempo, se indica que ha
            // dejado de colisionar y se popne el temporizador a 0
            if(this.elapsedTime >= 500){
                this.hasColided = false;
                this.elapsedTime = 0;   
            }
        }




    }

    update(t,dt){    }


    // Método que disminuye la vida e indica que ha colisionado
    decreaseHP(){
        this.hp -= 10;
        this.hasColided = true;
    }
    



};