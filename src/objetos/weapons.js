import gameObject from "./gameobject.js";
import Player from "./player.js";

class Weapon extends Phaser.GameObjects.Sprite {
    /**
	 * Constructor de arma base
	 * @param {Player} player - jugador base
	 * @param {string} texture - textura del arma
	 * @param {number} dmg - daño que hace el arma
	 * @param {number} reach - alcance del arma
	 * @param {number} atkSpeed - velocidad de ataque del arma
	 */
    constructor(player, texture, dmg, reach, atkSpeed) {
        super(player.scene, player.x, player.y, texture);

        this.dmg = dmg;
        this.reach = reach;
        this.atkSpeed = atkSpeed;
    }
}

class Navaja extends Weapon {
    constructor(player) {
        super(player, 'navaja', 5, 5, 3);
    }
}

class Botella extends Weapon {
    constructor(player) {
        super(player, 'botella', 3, 5, 5);
    }
}

class Barra extends Weapon {
    constructor(player) {
        super(player, 'barra', 5, 7, 7);
    }
}

class Hacha extends Weapon {
    constructor(player) {
        super(player, 'hacha', 7, 5, 7);
    }


}

class ColliderAtq extends gameObject {
    constructor(player, offsetX, offsetY, reach, dir) {
        super(player.scene, player.x + offsetX, player.y + offsetY, 1, 1, 0, 0, "", player.speed);

        this.visible = false;
        this._player = player;
        this.offset = {}
        this.offset.x = offsetX;
        this.offset.y = offsetY;
        this.offset.dir = dir;
        this.reach = reach;
    }

    diff(a, b) {
        let dif = a - b;
        if(dif < 0) dif = -dif;
        return dif;
    }
    
    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        switch(this.offset.dir) {
            case "up":
            case "left":
                this.x = this._player.x + this.offset.x - this.reach;
                this.y = this._player.y + this.offset.y - this.reach;
                this.body.setSize(this.reach * 2, this.reach, false);
                break;
            case "right":
                this.x = this._player.x + this.offset.x;
                this.y = this._player.y + this.offset.y - this.reach;
                this.body.setSize(this.reach, this.reach * 2, false);
                break;
            case "down":
                this.x = this._player.x + this.offset.x - this.reach;
                this.y = this._player.y + this.offset.y;
                this.body.setSize(reach * 2, reach, false);
                break;
            case "left":
                this.x = this._player.x + this.offset.x - this.reach;
                this.y = this._player.y + this.offset.y - this.reach;
        }
        
        /* Se mueve con el jugador
        let movement = {};
        movement.x = this.offset.x;
        movement.y = this.offset.y;

        if(this.diff(this._player.x + movement.x, this.x) > 0.75) {
            movement.x += this._player.x - this.x;
        } else {
            movement.x = 0;
        }
        if(this.diff(this._player.y + movement.y, this.y) > 0.75) {
            movement.y += this._player.y - this.y;
        } else {
            movement.y = 0;
        }
        this.move(movement.x, movement.y); //*/
    }

    setReach(reach) {
        reach *= 10;
        this._reach = reach;
        switch(this.offset.dir) {
            case "up":
                this.x = this._player.x + this.offset.x - reach;
                this.y = this._player.y + this.offset.y - reach;
                this.body.setSize(reach * 2, reach, false);
                break;
            case "right":
                this.y = this._player.y + this.offset.y - reach;
                this.body.setSize(reach, reach * 2, false);
                break;
            case "down":
                this.x = this._player.x + this.offset.x - reach;
                this.body.setSize(reach * 2, reach, false);
                break;
            case "left":
                this.x = this._player.x + this.offset.x - reach;
                this.y = this._player.y + this.offset.y - reach;
                this.body.setSize(reach, reach * 2, false);
                break;
        }
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

        // Se genera la tabla de colliders para detectar el ataque
        this.colliders = {}
        // player esquina izquierda = (-12, -19)
        this.colliders.up = new ColliderAtq(player, 13, 5, 1, "up");
        this.colliders.right = new ColliderAtq(player, 39, 31, 1, "right");
        this.colliders.down = new ColliderAtq(player, 13, 56, 1, "down");
        this.colliders.left = new ColliderAtq(player, -11, 31, 1, "left");

        // Se hace un grupo en las físicas para permitir añadir la colisión más fácilmente
        this.colliderGroup = player.scene.physics.add.group();
        this.colliderGroup.add(this.colliders.up);
        this.colliderGroup.add(this.colliders.right);
        this.colliderGroup.add(this.colliders.down);
        this.colliderGroup.add(this.colliders.left);

        let me = this;
        //this.col = new Phaser.Physics.Arcade.Collider(player.scene.physics.world, true, this.colliderGroup, player.scene.enemies, function() { console.log("col"); });
        this.collisionDetector = player.scene.physics.add.collider(this.colliderGroup, player.scene.enemies,
                                                                             function(obj1, obj2) { me.collision(me, obj1, obj2); }, null);
        this.collisionDetector.overlapOnly = true;

        // Se genera una tabla para mantener las propiedades de ataque
        this._attack = {};
        this._attack.isAttacking = false;
        // Se guarda la última vez que se hizo un ataque
        this._attack.lastSwing = 0;
        this._attack.damage = 0;

        // Se guarda el jugador
        this._player = player;

        // Se genera la tabla de booleanos para guardar qué armas se tienen
        this._hasWeapon = {};
        this._hasWeapon.navaja = true;
        this._hasWeapon.botella = false;
        this._hasWeapon.barra = false;
        this._hasWeapon.hacha = false;

        // Se generan las armas
        this.navaja = new Navaja(player);
        this.botella = new Botella(player);
        this.barra = new Barra(player);
        this.hacha = new Hacha(player);
        this.selected = "navaja";

        // Se guardan las teclas para poder recoger el input
        this.input = player.scene.input.keyboard.addKeys({
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            one: Phaser.Input.Keyboard.KeyCodes.ONE,
            two: Phaser.Input.Keyboard.KeyCodes.TWO,
            three: Phaser.Input.Keyboard.KeyCodes.THREE,
            four: Phaser.Input.Keyboard.KeyCodes.FOUR
        })
    }

    // Funciona debido a que extendemos de gameObject
    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        // Si se pulsa la tecla "1", se cambia a la navaja (si se tiene)
        if(this._hasWeapon.navaja && Phaser.Input.Keyboard.JustDown(this.input.one)) {
            this.selected = "navaja";
        }
        // Si se pulsa la tecla "2", se cambia a la botella (si se tiene)
        if(this._hasWeapon.botella && Phaser.Input.Keyboard.JustDown(this.input.two)) {
            this.selected = "botella";
        }
        // Si se pulsa la tecla "3", se cambia a la barra (si se tiene)
        if(this._hasWeapon.barra && Phaser.Input.Keyboard.JustDown(this.input.three)) {
            this.selected = "barra";
        }
        // Si se pulsa la tecla "4", se cambia al hacha (si se tiene)
        if(this._hasWeapon.hacha && Phaser.Input.Keyboard.JustDown(this.input.four)) {
            this.selected = "hacha";
        }
        // Si se pulsa la barra espaciadora, se hace un ataque.
        if(Phaser.Input.Keyboard.JustDown(this.input.space)) {
            this.attack(t);
        }

        if(this._attack.lastSwing + 1000 <= t) {
            this._attack.isAttacking = false;
        }
    }

    collision(self, obj1, obj2) {
        if(this._attack.isAttacking && obj1 === self.colliders[self._player.facing]) {
            // Si no existe la propiedad "damage", se ejecuta la segunda función
            //(obj2.damage || function() { console.log(obj2, "No tiene método damage"); })();
            // Si la propiedad "damage" no es una función, se ejecuta la segunda función
            (typeof obj2.damage === "function" ? obj2.damage : function() { console.log(obj2, "No tiene método damage"); })();
        }
    }

    /**
       @param {number} t - tiempo transcurrido desde el inicio
    */
    attack(t) {
        // Se almacena el arma seleccionada en una variable para más comodidad y legibilidad
        let weapon = this[this.selected];
        console.log("Tiempo actual: ", t, "   Tiempo del último ataque realizado: ", this._attack.lastSwing);
        if(t >= this._attack.lastSwing + weapon.atkSpeed * 1000) {
            this._attack.lastSwing = t;
            this._attack.isAttacking = true;
            this._attack.damage = weapon.damage;
            //* Se cambian las colisiones para que sean iguales al alcance del arma
            Object.values(this.colliders).forEach(val => {
                val.setReach(weapon.reach);
            });//*/
        }
    }
}