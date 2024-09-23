import config from '../game.js'

export default class MenuScene extends Phaser.Scene {

    constructor() {

        super('MenuScene');
        
    }

    preload() {

        this.load.image("background", "assets/images/background1.png");

    }

    create() {
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0, 0);

        //this.cameras.main.setBackgroundColor('#000'); // Fondo negro
        const titleStyle = { font: '48px retro-font', fill: '#FFF' };
        const buttonStyle = { font: '32px retro-font', fill: '#0F0' };
        const infoStyle = { font: '12px retro-font', fill: '#FFF' };

        // Nombre del juego
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 100, 'Ship Scape', titleStyle).setOrigin(0.5);

        // Botón de "Start"
        const startButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Start', buttonStyle)
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('bootGame'); 
            })
            .on('pointerover', () => {
                startButton.setStyle({ fill: '#FF0' });
            })
            .on('pointerout', () => {
                startButton.setStyle({ fill: '#0F0' });
            });

        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 240, 'Desarrollado por Chris', infoStyle).setOrigin(0.5);
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 260, 'GitHub: github.com/xChrisxY', infoStyle).setOrigin(0.5);
    }

    update(){

        this.background.tilePositionX -= 0.5;

    }
}

