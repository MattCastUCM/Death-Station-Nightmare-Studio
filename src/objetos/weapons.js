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
    constructor(player, offsetX, offsetY, w, h) {
        super(player.scene, player.x + offsetX, player.y + offsetY, w, h, 0, 0, "", player.speed);

        this.visible = false;
        this._player = player;
        this.offset = {}
        this.offset.x = offsetX;
        this.offset.y = offsetY;
        this.width = w;
        this.height = h;
    }

    diff(a, b) {
        let dif = a - b;
        if(dif < 0) dif = -dif;
        return dif;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        // Se mueve con el jugador
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
        this.move(movement.x, movement.y);
    }

    setReach(reach) {
        if(this.width > this.height) {
            this.width = reach * 2;
            this.height = reach;
        } else {
            this.height = reach * 2;
            this.width = reach;
        }
        this.body.setSize(this.width, this.height);
        console.log(this);
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
        this.colliders.up = new ColliderAtq(player, -37, -19, 100, 25);
        this.colliders.right = new ColliderAtq(player, 38, -19, 25, 100);
        this.colliders.down = new ColliderAtq(player, -37, 56, 100, 25);
        this.colliders.left = new ColliderAtq(player, -37, -19, 25, 100);

        // Se hace un grupo en las físicas para permitir añadir la colisión más fácilmente
        this.colliders.colliderGroup = player.scene.physics.add.group();
        this.colliders.colliderGroup.add(this.colliders.up);
        this.colliders.colliderGroup.add(this.colliders.right);
        this.colliders.colliderGroup.add(this.colliders.down);
        this.colliders.colliderGroup.add(this.colliders.left);

        let me = this;
        //this.col = new Phaser.Physics.Arcade.Collider(player.scene.physics.world, true, this.colliderGroup, player.scene.enemies, function() { console.log("col"); });
        this.colliders.collisionDetector = player.scene.physics.add.collider(this.colliders.colliderGroup, player.scene.enemies,
                                                                             function(obj1, obj2) { me.collision(me, obj1, obj2); }, null);
        this.colliders.collisionDetector.overlapOnly = true;

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
            console.log("V");
            this.attack(t);
            console.log("H");
        }
    }

    collision(self, obj1, obj2) {
        if(this._attack.isAttacking && obj1 === self.colliders[self._player.facing]) {
            (obj2.damage || function() { console.log(obj2, "No tiene método damage"); })();
        }
    }

    /**
       @param {number} t - tiempo transcurrido desde el inicio
    */
    attack(t) {
        // Se almacena el arma seleccionada en una variable para más comodidad y legibilidad
        let weapon = this[this.selected];
        console.log(t, this._attack.lastSwing);
        if(t >= this._attack.lastSwing + weapon.atkSpeed) {
            this._attack.lastSwing = t;
            // Attack
            this._attack.isAttacking = true;
            this._attack.damage = weapon.damage;
            
            //this.colliders.up.setReach(weapon.reach);
            //this.colliders.right.setReach(weapon.reach);
            //this.colliders.down.setReach(weapon.reach);
            //this.colliders.left.setReach(weapon.reach);
        }
    }
}