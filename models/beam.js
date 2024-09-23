export default class Beam extends Phaser.GameObjects.Sprite{

    constructor(scene) {

        let x = scene.player.x + scene.player.width / 2; // Iniciar desde el centro del jugador
        let y = scene.player.y;

        super(scene, x, y, "beam");
        // Añadir a la escena
        scene.add.existing(this);
        
        this.play("beam_anim");
        scene.physics.world.enableBody(this);
        this.body.velocity.x = 250; // Movimiento horizontal hacia la derecha
        this.body.allowGravity = false; // Desactivar gravedad si está activada
        scene.projectiles.add(this);

    }

    update() {
        
        if (this.x > this.scene.game.config.width - 16) { // 16 es el ancho del beam
            this.destroy();
        }

    }

}

