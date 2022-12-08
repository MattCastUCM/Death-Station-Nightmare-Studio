import gameObject from './gameObject.js';
import WeaponManager from './weapons.js';


export default class Player extends gameObject {
    /**
     * Jugador
     * @extends gameObject
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
     */
    constructor(scene, x, y) {
        super(scene, x, y, 13, 10, 9, 34, 'personaje', 140);
        this.scene = scene;

        this.weaponManager = new WeaponManager(this);
        this.fullCollider = new gameObject(scene, x, y, 13, 40, 9, -5, "", 0);
        this.fullCollider.visible = false;
        
        this.hp = 100;
        this.hasCollided = false;
        this.elapsedTime = 0;
        this.facing = "down";
        
        this.soundCounter = 0; //contador para emitir sonido
		this.soundMax=25; //frecuencia de emisión de sonido 
        
        // Creamos las animaciones
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

    
    // Gestiona el input
    getInput(){
        // Si se pulsa hacia abajo
        if (!this.weaponManager._attack.isAttacking &&
            this.input.s.isDown &&
            !this.input.w.isDown) {
            
            // Mueve el objeto
            this.move(0, 1);
            this.keyDown = true;
        }
        // Si se pulsa hacia arriba
        if (!this.weaponManager._attack.isAttacking &&
            this.input.w.isDown &&
            !this.input.s.isDown) {

            // Mueve el objeto
            this.move(0, -1);
            this.keyDown = true;
        }
        // Si se pulsa hacia la izquierda
        if (!this.weaponManager._attack.isAttacking &&
            this.input.a.isDown &&
            !this.input.d.isDown) {

            // Mueve el objeto
            this.move(-1, 0);
            this.keyDown = true;
        }
        // Si se pulsa hacia la derecha
        if (!this.weaponManager._attack.isAttacking &&
            this.input.d.isDown &&
            !this.input.a.isDown) {

            // Mueve el objeto
            this.move(1, 0)
            this.keyDown = true;
        }
        // Si se deja de pulsar, para la animación
        if (this.weaponManager._attack.isAttacking ||
            Phaser.Input.Keyboard.JustUp(this.input.a) ||
            Phaser.Input.Keyboard.JustUp(this.input.d) ||
            Phaser.Input.Keyboard.JustUp(this.input.w) ||
            Phaser.Input.Keyboard.JustUp(this.input.s)) {
            this.move(0, 0)
            this.anims.isPlaying = false;
            this.keyDown = false;
        }
    }


    // Cambia la dirección a la que mira según su velocidad
    setDirection(){
        if (this.body.velocity.x !== 0 || this.body.velocity.y !== 0){
            this.soundCounter++;
            if (this.soundCounter>this.soundMax){
                this.soundCounter=0;
                this.scene.soundManager.play("walk")
            }
        }

        if(this.body.velocity.x === 0 && this.body.velocity.y === 0){
            if(this.facing === "down") this.setFrame(1);
            else if(this.facing === "left") this.setFrame(5);
            else if(this.facing === "right") this.setFrame(9);
            else if (this.facing === "up") this.setFrame(13);
        }
        else if(this.body.velocity.x === 0 && this.body.velocity.y >= 1){
            // Comienza a reproducir la animación
            this.facing = "down";
            this.anims.isPlaying = true;
            // La reproduce mientras se mueva
            if (this.anims.currentAnim.key !== 'down') {
                this.play('down');
            }
        }
        else if(this.body.velocity.x === 0 && this.body.velocity.y <= -1){
            // Comienza a reproducir la animación
            this.facing = "up";
            this.anims.isPlaying = true;
            // La reproduce mientras se mueva
            if (this.anims.currentAnim.key !== 'up') {
                this.play('up');
            }
        }
        else if(this.body.velocity.x <= -1 && this.body.velocity.y === 0){
            // Comienza a  reproducir la animación
            this.facing = "left";
            this.anims.isPlaying = true;
            // La reproduce mientras se mueva
            if (this.anims.currentAnim.key !== 'left') {
                this.play('left');
            }
        }
        else if(this.body.velocity.x >= 1 && this.body.velocity.y === 0){
            // Comienza a  reproducir la animación
            this.facing = "right";
            this.anims.isPlaying = true;
            // La reproduce mientras se mueva
            if (this.anims.currentAnim.key !== 'right') {
                this.play('right');
            }
        }
    }


    // Para al jugador (llamado por el HUD al pausar la escena)
    stop() {
        this.move(0, 0);
        this.anims.isPlaying = false;
    }


    // Informa al HUD y a WeaponManager de que tiene nueva arma
    HasNewWeapon(weapon) {
        this.scene.hud.addInventory(weapon);
        this.weaponManager.hasNewWeapon(weapon);
        this.scene.soundManager.play("pickWeapon");
    }
    // Informa al HUD de que ha cambiado de arma
    ChangeWeapon(weapon) {
        this.scene.hud.changeObject(weapon);
        this.scene.soundManager.play("selectWeapon");
    }


    // Disminuye la vida e indica que ha colisionado
    decreaseHP() {
        if (!this.hasCollided) {
            this.hp -= 10;
            this.hasCollided = true;
            this.scene.DecreaseLife(this);
            for(let i= 0; i<3; i= i+2){
                setTimeout(()=>{ this.setTint(0xff0000);}, i * 150);
                setTimeout(()=>{ this.clearTint();}, (i + 1) * 150);
            }
            this.scene.soundManager.play("playerHurt")

        }
    }
    

    preUpdate(t, dt) {
        // IMPORTANTE llamar al preUpdate del padre para poder ejecutar la animación
        super.preUpdate(t, dt);
        this.depth = this.fullCollider.y;

        // La máscara de iluminación se mueve con el personaje
        this.vision.x = this.x;
        this.vision.y = this.y;

        // El collider de cuerpo completo también
        this.fullCollider.x = this.x;
        this.fullCollider.y = this.y;
        this.friction();

        this.getInput();
        this.setDirection();

        // Si ha colisionado,
        if (this.hasCollided) {
            // Aumenta el tiempo que ha pasado desde la colisión
            this.elapsedTime += dt;

            // Si ha pasado un cierto tiempo, se indica que ha
            // dejado de colisionar y se popne el temporizador a 0
            if (this.elapsedTime >= 600) {
                this.hasCollided = false;
                this.elapsedTime = 0;
            }
        }


    };
};