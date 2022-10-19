import level_aux from './escenas/level_aux.js';
import Menu from './escenas/menu.js'
/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.auto,
   // canvas: document.getElementById("juego"),
    width:  1000,
    height: 560,
    parent: GameContainer,
    pixelArt: true,
	scale: {
		autoCenter: Phaser.Scale.CENTER_BOTH,
		// mode: Phaser.Scale.FIT,
		// min: {
        //     width: 328,
        //     height: 188
        // },
		// max: {
        //     width: 1312,
        //     height: 752
        // },
		// zoom: 1
    },
    scene: [Menu, level_aux],
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
    }
};

new Phaser.Game(config);