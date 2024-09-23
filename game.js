import Scene1 from "../scenes/Scene1.js"
import Scene2 from "../scenes/Scene2.js"
import MenuScene from "./scenes/MenuScene.js"

export const gameSettings = {
    playerSpeed: 200,
    beamSpeed: 250, 
};

const config = {
    type: Phaser.AUTO,
    width: 800, 
    height: 600, 
    backgroundColor: 0x000000,
    scene: [MenuScene, Scene1, Scene2],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade : {
            debug: false,
            gravity: { y: 0 }
        }
    }
};

export default config;

var game = new Phaser.Game(config);

