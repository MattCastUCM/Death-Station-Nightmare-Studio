import { Game } from './game.js';

const config = {
    type: Phaser.AUTO,
    width: 1700,
    height: 1000,
    scene: [Game],
    physics: {
          default: 'arcade',
          arcade: {
              gravity: {y: 200},
              enableBody: true,
              debug: false,
          }
        }
    }

var game = new Phaser.Game(config);