import level_aux from './level_aux.js';
import Menu from './menu.js'
export default class Pause extends Phaser.Scene {
	constructor() {
		super({ key: 'Pause' });
	}
    init(s){
        this.continue = s.me;
    }
    preload(){
        this.load.image('play','assets/HUD/play.png');
    }
    create(){
        this.playButton = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2, 'play').setScale(0.3);
		this.playButton.setInteractive(); // Hacemos el sprite interactivo para que lance eventos

        this.playButton.on('pointerup', pointer => {
			this.continue.resume();
            this.scene.stop();
	    });
    }
}