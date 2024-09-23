import config from '../game.js'

export default class Ship {

    constructor(scene) {
        this.scene = scene;
        this.ships = {};
    }

    preload() {
        // Carga los spritesheets necesarios
        this.scene.load.spritesheet("ship", "assets/spritesheets/ship.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.scene.load.spritesheet("ship2", "assets/spritesheets/ship2.png", {
            frameWidth: 32,
            frameHeight: 16
        });
        this.scene.load.spritesheet("ship3", "assets/spritesheets/ship3.png", {
            frameWidth: 32,
            frameHeight: 32
        });
    }

    create() {
        // Inicializa las naves
        this.ships.ship1 = this.createShip(config.width, Phaser.Math.Between(50, config.height - 50), "ship", "ship1_anim");
        this.ships.ship2 = this.createShip(config.width, Phaser.Math.Between(50, config.height - 50), "ship2", "ship2_anim");
        this.ships.ship3 = this.createShip(config.width, Phaser.Math.Between(50, config.height - 50), "ship3", "ship3_anim");
    }

    createShip(x, y, spriteKey, animationKey) {
        // Crear el sprite
        const ship = this.scene.physics.add.sprite(x, y, spriteKey);
        ship.angle = 90;
        ship.setScale(2, 2);
        
        // Agregar a grupo de enemigos
        this.scene.enemies.add(ship);

        // Crear la animación
        this.createAnimation(animationKey, spriteKey);
        
        // Reproducir animación
        ship.play(animationKey);

        // Hacer interactivo
        ship.setInteractive();

        return ship;
    }

    update() {
        this.moveShip(this.ships.ship1, 1);
        this.moveShip(this.ships.ship2, 2);
        this.moveShip(this.ships.ship3, 3);
    }

    createAnimation(animationKey, spriteKey) {

        if (!this.scene.anims.get(animationKey)) {
            this.scene.anims.create({
                key: animationKey,
                frames: this.scene.anims.generateFrameNumbers(spriteKey),
                frameRate: 20,
                repeat: -1
            });
        }
    }

    moveShip(ship, speed) {

        if (!ship) return;

        ship.x -= speed;

        if (ship.x < 0) {
            this.resetShipPos(ship);
        }
    }

    resetShipPos(ship) {

        if (!ship) return;
        ship.x = config.width;
        var randomY = Phaser.Math.Between(50, config.height - 50);
        ship.y = randomY;

    }

    destroyShip(pointer, gameObject) {

        gameObject.setTexture("explosion");
        gameObject.play("explode");

    }
}

