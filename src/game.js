import Boot from '../src/escenas/boot.js'
import Menu from '../src/escenas/menu.js'
import level_aux from '../src/escenas/level_aux.js';
import HUD from './hud/hudManager.js'
//import Pause from './escenas/pause.js'
import DialogManager from '../src/hud/DialogManager.js'
/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.AUTO,
    //canvas: document.getElementById("juego"),
    width:  1000,
    height: 560,
    parent: 'game',
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
    scene: [Boot,Menu, level_aux,HUD,DialogManager],
    physics: { 
        default: 'arcade', 
        arcade: { 
           // gravity: { y:200 }, 
            debug: true   //para la visibilidad de box collieder 
        },
        checkCollision: {
            up: true,
            down: true,
            left: true,
            right: true
        }
    },
    transparent: true
};

new Phaser.Game(config);