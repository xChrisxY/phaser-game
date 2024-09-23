import config from "../game.js"
import { gameSettings } from "../game.js"
import Beam from "../models/beam.js"
import Explosion from "../models/explosion.js"
import Music from '../models/music.js'
import Ship from '../models/Ship.js'

export default class Scene2 extends Phaser.Scene {

    constructor() {

        super("playGame");
        this.musicManager = null;
        this.shipManager = new Ship(this);
        this.backgroundWorker = null;
        this.elapsedTime = 0;
        this.messageWorker = null;

    }

    preload() {

        this.musicManager = new Music(this);
        this.musicManager.preload();

        this.shipManager.preload();

    }

    create() {

        // Fondo con desplazamiento horizontal
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0, 0);

        // [1] WebWorker background
        this.backgroundWorker = new Worker('../workers/backgroundPosition.js');
        this.backgroundWorker.postMessage(0.5);

        this.backgroundWorker.onmessage = event => {
            this.background.tilePositionX = event.data
        }

        // Declaración de naves enemigas usando sprites

        this.enemies = this.physics.add.group();

        this.shipManager.create();

        this.input.on('gameobjectdown', this.shipManager.destroyShip, this);

        // Grupo de Power-Ups
        this.powerUps = this.physics.add.group();

        var maxObjects = 4;
        for (let i = 0; i <= maxObjects; i++) {
            let powerUp = this.physics.add.sprite(16, 16, "power-up");
            this.powerUps.add(powerUp);
            powerUp.setRandomPosition(0, 0, config.width, config.height);

            if (Math.random() > 0.5) {
                powerUp.play("red");
            } else {
                powerUp.play("gray");
            }

            // Movimiento horizontal aleatorio
            powerUp.setVelocityX(Phaser.Math.Between(50, 150));
            powerUp.setVelocityY(Phaser.Math.Between(-50, 50));
            powerUp.setCollideWorldBounds(true);
            powerUp.setBounce(1);
            powerUp.angle = 90;
            powerUp.setScale(2, 2);
        }

        this.player = this.physics.add.sprite(64, config.height / 2, "player");
        this.player.play("thrust");
        this.player.angle = 90;
        this.player.setScale(2, 2);

        this.cursorKeys = this.input.keyboard.createCursorKeys();

        // Restringir al jugador dentro de los límites de la pantalla
        this.player.setCollideWorldBounds(true);

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.projectiles = this.add.group();

        // Colisiones
        this.physics.add.collider(this.projectiles, this.powerUps, (projectile, powerUp) => {
            projectile.destroy();
        });

        this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);
        this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);

        // Gráficos de la interfaz
        var graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1); // Color negro en formato hexadecimal
        graphics.fillRect(0, 0, 20, config.height); // Barra vertical en el lado izquierdo

        this.score = 0;
        this.scoreLabel = this.add.bitmapText(30, 5, "pixelFont", "SCORE 000000", 16);
        this.timeLabel = this.add.bitmapText(400, 5, "pixelTime", "TIME 000000", 16);

        // Sonidos
        this.musicManager.create();

        // [2] timer Worker
        this.timerWorker = new Worker('../workers/timeWorker.js');

        this.timerWorker.onmessage = event => {
            this.elapsedTime = event.data;
            const elapsedValue = this.zeroPad(this.elapsedTime, 1);
            this.timeLabel.text = "TIME LIVE " + elapsedValue;
        }
        this.timerWorker.postMessage('start');

        // message
        this.messageWorker = new Worker('workers/textWorker.js');
        console.log(this.messageWorker);

        // Recibir el mensaje del worker y mostrar/ocultar el texto
        this.messageWorker.onmessage = event => {
            console.log(event.data);
            const message = event.data;
            if (message) {
                this.showMessage(message);
            } else {
                this.hideMessage();
            }
        };

    }

    update() {

        this.shipManager.update();

        // Desplazamiento del fondo horizontal
        //this.background.tilePositionX -= 0.5;

        this.movePlayerManager();
        //this.player.update();

        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            if (this.player.active) {
                this.shootBeam();
            }
        }

        for (let i = 0; i < this.projectiles.getChildren().length; i++) {
            let beam = this.projectiles.getChildren()[i];
            beam.update();
        }
    }

    movePlayerManager() {
        // Movimiento vertical
        if (this.cursorKeys.up.isDown) {
            this.player.setVelocityY(-gameSettings.playerSpeed);
        } else if (this.cursorKeys.down.isDown) {
            this.player.setVelocityY(gameSettings.playerSpeed);
        } else {
            this.player.setVelocityY(0);
        }

        // Movimiento horizontal limitado
        if (this.cursorKeys.left.isDown) {
            this.player.setVelocityX(-gameSettings.playerSpeed / 2);
        } else if (this.cursorKeys.right.isDown) {
            this.player.setVelocityX(gameSettings.playerSpeed / 2);
        } else {
            this.player.setVelocityX(0);
        }
    }

    shootBeam() {
        let beam = new Beam(this);
        beam.x = this.player.x + this.player.width / 2;
        beam.y = this.player.y;
        this.projectiles.add(beam);
        //this.beamSound.play();
        this.musicManager.tracks.beamSound.play();
    }

    pickPowerUp(player, powerUp) {
        powerUp.disableBody(true, true);
        //this.pickupSound.play();
        this.musicManager.tracks.pickupSound.play();
    }

    hurtPlayer(player, enemy) {
        this.shipManager.resetShipPos(enemy);

        if (this.player.alpha < 1) {
            return;
        }

        let explosion = new Explosion(this, player.x, player.y);
        player.disableBody(true, true);

        this.time.addEvent({
            delay: 1000,
            callback: this.resetPlayer,
            callbackScope: this,
            loop: false
        });

        this.timerWorker.postMessage('reset');

        // Mostrar el mensaje de "Has perdido"
        this.messageWorker.postMessage({ message: 'Dead! try again' });

    }

    hitEnemy(projectile, enemy) {
        var explosion = new Explosion(this, enemy.x, enemy.y);

        projectile.destroy();
        this.shipManager.resetShipPos(enemy);
        this.score += 15;
        let scoreFormated = this.zeroPad(this.score, 6);
        this.scoreLabel.text = "SCORE " + scoreFormated;

        // this.explosionSound.play();

        this.musicManager.tracks.explosionSound.play();
    }

    zeroPad(number, size) {
        let stringNumber = String(number);
        while (stringNumber.length < (size || 2)) {
            stringNumber = "0" + stringNumber;
        }
        return stringNumber;
    }

    resetPlayer() {
        let x = 64; // Posición inicial en el lado izquierdo
        let y = config.height / 2;
        this.player.enableBody(true, x, y, true, true);

        this.player.alpha = 0.5

        let tween = this.tweens.add({
            targets: this.player,
            x: x, // Mantener la posición X
            y: y, // Mantener la posición Y
            ease: 'Power1',
            duration: 1500,
            repeat: 0,
            onComplete: () => {
                this.player.alpha = 1;
            },
            callbackScope: this
        });
    }

    showMessage(text) {

        this.messageText = this.add.bitmapText(config.width / 2, config.height / 2, "pixelFont", text, 40)
            .setOrigin(0.5, 0.5)
            .setTint(0xff0000) 
            .setAlpha(1); 

        this.messageText.setStroke('#ffffff', 8); 
        this.messageText.setShadow(2, 2, '#333333', 2, true, true);

        this.tweens.add({
            targets: this.messageText,
            alpha: 0, 
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
            duration: 500 
        });

    }

    hideMessage() {
        if (this.messageText) {
            this.messageText.destroy();
        }
    }

}

