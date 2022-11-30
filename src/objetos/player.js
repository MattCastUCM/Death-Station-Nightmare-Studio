import gameObject from './gameObject.js';
import WeaponManager from './weapons.js';

// Clase para el jugador que hereda de gameObject
export default class Player extends gameObject {
    /**
     * Constructora
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
     * @param {number} w - ancho
     * @param {number} h - alto
     * @param {number} offsetX - distancia entre la x del sprite y la x de su collider
     * @param {number} offsetY - distancia entre la y del sprite y la y de su collider
     * @param {number} spd - velocidad
     */
    constructor(scene, x, y, w, h, offsetX, offsetY, spd) {
        super(scene, x, y, w, h, offsetX, offsetY, 'personaje', spd);
        this.scene = scene;
        this.fullCollider = new gameObject(scene, x, y, w, 40, offsetX, -3, "", 0);
        this.hp = 100;
        this.hasCollided = false;
        this.elapsedTime = 0;
        this.facing = "down";
        this.weaponManager = new WeaponManager(this)
        //Creamos las animaciones
        this.scene.anims.create({
            key: 'idle',
            frames: scene.anims.generateFrameNumbers('personaje', { start: 1, end: 1 }),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'up',
            frames: scene.anims.generateFrameNumbers('personaje', { start: 12, end: 15 }),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'down',
            frames: scene.anims.generateFrameNumbers('personaje', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'left',
            frames: scene.anims.generateFrameNumbers('personaje', { start: 4, end: 7 }),
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers('personaje', { start: 8, end: 11 }),
            frameRate: 5,
            repeat: -1
        });


        // La animación a ejecutar según se genere será 'idle'
        this.play('idle');

        // Input de teclado
        this.input = this.scene.input.keyboard.addKeys({
            //movimiento
            w: Phaser.Input.Keyboard.KeyCodes.W,
            a: Phaser.Input.Keyboard.KeyCodes.A,
            s: Phaser.Input.Keyboard.KeyCodes.S,
            d: Phaser.Input.Keyboard.KeyCodes.D,
        });


        // Iluminación
        this.vision = scene.make.sprite({
            x: this.x,
            y: this.y,
            key: 'mask',
            add: false
        })
        this.vision.scale = 4;
    }

    //llamado por hud cuando se pausa la escena
    stop() {
        this.move(0, 0);
        this.anims.isPlaying = false;
    }
    /*informa al hud y a weaponManager de que tiene nueva arma*/
    HasNewWeapon(weapon) {
        this.scene.hud.addInventory(weapon);
        this.weaponManager.hasNewWeapon(weapon);
    }
    ChangeWeapon(weapon) {
        this.scene.hud.changeObject(weapon);
    }
    GetPosX() {
        return this.x;
    }
    GetPosY() {
        return this.y;
    }

    GetHP() {
        return this.hp;
    }

    // Método que disminuye la vida e indica que ha colisionado
    decreaseHP() {
        if (!this.hasCollided) {
            this.hp -= 10;
            this.hasCollided = true;
            this.scene.DecreaseLife(this);
            for(let i= 0; i<3; i= i+2){
                setTimeout(()=>{ this.setTint(0xff0000);}, i * 150);
                setTimeout(()=>{ this.clearTint();}, (i + 1) * 150);
            }
        }
    }


    // Bucle principal. Actualiza su posición y ejecuta las acciones según el input
    preUpdate(t, dt) {
        // IMPORTANTE llamar al preUpdate del padre para poder ejecutar la animación
        super.preUpdate(t, dt);

        // La máscara de iluminación se mueve con el personaje
        this.vision.x = this.x;
        this.vision.y = this.y;
        // El collider de cuerpo completo también
        this.fullCollider.x = this.x;
        this.fullCollider.y = this.y;
        this.friction();

        // Si se pulsa hacia abajo
        if (this.input.s.isDown &&
            !this.input.w.isDown) {
            // Comienza a reproducir la animación
            this.facing = "down";
            this.anims.isPlaying = true;
            // La reproduce mientras se mueva
            if (this.anims.currentAnim.key !== 'down') {
                this.play('down');
            }

            // Mueve el objeto
            this.move(0, 1)

        }

        // Si se pulsa hacia arriba
        if (this.input.w.isDown &&
            !this.input.s.isDown) {
            // Comienza a reproducir la animación
            this.facing = "up";
            this.anims.isPlaying = true;
            // La reproduce mientras se mueva
            if (this.anims.currentAnim.key !== 'up') {
                this.play('up');
            }

            // Mueve el objeto
            this.move(0, -1)
        }

        // Si se pulsa hacia la izquierda
        if (this.input.a.isDown &&
            !this.input.d.isDown) {
            // Comienza a  reproducir la animación
            this.facing = "left";
            this.anims.isPlaying = true;
            // La reproduce mientras se mueva
            if (this.anims.currentAnim.key !== 'left') {
                this.play('left');
            }

            // Mueve el objeto
            this.move(-1, 0)

        }

        // Si se pulsa hacia la derecha
        if (this.input.d.isDown &&
            !this.input.a.isDown) {
            // Comienza a  reproducir la animación
            this.anims.isPlaying = true;
            this.facing = "right";
            // La reproduce mientras se mueva
            if (this.anims.currentAnim.key !== 'right') {
                this.play('right');
            }

            // Mueve el objeto
            this.move(1, 0)

            this.keyDown = true;
        }


        // Si se deja de pulsar, para la animación
        if (Phaser.Input.Keyboard.JustUp(this.input.a) ||
            Phaser.Input.Keyboard.JustUp(this.input.d) ||
            Phaser.Input.Keyboard.JustUp(this.input.w) ||
            Phaser.Input.Keyboard.JustUp(this.input.s)) {
            this.move(0, 0)
            this.anims.isPlaying = false;
            this.keyDown = false;
        }
        // Si ha colisionado,
        if (this.hasCollided) {

            // Aumenta el tiempo que ha pasado desde la colisión
            this.elapsedTime += dt;
            //     console.log('entra');

            // Si ha pasado un cierto tiempo, se indica que ha
            // dejado de colisionar y se popne el temporizador a 0
            if (this.elapsedTime >= 500) {
                this.hasCollided = false;
                this.elapsedTime = 0;
            }
        }


    };
};


