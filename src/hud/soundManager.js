
export default class SoundManager extends Phaser.Scene {
    /**
     * Escena de SoundManager
     * @extends Phaser.Scene
     */
    constructor() {
        super({ key: 'soundManager' });
    }


    // Creación de los elementos de la escena
    create() {
        const creatures = {
            mute: false,
            volume: 0.1,
            rate: 1,    //speed
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0,
        };
        const objects = {
            mute: false,
            volume: 0.1,
            rate: 1,    //speed
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0,
        };
        const bgm = {
            mute: false,
            volume: 1,
            rate: 1,    //speed
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
        };

        // Asigna a cada audio una determinada configuración 
        this.ambient = { volume: 0.1, loop: true };
        this.accident = { volume: 0.07, loop: false };
        this.trainHorn = { volume: 0.1, loop: false };
        this.dialogPop = { volume: 0.03, loop: false };
        this.dialogJump = { volume: 0.03, loop: false };
        this.click = { volume: 0.5, loop: false };

        this.menu = { volume: 0.1, loop: true };
        this.level1 = bgm;
        this.level2 = bgm;
        this.level3 = bgm;
        this.level4 = bgm;
        this.dead = bgm;

        this.persecutorGrowl1 = creatures;
        this.persecutorGrowl2 = creatures;
        this.persecutorGrowl3 = creatures;
        this.persecutorHurt = creatures;
        this.lanzadorHurt = { volume: 0.05, loop: false }
        this.lanzadorThrow = objects;
        this.cat1 = { volume: 0.02, loop: false }
        this.cat2 = { volume: 0.02, loop: false }

        this.playerHurt = { volume: 0.5, loop: false }
        this.selectWeapon = { volume: 0.08, loop: false }
        this.walk = { volume: 0.03, loop: false }

        this.bulletDestroy = objects;
        this.cartBoard = { volume: 0.04, loop: false }
        this.woodBoxExplosion = { volume: 0.8, loop: false }

        this.barra = objects;
        this.navaja = objects;
        this.botella = objects;
        this.hacha = { volume: 0.2, loop: false }


        this.scene.start('menu');
    }


    // Reproduce el audio con el nombre que recibe
    play(name) {
        this.sound.add([name], this[name]).play();
    }

    // Reproduce la música de fondo con el nombre de audio que recibe
    playBGM(name) {
        this[name] = this.sound.add([name], this[name]); //guardarlo en una variable para luego usarlo
        this[name].play();
    }

    // Reproduce el audio coc el nombre que recibe y cuando acaba ejecuta la función que recibe
    playWithListener(name,funct){
        this[name] = this.sound.add([name], this[name]);
        this[name].on('complete', funct); //cuando termine el audio, ejecuta la función pasada
        this[name].play();
    }

    // Para la música de fondo con el nombre de audio que recibe
    stopBGM(name) {
        this[name].stop();
    }

    // Mutea el sonido
    pause(bool) {
        this.sound.setMute(bool);
    }

}