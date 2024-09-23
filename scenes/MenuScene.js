import config from '../game.js'

export default class MenuScene extends Phaser.Scene {

    constructor() {

        super('MenuScene');
        
    }

    preload() {

        this.load.image("background", "assets/images/background1.png");

    }

    create() {
        // Fondo con textura retro
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0, 0);
    
        const titleStyle = { 
            font: '48px bold-retro', 
            fill: '#ffffff', 
            shadow: { offsetX: 2, offsetY: 2, color: '#333333', blur: 0, stroke: false, fill: true } // Sombra suave
        };
    
        const buttonStyle = { 
            font: '32px retro-font', 
            fill: '#ffffff', 
            stroke: '#ff0000',
            shadow: { offsetX: 2, offsetY: 2, color: '#333333', blur: 0, stroke: true, fill: true } 
        };
    
        const infoStyle = { 
            font: '12px retro-font', 
            fill: '#ffffff', 
            stroke: '#ff0000',

        };
    
        // Título del juego
        const titleText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 100, 'Ship Scape', titleStyle).setOrigin(0.5);
    
        // Efecto de parpadeo retro para el título
        this.tweens.add({
            targets: titleText,
            alpha: 0.5,
            duration: 500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    
        // Botón de inicio
        const startButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Start', buttonStyle)
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('bootGame'); 
            })
            .on('pointerover', () => {
                startButton.setStyle({ fill: '#ff0000' }); // Rojo brillante al pasar el mouse
            })
            .on('pointerout', () => {
                startButton.setStyle({ fill: '#ffffff' }); // Vuelve al blanco retro
            });
    
        // Efecto de parpadeo en el botón
        this.tweens.add({
            targets: startButton,
            alpha: 0.8, 
            duration: 500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    
        // Información adicional (Autor y GitHub) con estilo retro
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 240, 'Desarrollado por Chris', infoStyle).setOrigin(0.5);
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 260, 'GitHub: github.com/xChrisxY', infoStyle).setOrigin(0.5);
    }   

    update(){

        this.background.tilePositionX -= 0.5;

    }
}

