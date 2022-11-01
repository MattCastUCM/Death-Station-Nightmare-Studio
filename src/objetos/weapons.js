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

        this.player = player;
        this.dmg = dmg;
        this.reach = reach;
        this.atkSpeed = atkSpeed;
        this._lastSwing = 0;
    }
}

export class Navaja extends Weapon {
    constructor(player) {
        super(player, 'navaja', 5, 5, 3);
    }
}

export class Botella extends Weapon {
    constructor(player) {
        super(player, 'botella', 3, 5, 5);
    }
}

export class Barra extends Weapon {
    constructor(player) {
        super(player, 'barra', 5, 7, 7);
    }
}

export class Hacha extends Weapon {
    constructor(player) {
        super(player, 'hacha', 7, 5, 7);
    }


}

export default class WeaponManager {
    /**
     * 
     * @param {Player} player - jugador al que se une el manager
     */
    constructor(player) {
        this.navaja = new Navaja(player);
        this.botella = new Botella(player);
        this.barra = new Barra(player);
        this.hacha = new Hacha(player);
    }

    /**
       @param {number} t - tiempo transcurrido desde el inicio
    */
    attack(t) {
        if(t >= this._lastSwing + this.atkSpeed) {
            this._lastSwing = t;
            // Attack
        }
    }
}