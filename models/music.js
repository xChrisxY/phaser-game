export default class Music {
    constructor(scene) {
        this.scene = scene;
        this.tracks = {};
    }

    preload() {
        // Carga los archivos de audio necesarios
        this.scene.load.audio('audio_beam', 'assets/sounds/beam.ogg');
        this.scene.load.audio('audio_explosion', 'assets/sounds/explosion.ogg');
        this.scene.load.audio('audio_pickup', 'assets/sounds/pickup.ogg');
        this.scene.load.audio('music', 'assets/sounds/sci-fi_platformer12.mp3');
    }

    create() {
        // Inicializa los sonidos
        this.tracks.beamSound = this.scene.sound.add("audio_beam");
        this.tracks.explosionSound = this.scene.sound.add("audio_explosion");
        this.tracks.pickupSound = this.scene.sound.add("audio_pickup");

        this.tracks.music = this.scene.sound.add("music");

        let musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        };

        this.tracks.music.play(musicConfig);
    }

    playSound(soundName) {
        if (this.tracks[soundName]) {
            this.tracks[soundName].play();
        }
    }

    stopMusic() {
        
        if (this.tracks.music) {

            this.tracks.music.stop();

        }
    }
}

