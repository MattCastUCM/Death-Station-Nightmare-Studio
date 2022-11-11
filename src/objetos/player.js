import gameObject from './gameobject.js';
import WeaponManager from './weapons.js';

// Clase para el gato que hereda de gameObject
export default class Player extends gameObject {
    // Constructora que recibe los mismos parámetros que el padre
    // excepto por la textura, que es siempre la misma
    constructor(scene, posX, posY, w, h, offsetX, offsetY, spd) {
        super(scene, posX, posY, w, h, offsetX, offsetY, 'personaje', spd);

        this.hp = 100;
        this.hasCollided = false;
        this.elapsedTime = 0;
        this.facing = "down";

        this.weaponManager = new WeaponManager(this);

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

        });

        // Iluminación
        this.vision=scene.make.sprite({
			x: this.x,
			y: this.y,
			key: 'mask',
			add: false
		})
		this.vision.scale =4;
    }
    
    
    GetPosX(){
        return this.x;
    }
    GetPosY(){
        return this.y;
    }
    
    GetHP(){
        return this.hp;
    }

    HasCollided(){
        return this.hasCollided;
    }
    
    // Método que disminuye la vida e indica que ha colisionado
    decreaseHP(){
        this.hp -= 10;
        this.hasCollided = true;
    }
    
    // Bucle principal. Actualiza su posición y ejecuta las acciones según el input
    preUpdate(t, dt){
        // IMPORTANTE llamar al preUpdate del padre para poder ejecutar la animación
        super.preUpdate(t,dt);
        let movementX = 0;
        let movementY = 0;

        // Si se pulsa hacia abajo
        if(this.cursors.s.isDown && 
            !this.cursors.w.isDown) {
                // Comienza a reproducir la animación
                this.anims.isPlaying = true;

                // La reproduce mientras se mueva
                if(this.anims.currentAnim.key !== 'down'){
                    this.play('down');
                }

                // Mueve el objeto
                movementY = 1;

        }

        // Si se pulsa hacia arriba
        if(this.cursors.w.isDown && 
            !this.cursors.s.isDown) {
                // Comienza a reproducir la animación
                this.anims.isPlaying = true;

                // La reproduce mientras se mueva
                if(this.anims.currentAnim.key !== 'up'){
                    this.play('up');
                }

                // Mueve el objeto
                movementY = -1;
        }

        // Si se pulsa hacia la izquierda
        if(this.cursors.a.isDown && 
            !this.cursors.d.isDown) {
                // Comienza a  reproducir la animación
                this.anims.isPlaying = true;

                // La reproduce mientras se mueva
                if(this.anims.currentAnim.key !== 'left'){
                    this.play('left');
                }

                // Mueve el objeto
                movementX = -1;
        }

        // Si se pulsa hacia la derecha
        if(this.cursors.d.isDown && 
            !this.cursors.a.isDown ) {
                // Comienza a  reproducir la animación
                this.anims.isPlaying = true;

                // La reproduce mientras se mueva
                if(this.anims.currentAnim.key !== 'right'){
                    this.play('right');
                }

                // Mueve el objeto
                movementX = 1;
        }

        this.move(movementX,movementY);

        // Si se deja de pulsar, para la animación
        if(Phaser.Input.Keyboard.JustUp(this.cursors.a) || 
            Phaser.Input.Keyboard.JustUp(this.cursors.d) ||
            Phaser.Input.Keyboard.JustUp(this.cursors.w) ||
            Phaser.Input.Keyboard.JustUp(this.cursors.s)){
                this.anims.isPlaying = false;
        }

        // Si ha colisionado,
        if(this.hasCollided){

            // Aumenta el tiempo que ha pasado desde la colisión
            this.elapsedTime += dt;
           //     console.log('entra');

            // Si ha pasado un cierto tiempo, se indica que ha
            // dejado de colisionar y se popne el temporizador a 0
            if(this.elapsedTime >= 500){
                this.hasCollided = false;
                this.elapsedTime = 0;   
            }
        }
        // La máscara de iluminación se mueve con el personaje
        this.vision.x = this.x;
		this.vision.y = this.y;
       
    };
};