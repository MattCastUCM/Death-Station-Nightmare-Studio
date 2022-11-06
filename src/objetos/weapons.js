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
        this.colliderGroup = player.scene.physics.add.staticGroup();
        this.colliderGroup.add(this.colliders.up);
        this.colliderGroup.add(this.colliders.right);
        this.colliderGroup.add(this.colliders.down);
        this.colliderGroup.add(this.colliders.left);

        player.scene.physics.add.collider(this.colliderGroup, player.scene.gato, function() { console.log("col"); }, null);

        // Se guarda la última vez que se hizo un ataque
        this._lastSwing = 0;
        // Se guarda el jugador
        /** @type {Player} */
        this._player = player;

        // Se genera la tabla de booleanos para guardar qué armas se tienen
        this._hasWeapon = {};
        this._hasWeapon.navaja = true;
        this._hasWeapon.botella = false;
        this._hasWeapon.barra = false;
        this._hasWeapon.hacha = false;
        this.selected = "navaja";

        // Se generan las armas
        this.navaja = new Navaja(player);
        this.botella = new Botella(player);
        this.barra = new Barra(player);
        this.hacha = new Hacha(player);

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
    }

    moving() {
        console.log("Hola");
    }

    /**
       @param {number} t - tiempo transcurrido desde el inicio
    */
    attack(t) {
        let weapon = this[this.selected];
        if(t >= this._lastSwing + weapon.atkSpeed) {
            this._lastSwing = t;
            // Attack
            console.log(this);
            console.log(weapon);
        }
    }
	
	Log() {
		console.log("Col");
	}
}