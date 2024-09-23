import config from '../game.js';
import { gameSettings } from '../game.js';

export default class Player {

    constructor(scene) {
        this.scene = scene;
        this.cursorKeys = null;
        this.player = null;

    }

    preload() {

        this.scene.load.spritesheet("player", "assets/spritesheets/player.png", {
            frameWidth: 16,
            frameHeight: 24
        });

    }

    create() {

        this.player = this.scene.physics.add.sprite(64, config.height / 2, "player");
        this.player.play("thrust");
        this.player.angle = 90;
        this.player.setScale(2, 2);

        // Configurar colisiones con los límites del mundo
        this.player.setCollideWorldBounds(true);

        // Crear animación de thrust si no existe
        if (!this.scene.anims.get("thrust")) {
            this.scene.anims.create({
                key: "thrust",
                frames: this.scene.anims.generateFrameNumbers("player"),
                frameRate: 20,
                repeat: -1
            });
        }

        this.cursorKeys = this.scene.input.keyboard.createCursorKeys();
    }

    update() {

        this.movePlayerManager();

    }

    movePlayerManager() {
        
        if (this.cursorKeys.up.isDown) {

            this.player.setVelocityY(-gameSettings.playerSpeed);

        } else if (this.cursorKeys.down.isDown) {

            this.player.setVelocityY(gameSettings.playerSpeed);

        } else {

            this.player.setVelocityY(0);

        }

        if (this.cursorKeys.left.isDown) {

            this.player.setVelocityX(-gameSettings.playerSpeed / 2);

        } else if (this.cursorKeys.right.isDown) {

            this.player.setVelocityX(gameSettings.playerSpeed / 2);

        } else {

            this.player.setVelocityX(0);

        }
    }

    resetPlayer() {

        let x = 64; 
        let y = config.height / 2;
        this.player.enableBody(true, x, y, true, true);
        this.player.alpha = 0.5;

        // Efecto de transición para que el jugador aparezca lentamente
        let tween = this.scene.tweens.add({
            targets: this.player,
            x: x,
            y: y,
            ease: 'Power1',
            duration: 1500,
            repeat: 0,
            onComplete: () => {
                this.player.alpha = 1;
            },
            callbackScope: this
        });
    }
}

