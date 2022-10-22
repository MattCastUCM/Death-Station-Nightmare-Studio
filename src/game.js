import level_aux from './escenas/level_aux.js';
import Menu from './escenas/menu.js'
import HUD from './HUD/hud.js'
/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.canvas,
    canvas: document.getElementById("juego"),
    width:  1000,
    height: 560,
    //parent: 'game',
    pixelArt: true,
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
		mode: Phaser.Scale.FIT,
		min: {
            width: 336,
            height: 188
        },
		max: {
            width: 1000,
            height: 560,
        },
		zoom: 1
    },
    scene: [Menu, level_aux,HUD],
    physics: { 
        default: 'arcade', 
        arcade: { 
           // gravity: { y:200 }, 
            debug: false   //para la visibilidad de box collieder 
        },
        checkCollision: {
            up: true,
            down: true,
            left: true,
            right: true
        }
    }
};

new Phaser.Game(config);