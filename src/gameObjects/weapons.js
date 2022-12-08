import gameObject from "./gameObject.js";
import Player from "./player.js";

class Weapon extends Phaser.GameObjects.Sprite {
    /**
     * Clase base para las armas
     * @extends Phaser.GameObjects.Sprite 
     * @param {Player} player - jugador base
     * @param {string} texture - textura del arma
     * @param {number} scaleX - escala en el eje X del objeto
     * @param {number} scaleY - escala en el eje Y del objeto
     * @param {number} dmg - daño que hace el arma
     * @param {number} reach - alcance del arma
     * @param {number} atkSpeed - velocidad de ataque del arma
     */
    constructor(player, texture, scaleX, scaleY, dmg, reach, atkSpeed) {
        super(player.scene, 40, 0, texture);

        this.dmg = dmg;
        this.reach = reach;
        this.atkSpeed = atkSpeed;
        // Añade el objeto a la escena
        this.scene.add.existing(this);
        this.setScale(scaleX, scaleY);
        this.hide();
    }

    hide() { this.visible = false; }
    show() { this.visible = true; }
}

class Navaja extends Weapon {
    constructor(player) {
        super(player, 'navaja', 0.1, 0.1, 5, 5, 250);
    }
}

class Botella extends Weapon {
    constructor(player) {
        super(player, 'botella', 0.2, 0.2, 3, 6, 350);
    }
}

class Barra extends Weapon {
    constructor(player) {
        super(player, 'barra', 0.5, 0.2, 2, 7, 200);
    }
}

class Hacha extends Weapon {
    constructor(player) {
        super(player, 'hacha', 0.2, 0.2, 7, 4, 500);
    }
}

class ColliderAtq extends gameObject {
    constructor(player, reach) {
        super(player.scene, player.x, player.y, 1, 1, 0, 0, "", player.speed);

        this.visible = false;
        this._player = player;
        this.reach = reach;

        // Creamos tabla de offsets para el jugador
        this.offset = {
            up: {
                x: 13, y: 31
            },
            right: {
                x: 34, y: 48
            },
            down: {
                x: 13, y: 68
            },
            left: {
                x: -4, y: 48
            }
        }
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        let offs = this.offset[this._player.facing];
        this.x = this._player.x + offs.x - this.reach;
        this.y = this._player.y + offs.y - this.reach;
        switch (this._player.facing) {
            case "down":
                this.y = this._player.y + this.offset.down.y;
            case "up":
                this.body.setSize(this.reach * 2, this.reach, false);
                break;
            case "right":
                this.x = this._player.x + this.offset.right.x;
            case "left":
                this.body.setSize(this.reach, this.reach * 2, false);
                break;
        }
    }

    setReach(reach) {
        this.reach = reach * 10;
    }
}

export default class WeaponManager extends gameObject {
    /**
     * 
     * @param {Player} player - jugador al que se une el manager
     */
    constructor(player) {
        // Extendemos de gameObject para que "preUpdate(t, dt)" funcione
        super(player.scene, 0, 0, 0, 0, 0, 0, "", 0); this.visible = false;
        
        // Se guarda el jugador
        this._player = player;

           // Se generan las armas
           this.navaja = new Navaja(player); this.navaja.show();
           this.botella = new Botella(player);
           this.barra = new Barra(player);
           this.hacha = new Hacha(player);
           this.selected = "navaja";
           this.brazo = new Brazo(this);

        // Se genera un nuevo objeto para detectar colisión entre arma y enemigo
        this.collider = new ColliderAtq(player, 1);
        let me = this;
        this.collisionDetector = {
            enemies: player.scene.physics.add.collider(this.collider, player.scene.enemies,
                     function (obj1, obj2) { me.collision(me, obj1, obj2); }, null),
            boxes: player.scene.physics.add.collider(this.collider, player.scene.woodBoxes,
                   function (obj1, obj2) { me.breakBox(me, obj2); }, null)
        };
        this.collisionDetector.enemies.overlapOnly = true;
        this.collisionDetector.boxes.overlapOnly = true;

        // Se genera un objeto para mantener las propiedades de ataque
        this._attack = {
            isAttacking: false,
            damage: 0
        };

        // Se genera el objeto de booleanos para guardar qué armas se tienen
        this._hasWeapon = {
            navaja: true,
            botella: true,
            barra: true,
            hacha: true
        };

        // Se guardan las teclas para poder recoger el input
        this.input = player.scene.input.keyboard.addKeys({
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            one: Phaser.Input.Keyboard.KeyCodes.ONE,
            two: Phaser.Input.Keyboard.KeyCodes.TWO,
            three: Phaser.Input.Keyboard.KeyCodes.THREE,
            four: Phaser.Input.Keyboard.KeyCodes.FOUR
        })

    }

    //se informa de que se ha desbloqueado una arma
    hasNewWeapon(weapon) {
        this._hasWeapon[weapon] = true;
    }
    nextLevel(_botella,_barra,_hacha){
        this._hasWeapon["botella"] = _botella;
        this._hasWeapon["barra"] = _barra;
        this._hasWeapon["hacha"] = _hacha;
    }
    // Funciona debido a que extendemos de gameObject
    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        // Si se pulsa la tecla "1", se cambia a la navaja (si se tiene)
        if (this._hasWeapon.navaja && this.selected != "navaja" && Phaser.Input.Keyboard.JustDown(this.input.one)) {
            this.selected = "navaja";
            this._player.ChangeWeapon(this.selected);
            this.brazo.ChangeWeapon(this.navaja);
        }
        // Si se pulsa la tecla "3", se cambia a la botella (si se tiene)
        if (this._hasWeapon.botella && this.selected != "botella" && Phaser.Input.Keyboard.JustDown(this.input.three)) {
            this.selected = "botella";
            this._player.ChangeWeapon(this.selected);
            this.brazo.ChangeWeapon(this.botella);
        }
        // Si se pulsa la tecla "4", se cambia a la barra (si se tiene)
        if (this._hasWeapon.barra && this.selected != "barra" && Phaser.Input.Keyboard.JustDown(this.input.four)) {
            this.selected = "barra";
            this._player.ChangeWeapon(this.selected);
            this.brazo.ChangeWeapon(this.barra);
        }
        // Si se pulsa la tecla "2", se cambia al hacha (si se tiene)
        if (this._hasWeapon.hacha && this.selected != "hacha" && Phaser.Input.Keyboard.JustDown(this.input.two)) {
            this.selected = "hacha";
            this._player.ChangeWeapon(this.selected);
            this.brazo.ChangeWeapon(this.hacha);
        }
        // Si se pulsa la barra espaciadora, se hace un ataque.
        if (Phaser.Input.Keyboard.JustDown(this.input.space)) {
            this.brazo.tween.play();
        }
    }

    collision(self, obj1, obj2) {
        if (self._attack.isAttacking) {
            // Si no existe la propiedad "damage", se ejecuta la segunda función
            //(obj2.damage || function() { console.log(obj2, "No tiene método damage"); })();
            // Si la propiedad "damage" no es una función, se ejecuta la segunda función
            (typeof obj2.damage === "function" ? obj2.damage : function () { console.log(obj2, "No tiene método damage"); }).bind(obj2)(self._attack.damage);
        }
    }

    breakBox(self, box) {
        if(self._attack.isAttacking && self.selected === "hacha") {
            (typeof box.destroyMe === "function" ? box.destroyMe : function() { console.log(box, "No tiene método de destruir"); }).bind(box)();
        }
    }
}

// Objeto que se encarga de la renderización del ataque
class Brazo extends Phaser.GameObjects.Container {
    constructor(weaponManager) {
        super(weaponManager.scene, weaponManager._player.x, weaponManager._player.y);

        this.attacking = false;

        this._player = weaponManager._player;
        this.weapon = weaponManager.navaja;

        //this.add(new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'brazo'));
        this.add(weaponManager.navaja); this.add(weaponManager.botella); this.add(weaponManager.barra); this.add(weaponManager.hacha);

        this.scene.add.existing(this);
        this.visible = false;
        this.depth = 100000000;

        // Creamos tabla de offsets para el jugador
        this.offset = {
            up: {
                x: 3, y: 16
            },
            right: {
                x: 1, y: 8
            },
            down: {
                x: 0, y: 23
            },
            left: {
                x: -4, y: 8
            }
        }

        this.tween = this.scene.tweens.addCounter({
            from: 0,
            to: 180,
            targets: this,
            duration: () => { return this.weapon.atkSpeed; },
            paused: true,
            callbackScope: weaponManager,
            onUpdateScope: this,
            onUpdate: function(tween) {
                let auxAngle = 0;
                switch(this._player.facing) {
                    case "right":
                        auxAngle += 90;
                    case "up":
                        auxAngle += 90;
                    case "left":
                        auxAngle += 90;
                    break;
                }
                this.angle = tween.getValue() + auxAngle;
            },
            onActive: function() {
                this.brazo.visible = true;
                this._attack.isAttacking = true;
                this.brazo.attacking = true;
                let weapon = this[this.selected];
                this._attack.damage = weapon.dmg;
                // Se cambian las colisiones para que sean iguales al alcance del arma
                this.collider.setReach(weapon.reach);
                // Se activa el sonido correspondiente
                this.scene.soundManager.play(this.selected);
            },
            onComplete: function() {
                this.brazo.visible = false;
                this._attack.isAttacking = false;
                this.brazo.attacking = false;
            }
        });
    }

    preUpdate(t, dt) {
        let offs = this.offset[this._player.facing];
        this.x = this._player.x + offs.x;
        this.y = this._player.y + offs.y;
        switch (this._player.facing) {
            case "down":
                this.y = this._player.y + this.offset.down.y;
            case "up":
                break;
            case "right":
                this.x = this._player.x + this.offset.right.x;
            case "left":
                break;
        }
    }

    ChangeWeapon(w) {
        if(this.attacking) {
            this.tween.once('complete', () => { this.weapon.hide(); this.weapon = w; this.weapon.show(); });
        } else {
            this.weapon.hide(); this.weapon = w; this.weapon.show();
        }
    }
}