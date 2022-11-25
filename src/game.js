//import HealthBar from './hud/healthBar.js';
import Boot from './escenas/boot.js'
import {Logo1, Logo2} from './escenas/present.js'
import Menu from './escenas/menu.js'
import Restart from './escenas/Restart.js';
import level_aux from './escenas/level_aux.js';
import HUD from './hud/hudManager.js'
//import Pause from './escenas/pause.js'
import DialogManager from './hud/DialogManager.js'
import level_map from './escenas/level_map.js';
//import LEVEL_BASE from './escenas/LEVEL_BASE.js';
import LEVEL_01 from './escenas/LEVEL_01.js'
import LEVEL_02 from './escenas/LEVEL_02.js'
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
    scene: [Boot, Logo1, Logo2, Menu, LEVEL_01, LEVEL_02, level_aux, HUD, DialogManager, Restart,],
    physics: { 
        default: 'arcade', 
        arcade: { 
           // gravity: { y:200 },
           
           //para la visibilidad de box collieder 
           debug: true   
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
