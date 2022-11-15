import gameObject from "./gameObject.js";
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
    constructor(player, reach) {
        super(player.scene, player.x, player.y, 1, 1, 0, 0, "", player.speed);

        this.visible = true;
        this._player = player;
        this.reach = reach;

        // Creamos objetos de offsets para el jugador
        this.offset = {}
        this.offset.up = {}
        this.offset.up.x = 13;
        this.offset.up.y = 5;
        this.offset.right = {}
        this.offset.right.x = 39;
        this.offset.right.y = 31;
        this.offset.down = {};
        this.offset.down.x = 13;
        this.offset.down.y = 56;
        this.offset.left = {};
        this.offset.left.x = -11;
        this.offset.left.y = 31;
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

           // Se generan las armas
           this.navaja = new Navaja(player);
           this.botella = new Botella(player);
           this.barra = new Barra(player);
           this.hacha = new Hacha(player);
           this.selected = "navaja";
        // Se genera un nuevo objeto para detectar colisión entre arma y enemigo
        this.collider = new ColliderAtq(player, 1);
        let me = this;
        this.collisionDetector = player.scene.physics.add.collider(this.collider, player.scene.enemies,
            function (obj1, obj2) { me.collision(me, obj1, obj2); }, null);
        this.collisionDetector.overlapOnly = true;

        // Se genera un objeto para mantener las propiedades de ataque
        this._attack = {};
        this._attack.isAttacking = false;
        // Se guarda la última vez que se hizo un ataque
        this._attack.lastSwing = 0;
        this._attack.damage = 0;

        // Se guarda el jugador
        this._player = player;

        // Se genera el objeto de booleanos para guardar qué armas se tienen
        this._hasWeapon = {};
        this._hasWeapon.navaja = true;
        this._hasWeapon.botella = false;
        this._hasWeapon.barra = false;
        this._hasWeapon.hacha = false;

     

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
    // Funciona debido a que extendemos de gameObject
    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        // Si se pulsa la tecla "1", se cambia a la navaja (si se tiene)
        if (this._hasWeapon.navaja && this.selected != "navaja" && Phaser.Input.Keyboard.JustDown(this.input.one)) {
            this.selected = "navaja";
            this._player.ChangeWeapon(this.selected);
        }
        // Si se pulsa la tecla "2", se cambia a la botella (si se tiene)
        if (this._hasWeapon.botella && this.selected != "botella" && Phaser.Input.Keyboard.JustDown(this.input.two)) {
            this.selected = "botella";
            this._player.ChangeWeapon(this.selected);
        }
        // Si se pulsa la tecla "3", se cambia a la barra (si se tiene)
        if (this._hasWeapon.barra && this.selected != "barra" && Phaser.Input.Keyboard.JustDown(this.input.three)) {
            this.selected = "barra";
            this._player.ChangeWeapon(this.selected);
        }
        // Si se pulsa la tecla "4", se cambia al hacha (si se tiene)
        if (this._hasWeapon.hacha && this.selected != "hacha" && Phaser.Input.Keyboard.JustDown(this.input.four)) {
            this.selected = "hacha";
            this._player.ChangeWeapon(this.selected);
        }
        // Si se pulsa la barra espaciadora, se hace un ataque.
        if (Phaser.Input.Keyboard.JustDown(this.input.space)) {
            this.attack(t);
        }

        if (this._attack.lastSwing + 500 <= t) {
            this._attack.isAttacking = false;
        }
    }

    collision(self, obj1, obj2) {
        console.log("colisión con : "+ obj2);
        if (self._attack.isAttacking) {
            // Si no existe la propiedad "damage", se ejecuta la segunda función
            //(obj2.damage || function() { console.log(obj2, "No tiene método damage"); })();
            // Si la propiedad "damage" no es una función, se ejecuta la segunda función
            (typeof obj2.damage === "function" ? obj2.damage : function () { console.log(obj2, "No tiene método damage"); })(self._attack.damage);
        }
    }

    /**
       @param {number} t - tiempo transcurrido desde el inicio
    */
    attack(t) {
        // Se almacena el arma seleccionada en una variable para más comodidad y legibilidad
        let weapon = this[this.selected];
        console.log("Tiempo actual: ", t, "   Tiempo del último ataque realizado: ", this._attack.lastSwing);
        if (t >= this._attack.lastSwing + weapon.atkSpeed * 1000) {
            this._attack.lastSwing = t;
            this._attack.isAttacking = true;
            this._attack.damage = weapon.dmg;
            // Se cambian las colisiones para que sean iguales al alcance del arma
            this.collider.setReach(weapon.reach);
        }
    }
}