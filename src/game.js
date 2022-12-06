import Boot from './escenas/boot.js'
import SoundManager from './hud/soundManager.js'
import Menu from './escenas/menu.js'
import { intro1, intro2} from './escenas/intro.js'
import {level1Map, level2Map, level3Map, level4Map, endMap} from './escenas/metro_maps.js'
//import LEVEL_BASE from './escenas/LEVEL_BASE.js';
import LEVEL_01 from './escenas/LEVEL_01.js'
import LEVEL_02 from './escenas/LEVEL_02.js'
import LEVEL_03 from './escenas/LEVEL_03.js';
import level_aux from './escenas/level_aux.js';
import level_map from './escenas/level_map.js';
import HUD from './hud/hudManager.js'
//import Pause from './escenas/pause.js'
//import HealthBar from './hud/healthBar.js';
import DialogManager from './hud/DialogManager.js'
import Restart from './escenas/restart.js';
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
    scene: [Boot, SoundManager,Menu, intro1, intro2,
        level1Map, level2Map, level3Map, level4Map, endMap,
        LEVEL_01, LEVEL_02, LEVEL_03, level_aux,
        HUD, DialogManager, Restart,],
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
