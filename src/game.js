import Boot from './scenes/boot.js'
import SoundManager from './hud/soundManager.js'
import Menu from './scenes/menu.js'
import Restart from './scenes/restart.js';

import { intro1, intro2} from './scenes/intro.js'
import  outro  from './scenes/outro.js';
import {level1Map, level2Map, level3Map, level4Map, endMap} from './scenes/metro_maps.js'
import LEVEL_01 from './scenes/LEVEL_01.js'
import LEVEL_02 from './scenes/LEVEL_02.js'
import LEVEL_03 from './scenes/LEVEL_03.js';
import LEVEL_04 from './scenes/LEVEL_04.js'

import HUD from './hud/hudManager.js'
import DialogManager from './hud/dialogManager.js'


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
    scene: [Boot, SoundManager,Menu, intro1, intro2,outro,
        level1Map, level2Map, level3Map, level4Map, endMap,
        LEVEL_01, LEVEL_02, LEVEL_03,LEVEL_04,
        HUD, DialogManager, Restart,],
    physics: { 
        default: 'arcade', 
        arcade: { 
           // gravity: { y:200 },
           
           // Visibilidad de las colisiones 
           debug: false   
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
